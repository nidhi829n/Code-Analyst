# 🚀 Code Analyst - AI Code Review Platform

Code Analyst is a full-stack AI-powered code review platform that analyzes source code and generates intelligent feedback using Google Gemini AI. The platform helps developers identify bugs, improve code quality, follow best practices, and write cleaner software.

## 🌐 Live Demo

Frontend: https://code-analyst.vercel.app/

Backend: https://code-analyst-1.onrender.com/

## ✨ Features

- AI-powered code review using Google Gemini AI
- User Authentication (JWT)
- Secure Login & Registration
- Protected Routes
- Review History Management
- Detailed Review Viewing
- Delete Reviews
- User Profile Dashboard
- Responsive UI
- REST API Architecture

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- React Markdown
- Prism.js
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- MongoDB Atlas
- Mongoose

### AI Integration
- Google Gemini API

## 📂 Project Structure

```bash
Code-Analyst/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── Backend/
│   ├── controllers/
│   ├── routes/
│   ├── middleware/
│   ├── models/
│   ├── config/
│   └── server.js
│
└── README.md
```

## 🔐 Authentication Flow

1. User Signup
2. User Login
3. JWT Token Generation
4. Protected Route Access
5. Secure API Requests

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/nidhi829n/Code-Analyst.git
```

### Move into Project

```bash
cd Code-Analyst
```

### Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

Start backend:

```bash
npm start
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 📡 API Endpoint

### Generate AI Review

```http
POST /ai/get-review
```

Request:

```json
{
  "code": "function sum(){ return 1+1 }",
  "language": "javascript"
}
```

## 📸 Screenshots

### Landing Page

(Add Screenshot Here)

### Dashboard

(Add Screenshot Here)

### Review History

(Add Screenshot Here)

### Profile Page

(Add Screenshot Here)

## 🎯 Future Enhancements

- Multi-language support
- Code quality score
- Export review as PDF
- Team collaboration
- Review sharing
- Syntax-specific suggestions

## 👩‍💻 Author

**Nidhi Mishra**

GitHub:
https://github.com/nidhi829n


---

⭐ If you found this project useful, consider giving it a star.
