#!/bin/bash

# Initialize the Python virtual environment if it doesn't exist
if [ ! -d "./backend/.venv" ]; then
  echo "Setting up Python virtual environment..."
  cd backend
  python3.12 -m venv .venv
  . .venv/bin/activate
  pip install -r requirements.txt
  cd ..
fi

# Start both services using concurrently
npx concurrently \
  --names "FRONTEND,BACKEND" \
  --prefix-colors "blue,green" \
  "npm run dev:frontend" \
  "npm run dev:backend"
