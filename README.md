# Coffee Kiosk - M-PESA Payment Integration

A Node.js-based API service for processing M-PESA payments with a modern frontend interface.

## 🚀 Deployment

### Prerequisites
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git
- A Render.com account

### Deployment Steps

1. **Prepare Your Environment**
   ```bash
   # Clone the repository
   git clone <your-repository-url>
   cd coffee-kiosk

   # Install dependencies
   cd backend
   npm install
   cd ..
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env` in the backend directory
   - Update the following variables in `.env`:
     - `CONSUMER_KEY`
     - `CONSUMER_SECRET`
     - `PAYBILL`
     - `PASSKEY`
     - `CALLBACK_URL`
     - `SUPABASE_URL`
     - `SUPABASE_KEY`

3. **Deploy to Render.com**
   - Create a new Web Service on Render.com
   - Connect your GitHub repository
   - Configure the following settings:
     - Build Command: `cd backend && npm install`
     - Start Command: `cd backend && npm start`
   - Add all environment variables from your `.env` file
   - Deploy!

4. **Update Callback URL**
   - After deployment, update your `CALLBACK_URL` in the Render.com environment variables with your new API URL
   - The format should be: `https://your-app-name.onrender.com/callback`

### Local Development

1. **Start the Backend**
   ```bash
   cd backend
   npm install
   npm start
   ```

2. **Start the Frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## 📝 API Documentation

### Endpoints

#### POST /pay
Initiates an M-PESA payment.

**Request Body:**
```json
{
  "phone": "07XXXXXXXX",
  "amount": 100
}
```

**Response:**
```json
{
  "message": "Payment request sent successfully",
  "CheckoutRequestID": "ws_CO_12345"
}
```

#### POST /callback
Receives payment confirmation from M-PESA.

## 🔒 Security

- All sensitive credentials are stored in environment variables
- CORS is configured to only allow requests from trusted origins
- Input validation is implemented for all endpoints

## 📦 Dependencies

- express
- axios
- dotenv
- cors
- @supabase/supabase-js

## 🛠️ Development

- Node.js >= 16.x
- npm >= 7.x
- Git

## 📄 License

MIT 