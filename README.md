# Listing Assistant 

This is a simple web application that helps users create listings for items they want to sell.

## Requirements

- Node.js
- npm
- Git

## How to run it

```bash
git clone https://github.com/carolina-san/listing-assistant.git 
```

### Backend
```bash
cd backend
npm install
npm start
```
The backend will be available at:
http://localhost:3000

#### Mock Mode

If you want to run the application without an API key or without setting up the AI model, you can enable Mock Mode. This will return saved example responses instead of calling the real model. To realistically simulate an AI model, Mock Mode will occasionally (20% of the time) return a broken or nonsensical response to help you test error handling.

To run the backend in Mock Mode:

**Windows (PowerShell):**
```powershell
$env:MOCK_MODE="true"; npm start
```

**Linux/Mac:**
```bash
MOCK_MODE=true npm start
```

Alternatively, you can add `MOCK_MODE=true` to your `.env` file in the `backend` directory.

### Frontend
```bash
cd frontend
npm install
npm start
```
The frontend will be available at:
http://localhost:4200