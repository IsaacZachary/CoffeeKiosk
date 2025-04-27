import axios from 'axios';
import { PaymentData, PaymentResponse } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const initiatePayment = async (data: PaymentData): Promise<PaymentResponse> => {
  try {
    console.log('Sending payment request to:', `${API_URL}/pay`);
    const response = await api.post('/pay', data);
    console.log('Raw API response:', response);
    
    if (!response.data) {
      throw new Error('No response data received');
    }

    if (!response.data.CheckoutRequestID) {
      throw new Error('No CheckoutRequestID in response');
    }

    return {
      message: response.data.message || 'Payment request sent successfully',
      CheckoutRequestID: response.data.CheckoutRequestID
    };
  } catch (error) {
    console.error('API Error:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to initiate payment';
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMessage
      });
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export const getTransactions = async () => {
  try {
    console.log('Fetching transactions from:', `${API_URL}/transactions`);
    const response = await api.get('/transactions');
    console.log('Transactions response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Failed to fetch transactions';
      console.error('Axios error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: errorMessage
      });
      throw new Error(errorMessage);
    }
    throw error;
  }
};

export default api; 