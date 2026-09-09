# Listing Assistant 

This is a simple web application that helps users create listings for items they want to sell. 

I spent 5 hours and 19 minutes developing it (timed with clockify) and what I would do next is a listing history so that users can look back at the items they've asked for. 

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

If there is no `GROQ_API_KEY` in the `.env` file in the root of the `backend` directory, the application will run in **Mock Mode** by default, the backend will return saved example responses, and occasionally (20% of the time) return a broken response.

If you have a `GROQ_API_KEY`, you can add it to the `.env` file in the `backend` directory and set `MOCK_MODE=true` or `MOCK_MODE=false` to test both modes.

### Frontend
```bash
cd frontend
npm install
npm start
```
The frontend will be available at:
http://localhost:4200

## Testing

I included 2 tests for the API that check:
1. That the API returns 400 if the description is missing.
2. That the API returns a generated listing when the description is provided (Mock Mode).

To run the backend tests:
```bash
cd backend
npm test
```

There are also 2 tests for the frontend:
1. It calls the backend correctly when subbmitting.
2. It handles broken backend responses and displays an error message.

To run the frontend tests:
```bash
cd frontend
npm test
```