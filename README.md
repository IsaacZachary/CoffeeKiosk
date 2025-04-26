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
=======
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9fb5eae9-d987-44c9-b888-7c6d3d7bb0f2

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9fb5eae9-d987-44c9-b888-7c6d3d7bb0f2) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9fb5eae9-d987-44c9-b888-7c6d3d7bb0f2) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
>>>>>>> a910055074f995d469d6f08a383fdbc676c23a76
