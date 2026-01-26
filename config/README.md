# Auth API with Password Reset 🚀

A professional Node.js & Express Authentication API featuring JWT security and automated password reset via email.

## Features
* **User Signup & Login** (with Bcrypt password hashing)
* **JWT Authentication** (Protected profile route)
* **Forgot Password** (Secure token generation)
* **Reset Password** (Email integration using Nodemailer)
* **MongoDB Integration** (Cloud database setup)

## Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB Atlas
* **Security:** JWT (JSON Web Tokens), Bcrypt.js
* **Email:** Nodemailer

## Setup Instructions
1. Clone the repo: `git clone <your-repo-link>`
2. Install dependencies: `npm install`
3. Create a `.env` file and add:
   - `PORT=5001`
   - `MONGO_URI=your_mongodb_uri`
   - `JWT_SECRET_KEY=your_secret_key`
   - `EMAIL_USER=your_gmail`
   - `EMAIL_PASS=your_16_digit_app_password`
4. Run the server: `node index.js`