require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const mongoose = require('mongoose');
const Payment = require('./models/Payment');

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/coffeekiosk')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:8080'], // Frontend URLs
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

        // Save payment to database
        const payment = new Payment({
            phoneNumber: formattedPhone,
            amount: amount,
            checkoutRequestId: response.data.CheckoutRequestID,
            status: 'pending'
        });
        await payment.save();
        console.log('Payment saved to database:', payment);

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

        // Find and update payment in database
        const payment = await Payment.findOne({ checkoutRequestId });
        if (!payment) {
            console.error('Payment not found:', checkoutRequestId);
            return res.status(404).send('Payment not found');
        }

        if (stkCallback.ResultCode === 0) {
            const metadata = stkCallback.CallbackMetadata.Item;
            const transactionDetails = {
                amount: metadata.find(item => item.Name === 'Amount')?.Value,
                receiptNumber: metadata.find(item => item.Name === 'MpesaReceiptNumber')?.Value,
                phoneNumber: metadata.find(item => item.Name === 'PhoneNumber')?.Value,
                transactionDate: metadata.find(item => item.Name === 'TransactionDate')?.Value
            };

            // Update payment status
            payment.status = 'success';
            payment.receiptNumber = transactionDetails.receiptNumber;
            payment.transactionDate = new Date(transactionDetails.transactionDate);
            await payment.save();

            console.log('Transaction successful:', transactionDetails);
        } else {
            // Update payment status to failed
            payment.status = 'failed';
            await payment.save();
            console.log('Transaction failed:', stkCallback.ResultDesc);
        }

        res.status(200).send('Callback received');
    } catch (error) {
        console.error('Callback processing failed:', error.message);
        res.status(500).send('Error processing callback');
    }
});

// Get payment status endpoint
app.get('/payment/:checkoutRequestId', async (req, res) => {
    try {
        const payment = await Payment.findOne({ checkoutRequestId: req.params.checkoutRequestId });
        if (!payment) {
            return res.status(404).json({ error: 'Payment not found' });
        }
        res.json(payment);
    } catch (error) {
        console.error('Error fetching payment:', error.message);
        res.status(500).json({ error: 'Failed to fetch payment status' });
    }
});

// Get all transactions endpoint
app.get('/transactions', async (req, res) => {
    try {
        console.log('Fetching transactions...');
        const transactions = await Payment.find()
            .sort({ createdAt: -1 }) // Sort by newest first
            .limit(50); // Limit to last 50 transactions
        console.log('Found transactions:', transactions.length);
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching transactions:', error.message);
        res.status(500).json({ error: 'Failed to fetch transactions' });
    }
});

// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
}); 