# Project Green Planet Backend

This is an Express.js backend for login and sign up functionality using MongoDB.

## Features
- User registration (sign up)
- User login with JWT authentication
- Password hashing with bcrypt

## Setup
1. Install dependencies:
   ```
   cd backend
   npm install
   ```
2. Set up MongoDB (local or cloud) and update `.env` if needed.
3. Start the server:
   ```
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/signup` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT token

## Environment Variables
- `MONGO_URI` — MongoDB connection string
- `JWT_SECRET` — Secret for JWT signing
- `PORT` — Server port (default: 5000)

---

Replace `your_jwt_secret_here` in `.env` with a strong secret for production.
