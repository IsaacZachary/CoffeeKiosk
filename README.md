<<<<<<< HEAD
# Coffee Kiosk

A full-stack application for managing a coffee kiosk with M-PESA payment integration.

## Project Structure

```
CoffeeKiosk/
├── backend/           # Node.js API Service
│   ├── index.js      # Main API implementation
│   ├── package.json  # Backend dependencies
│   └── .env          # Environment variables (create from .env.example)
├── frontend/         # React Frontend Application
│   ├── src/         # Source files
│   ├── public/      # Static files
│   └── package.json # Frontend dependencies
└── docs/            # Documentation
    ├── Backend - PRD.md
    └── Frontend - PRD.md
```

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   CONSUMER_KEY=your_consumer_key_here
   CONSUMER_SECRET=your_consumer_secret_here
   PAYBILL=your_paybill_number_here
   PASSKEY=your_passkey_here
   CALLBACK_URL=https://your-ngrok-url.ngrok.io/callback
   PORT=3000
   ```

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## Development

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:3001`
- Use Ngrok for exposing the backend callback URL

## API Endpoints

### Backend

- `POST /pay` - Initiate M-PESA STK Push
  ```json
  {
    "phone": "07XXXXXXXX",
    "amount": 100
  }
  ```

- `POST /callback` - Receive M-PESA transaction callbacks

## Technologies Used

### Backend
- Node.js
- Express.js
- Axios
- dotenv
- cors

### Frontend
- React
- Material-UI
- Axios
- React Router
- Emotion (for styling) 