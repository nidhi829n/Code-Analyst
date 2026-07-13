# 🚀 Code Analyst – AI-Powered Code Review Platform

<p align="center">

AI-powered full-stack code review platform that analyzes source code, detects issues, suggests improvements, and helps developers write cleaner, production-quality code.

[🌐 Live Demo](https://code-analyst.vercel.app) •
[💻 Backend](https://github.com/nidhi829n/Code-Analyst)

</p>

---

## 📖 Overview

Code Analyst is an AI-powered code review platform built using the MERN stack. Developers can submit source code in multiple programming languages, receive intelligent AI-generated feedback, securely store review history, and revisit previous analyses.

The project follows production-ready backend practices with authentication, centralized error handling, request validation, logging, security middleware, rate limiting, and automated CI.

---

# ✨ Features

- 🤖 AI-powered code review using Google Gemini
- 🔐 JWT Authentication
- 👤 User-specific review history
- 🛡 Protected Routes
- ✅ Request Validation using Zod
- ⚠ Centralized Error Handling
- 📦 Standardized API Responses
- 📊 Winston + Morgan Logging
- 🚦 API Rate Limiting
- 🪖 Helmet Security
- 🔍 ESLint Code Quality Checks
- ⚙ GitHub Actions CI
- ☁ Deployment using Render & Vercel

---

# 🏗 System Architecture

```text
                        +----------------+
                        |    Browser     |
                        +--------+-------+
                                 |
                                 |
                          HTTPS Requests
                                 |
                                 ▼
                      +--------------------+
                      | React Frontend     |
                      | (Vercel)           |
                      +---------+----------+
                                |
                         Axios REST API
                                |
                                ▼
                     +----------------------+
                     | Express Backend      |
                     | (Render)             |
                     +----------+-----------+
                                |
     ------------------------------------------------------------
     |              |              |            |                |
     ▼              ▼              ▼            ▼                ▼
 JWT Auth      Zod Validation   Controllers   Middleware     Logger
                                |              |          (Winston)
                                ▼              ▼
                           Gemini Service   Rate Limiter
                                |
                                ▼
                         Google Gemini API
                                |
                                ▼
                         MongoDB Atlas
```

---

# 🔄 Request Lifecycle

```text
Client

↓

Express Server

↓

Rate Limiter

↓

Helmet

↓

Authentication

↓

Validation (Zod)

↓

Controller

↓

Gemini Service

↓

MongoDB

↓

Response

↓

Logger

↓

Client
```

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Axios

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose

## AI

- Google Gemini API

## Authentication

- JWT

## Security

- Helmet
- Express Rate Limit
- Zod Validation

## Logging

- Winston
- Morgan

## DevOps

- GitHub Actions
- Render
- Vercel

---

# 📂 Folder Structure

```text
Code-Analyst
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
│   └── server.js
│
├── frontend
│
└── .github
    └── workflows
```

---

# 🔐 Security

This project implements several production-grade backend security practices:

- JWT Authentication
- Protected Routes
- Helmet Security Headers
- API Rate Limiting
- Request Validation
- Centralized Error Handling
- Standardized API Responses

---

# 📊 Logging

The backend uses Winston and Morgan for structured logging.

Logs are separated into:

```text
logs/

├── combined.log

└── error.log
```

---

# ⚙ CI Pipeline

GitHub Actions automatically executes on every push to the `main` branch.

Pipeline includes:

- Checkout Repository
- Setup Node.js
- Install Dependencies
- ESLint Verification

Only after successful validation is the latest version deployed through Render.

---

# ☁ Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Render |
| Database | MongoDB Atlas |

---

# 🚀 Getting Started

## Clone Repository

```bash
git clone https://github.com/nidhi829n/Code-Analyst.git
```

## Backend

```bash
cd Backend

npm install

npm run dev
```

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Backend

```env
PORT=

MONGO_URI=

JWT_SECRET=

GOOGLE_GEMINI_KEY=
```

---

# 📈 Future Improvements

- Docker Support
- AWS Deployment
- Unit Testing
- Role-based Dashboard
- Review Sharing
- Code Version Comparison
- Admin Panel

---

# 👨‍💻 Author

**Nidhi Mishra**

GitHub

https://github.com/nidhi829n

LinkedIn

https://www.linkedin.com/in/nidhi-mishra-512327243/

---

# ⭐ If you like this project

Give it a ⭐ on GitHub.
