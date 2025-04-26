Absolutely! Let’s proceed with precision and corporate-level structure.  
Below is a **detailed PRD** crafted for your **Node.js-based API Service for Safaricom M-PESA STK Push (Sandbox)**:

---

# 📄 Product Requirements Document (PRD)

## 1. 📌 Overview

The **M-PESA Payment API Service** is a lightweight Node.js application that provides essential endpoints for processing mobile payments via Safaricom's **M-PESA STK Push API** in a sandbox environment.  
It enables token generation, payment initiation, and transaction confirmation handling — all while enforcing clean, modular, and secure code practices within a **single-file architecture** (`index.js`).

This API will serve as the backend for client applications requiring real-time mobile payment capabilities.

---

## 2. 🎯 Goals and Objectives

- Build a simple, **self-contained** Node.js API service.
- Integrate **Safaricom’s M-PESA Daraja API** for STK Push payments.
- Handle OAuth 2.0 token retrieval and secure authorization automatically.
- Provide clean logging and error management for transaction flows.
- Facilitate development with **environment variables** for sensitive information.

---

## 3. ✨ Core Features

| Feature | Description |
|:--------|:------------|
| **Token Generation Middleware** | Automatically generates and attaches a valid OAuth token to API requests. |
| **/pay Endpoint** | Initiates an M-PESA payment after receiving a POST request with a phone number and amount. |
| **/callback Endpoint** | Receives confirmation callbacks from Safaricom, logs important transaction details, and acknowledges receipt. |
| **Environment Management** | Sensitive data like credentials are managed via `.env` file using `dotenv`. |
| **Middleware Integration** | Handles CORS, JSON body parsing, and URL-encoded form data efficiently. |
| **Robust Error Handling** | Captures and logs token generation, payment failures, and request anomalies. |

---

## 4. 🔄 Functional Specifications

### 4.1. **Token Generation Middleware**

- Intercepts outbound Safaricom API calls.
- Uses **Basic Authentication** (`CONSUMER_KEY:SECRET`) to obtain a short-lived OAuth token.
- Stores token temporarily for immediate request chaining.

### 4.2. **POST /pay**

- **Input:**  
  ```json
  {
    "phone": "07XXXXXXXX",
    "amount": 100
  }
  ```

- **Operation:**
  - Validate input (ensure valid Kenyan phone formats).
  - Dynamically generate:
    - `Timestamp`
    - `Password` (Base64 encoded Paybill + Passkey + Timestamp)
  - Build STK Push payload.
  - Call M-PESA **/stkpush/processrequest** endpoint with Bearer token.

- **Success Response:**
  ```json
  {
    "message": "Payment request sent successfully",
    "CheckoutRequestID": "ws_CO_12345"
  }
  ```

- **Failure Response:**
  ```json
  {
    "error": "Failed to initiate payment"
  }
  ```

### 4.3. **POST /callback**

- Safaricom sends a callback on transaction completion.
- Extract and log critical data:
  - `MpesaReceiptNumber`
  - `PhoneNumber`
  - `Amount`
- Respond with HTTP 200 to acknowledge.

- **Example Payload Received:**
  ```json
  {
    "Body": {
      "stkCallback": {
        "MerchantRequestID": "12345",
        "CheckoutRequestID": "ws_CO_67890",
        "ResultCode": 0,
        "ResultDesc": "The service request is processed successfully.",
        "CallbackMetadata": {
          "Item": [
            {"Name": "Amount", "Value": 100},
            {"Name": "MpesaReceiptNumber", "Value": "ABCDE12345"},
            {"Name": "PhoneNumber", "Value": 254712345678}
          ]
        }
      }
    }
  }
  ```

---

## 5. ⚙️ Environment Variables

| Variable | Purpose |
|:---------|:--------|
| `CONSUMER_KEY` | Safaricom API Consumer Key |
| `CONSUMER_SECRET` | Safaricom API Consumer Secret |
| `PAYBILL` | Business Shortcode (Till/Paybill number) |
| `PASSKEY` | Safaricom Lipa Na M-PESA Passkey |
| `CALLBACK_URL` | Publicly accessible callback URL (e.g., via Ngrok) |
| `PORT` | API service listening port (default `3000`) |

---

## 6. 🛠️ Technical Stack

| Technology | Usage |
|:-----------|:------|
| **Node.js** | Backend runtime |
| **Express.js** | Web server and routing |
| **Axios** | Making HTTP requests |
| **dotenv** | Manage environment variables securely |
| **cors** | Handle CORS policy and preflight requests |

**Recommended Node Version:** `>= 16.x`

---

## 7. 🔌 Payment Flow Overview

```plaintext
User on frontend clicks "Buy" →
Frontend sends POST `/pay` (phone + amount) →
Backend generates token + initiates STK Push →
User receives M-PESA popup to input PIN →
M-PESA sends confirmation POST to `/callback` →
Backend logs transaction details →
Frontend updates based on payment status
```

---

## 8. 🚨 Validation & Error Handling

- Validate:
  - Phone format: Must match 07XXXXXXXX, +2547XXXXXXXX, or 2547XXXXXXXX.
  - Amount: Must be a positive integer.
- Gracefully handle:
  - Token request failures
  - Payment request failures
  - Malformed Safaricom callbacks
- Log all exceptions with timestamp and context for debugging.

---

## 9. 📦 Key Dependencies (package.json)

```json
{
  "dependencies": {
    "express": "^4.18.2",
    "axios": "^1.6.0",
    "dotenv": "^16.3.1",
    "cors": "^2.8.5"
  },
  "scripts": {
    "start": "node index.js"
  }
}
```

---

## 10. 🛠 Deployment and Development Setup

| Environment | Instructions |
|:------------|:-------------|
| **Local Development** | Use `npm install` then `npm start`. Expose local server with **Ngrok** for receiving callbacks (`https://xxxx.ngrok.io/callback`). |
| **Testing Sandbox API** | Confirm your Safaricom developer app is configured to accept sandbox calls. Use the sandbox Shortcode. |
| **Logging** | Use simple `console.log` for outputs in development. Consider a logging library for production. |

---

# ✅ End of PRD

---
