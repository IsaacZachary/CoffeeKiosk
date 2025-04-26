export interface Coffee {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
}

export interface PaymentData {
  phone: string;
  amount: number;
}

export interface PaymentResponse {
  message: string;
  CheckoutRequestID: string;
}

export interface PaymentError {
  error: string;
}
