#!/bin/bash

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "Git is not installed. Please install git first."
    exit 1
fi

# Check if node is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm first."
    exit 1
fi

# Install dependencies
echo "Installing dependencies..."
cd backend
npm install
cd ..

# Create .env file if it doesn't exist
if [ ! -f "backend/.env" ]; then
    echo "Creating .env file..."
    cp backend/.env.example backend/.env
    echo "Please update the .env file with your actual credentials."
fi

# Build the application
echo "Building the application..."
cd backend
npm run build
cd ..

echo "Deployment preparation complete!"
echo "Next steps:"
echo "1. Update your .env file with actual credentials"
echo "2. Push your code to GitHub"
echo "3. Connect your repository to Render.com"
echo "4. Set up your environment variables in Render.com"
echo "5. Deploy your application" 