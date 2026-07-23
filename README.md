# 🚀 CodeAnalyst

<p align="center">

AI-Powered Code Review Platform built with the MERN Stack and Google Gemini AI.

Analyze code, detect bugs, receive intelligent feedback, generate improved code, maintain review history, and interact with AI through follow-up conversations.

</p>

<p align="center">

[![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js&logoColor=white)]()
[![Express](https://img.shields.io/badge/Framework-Express-000000?logo=express)]()
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)]()
[![Google Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4)]()
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)]()
[![License](https://img.shields.io/badge/License-MIT-blue.svg)]()

</p>

<p align="center">

🌐 **Live Demo:** https://code-analyst.vercel.app

💻 **Repository:** https://github.com/nidhi829n/Code-Analyst

</p>

---

# 📖 Overview

CodeAnalyst is a full-stack AI-powered code review platform that helps developers analyze source code using Google's Gemini AI.

Users can securely authenticate, submit code in multiple programming languages, receive structured AI reviews, ask follow-up questions, and maintain a personal review history.

The backend follows production-ready software engineering practices including authentication, request validation, centralized error handling, structured logging, security middleware, API rate limiting, and CI/CD automation.

---

# ✨ Features

## 🤖 AI Features

- AI-powered code review using Google Gemini
- Multi-language code analysis
- AI-generated improved code suggestions
- AI follow-up chat for clarification
- Readability analysis
- Performance analysis
- Security analysis
- Maintainability analysis

---

## 👤 User Features

- Secure Signup & Login
- JWT Authentication
- Protected Routes
- User-specific Review History
- Detailed Review Page
- Search Review History
- Persistent Review Storage

---

## 🛡 Backend Features

- RESTful API Architecture
- JWT Authentication
- Zod Request Validation
- Centralized Error Handling
- Async Handler Middleware
- Standardized API Responses
- Winston Logging
- Morgan Request Logging
- Helmet Security
- API Rate Limiting
- Modular Folder Structure

---

## ⚙ DevOps

- GitHub Actions CI
- ESLint
- Render Deployment
- Vercel Deployment
- MongoDB Atlas

---

# 📸 Screenshots

## 🏠 Landing Page

> Add screenshot here

```
images/landing-page.png
```

---

## 🔐 Authentication

> Add screenshot here

```
images/login.png
```

---

## 💻 AI Workspace

> Add screenshot here

```
images/dashboard.png
```

---

## 📜 Review History

> Add screenshot here

```
images/history.png
```

---

## 📊 Review Details

> Add screenshot here

```
images/review-details.png
```

---

# 🏗 Architecture

```text
                        +----------------------+
                        |      Browser         |
                        +----------+-----------+
                                   |
                             HTTPS Requests
                                   |
                                   ▼
                      +--------------------------+
                      |     React Frontend       |
                      |       (Vercel)           |
                      +------------+-------------+
                                   |
                               Axios REST API
                                   |
                                   ▼
                    +-----------------------------+
                    |      Express Backend         |
                    |        (Render)             |
                    +--------------+--------------+
                                   |
         ---------------------------------------------------------
         |             |              |            |              |
         ▼             ▼              ▼            ▼              ▼

    JWT Auth      Validation     Controllers   Middleware     Logger
                    (Zod)                           |
                                                   ▼
                                            Rate Limiter
                                                   |
                                                   ▼
                                            Google Gemini
                                                   |
                                                   ▼
                                             MongoDB Atlas
```

---

# 🔄 Request Lifecycle

```text
Client

↓

React Frontend

↓

Axios

↓

Express Server

↓

Helmet

↓

Rate Limiter

↓

JWT Authentication

↓

Zod Validation

↓

Controller

↓

Google Gemini AI

↓

MongoDB

↓

API Response

↓

Client
```

---

# 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React.js, Vite |
| Backend | Node.js, Express.js |
| Database | MongoDB Atlas |
| AI | Google Gemini API |
| Authentication | JWT |
| Validation | Zod |
| Security | Helmet, Express Rate Limit |
| Logging | Winston, Morgan |
| Deployment | Vercel, Render |
| CI/CD | GitHub Actions |

---

# 📂 Project Structure

```text
CodeAnalyst
│
├── Backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── validators
│   │
│   ├── logs
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   ├── public
│   └── package.json
│
└── .github
    └── workflows
```

---

# 🔐 Security

Production-grade backend security practices include:

- JWT Authentication
- Protected Routes
- Helmet Security Headers
- API Rate Limiting
- Zod Validation
- Centralized Error Handling
- Standardized API Responses

---

# 📊 Logging

The application uses Winston and Morgan for structured logging.

```text
logs/

├── combined.log

└── error.log
```

---

# 📡 REST API

## Authentication

```
POST /api/v1/auth/signup
POST /api/v1/auth/login
```

---

## AI

```
POST /api/v1/ai/get-review
POST /api/v1/chat
```

---

## Reviews

```
GET /api/v1/reviews
GET /api/v1/reviews/:id
DELETE /api/v1/reviews/:id
GET /api/v1/reviews/stats
```

---

# ⚙ CI Pipeline

GitHub Actions automatically runs on every push to the **main** branch.

Pipeline includes:

- Checkout Repository
- Setup Node.js
- Install Dependencies
- ESLint Verification
- Build Validation

Only successful builds are deployed to Render.

---

# ☁ Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |
| AI | Google Gemini |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/nidhi829n/Code-Analyst.git
```

---

## Backend Setup

```bash
cd Backend

npm install

npm run dev
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the Backend directory.

```env
PORT=

MONGO_URI=

JWT_SECRET=

GOOGLE_GEMINI_KEY=
```

---

# 🎯 Future Improvements

- Docker Support
- Redis Caching
- AWS ECS Deployment
- Unit Testing
- Code Version Comparison
- Review Sharing
- Team Collaboration
- Admin Dashboard
- Dark/Light Theme
- Review Export as PDF

---

# 👨‍💻 Author

## Nidhi Mishra

**GitHub**

https://github.com/nidhi829n

**LinkedIn**

https://www.linkedin.com/in/nidhi-mishra-512327243/

---

# ⭐ Support

If you found this project helpful, consider giving it a **⭐ Star** on GitHub.

It helps the project reach more developers and motivates future improvements.

---

<p align="center">

Made with ❤️ using React, Node.js, MongoDB & Google Gemini AI.

</p>
