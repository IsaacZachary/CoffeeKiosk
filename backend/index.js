require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const supabase = require('./lib/supabase');

const app = express();
const port = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: [
    'http://localhost:5173', 
    'http://localhost:8080',
    'https://coffee-kiosk-frontend.onrender.com'
  ],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Token generation middleware
const generateToken = async () => {
    try {
        const auth = Buffer.from(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`).toString('base64');
        const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
            headers: {
                Authorization: `Basic ${auth}`
            }
        });
        return response.data.access_token;
    } catch (error) {
        console.error('Token generation failed:', error.message);
        throw new Error('Failed to generate access token');
    }
};

// Phone number validation
const validatePhoneNumber = (phone) => {
    const phoneRegex = /^(?:254|\+254|0)?([7-9]{1}[0-9]{8})$/;
    return phoneRegex.test(phone);
};

// Format phone number to 254 format
const formatPhoneNumber = (phone) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) {
        return `254${cleaned.substring(1)}`;
    } else if (cleaned.startsWith('254')) {
        return cleaned;
    } else {
        return `254${cleaned}`;
    }
};

// Generate password for STK Push
const generatePassword = () => {
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
    const str = `${process.env.PAYBILL}${process.env.PASSKEY}${timestamp}`;
    return Buffer.from(str).toString('base64');
};

// STK Push endpoint
app.post('/pay', async (req, res) => {
    try {
        const { phone, amount } = req.body;
        console.log('Received payment request:', { phone, amount });

        // Validate input
        if (!phone || !amount) {
            console.log('Missing required fields:', { phone, amount });
            return res.status(400).json({ error: 'Phone number and amount are required' });
        }

        if (!validatePhoneNumber(phone)) {
            console.log('Invalid phone number format:', phone);
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        if (amount <= 0 || !Number.isInteger(Number(amount))) {
            console.log('Invalid amount:', amount);
            return res.status(400).json({ error: 'Amount must be a positive integer' });
        }

        // Generate token
        console.log('Generating token...');
        const token = await generateToken();
        console.log('Token generated successfully');

        // Prepare STK Push request
        const timestamp = new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3);
        const password = generatePassword();
        const formattedPhone = formatPhoneNumber(phone);

        const stkPushPayload = {
            BusinessShortCode: process.env.PAYBILL,
            Password: password,
            Timestamp: timestamp,
            TransactionType: "CustomerPayBillOnline",
            Amount: amount,
            PartyA: formattedPhone,
            PartyB: process.env.PAYBILL,
            PhoneNumber: formattedPhone,
            CallBackURL: process.env.CALLBACK_URL,
            AccountReference: "CoffeeKiosk",
            TransactionDesc: "Payment for coffee"
        };

        console.log('Sending STK Push request with payload:', stkPushPayload);

        // Make STK Push request
        const response = await axios.post(
            'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            stkPushPayload,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('STK Push response:', response.data);

        // Save payment to Supabase
        const { data: payment, error } = await supabase
            .from('payments')
            .insert([{
                phone_number: formattedPhone,
                amount: amount,
                checkout_request_id: response.data.CheckoutRequestID,
                status: 'pending',
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }])
            .select()
            .single();

        if (error) {
            console.error('Error saving payment to Supabase:', error);
            throw new Error('Failed to save payment');
        }

        console.log('Payment saved to Supabase:', payment);

        res.json({
            message: 'Payment request sent successfully',
            CheckoutRequestID: response.data.CheckoutRequestID
        });

    } catch (error) {
        console.error('Payment initiation failed:', error.message);
        if (error.response) {
            console.error('Error response:', error.response.data);
        }
        res.status(500).json({ error: 'Failed to initiate payment' });
    }
});

// Callback endpoint
app.post('/callback', async (req, res) => {
    try {
        const callbackData = req.body;
        console.log('Received callback:', JSON.stringify(callbackData, null, 2));

        // Extract transaction details
        const stkCallback = callbackData.Body.stkCallback;
        const checkoutRequestId = stkCallback.CheckoutRequestID;

        // Find payment in Supabase
        const { data: payment, error: findError } = await supabase
            .from('payments')
            .select()
            .eq('checkout_request_id', checkoutRequestId)
            .single();

        if (findError || !payment) {
            console.error('Payment not found:', checkoutRequestId);
            return res.status(404).send('Payment not found');
        }

        if (stkCallback.ResultCode === 0) {
            const metadata = stkCallback.CallbackMetadata.Item;
            const transactionDetails = {
                amount: metadata.find(item => item.Name === 'Amount')?.Value,
                receipt_number: metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value,
                phone_number: metadata.find(item => item.Name === 'PhoneNumber')?.Value,
                transaction_date: metadata.find(item => item.Name === 'TransactionDate')?.Value
            };

            // Update payment in Supabase
            const { error: updateError } = await supabase
                .from('payments')
                .update({
                    status: 'success',
                    receipt_number: transactionDetails.receipt_number,
                    transaction_date: new Date(transactionDetails.transaction_date).toISOString(),
                    updated_at: new Date().toISOString()
                })
                .eq('checkout_request_id', checkoutRequestId);

            if (updateError) {
                console.error('Error updating payment:', updateError);
                throw new Error('Failed to update payment');
            }

            console.log('Transaction successful:', transactionDetails);
        } else {
            // Update payment status to failed
            const { error: updateError } = await supabase
                .from('payments')
                .update({
                    status: 'failed',
                    updated_at: new Date().toISOString()
                })
                .eq('checkout_request_id', checkoutRequestId);

            if (updateError) {
                console.error('Error updating payment:', updateError);
                throw new Error('Failed to update payment');
            }

            console.log('Transaction failed:', stkCallback.ResultDesc);
        }

        res.status(200).send('Callback received');
    } catch (error) {
        console.error('Callback processing failed:', error.message);
        res.status(500).send('Error processing callback');
    }
});

// Get all transactions endpoint
app.get('/transactions', async (req, res) => {
    try {
        console.log('Fetching transactions...');
        const { data: transactions, error } = await supabase
            .from('payments')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            throw error;
        }

        // Format the transactions data
        const formattedTransactions = transactions.map(transaction => ({
            ...transaction,
            created_at: new Date(transaction.created_at).toISOString(),
            updated_at: new Date(transaction.updated_at).toISOString(),
            transaction_date: transaction.transaction_date ? new Date(transaction.transaction_date).toISOString() : null,
            phone_number: transaction.phone_number || '-',
            receipt_number: transaction.receipt_number || '-',
            amount: Number(transaction.amount)
        }));

        console.log('Found transactions:', formattedTransactions.length);
        res.json(formattedTransactions);
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 