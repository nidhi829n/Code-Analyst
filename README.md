<div align="center">

# 🚀 CodeAnalyst

> **AI-Powered Code Review Platform built with the MERN Stack & Google Gemini.**

Analyze source code, detect bugs, improve code quality, generate production-ready suggestions, and interact with AI through follow-up conversations.

<p align="center">
  <img src="https://img.shields.io/badge/React-19-blue?logo=react&logoColor=white" alt="React">
  <img src="https://img.shields.io/badge/Node.js-Express-green?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Database-MongoDB-green?logo=mongodb&logoColor=white" alt="MongoDB">
  <img src="https://img.shields.io/badge/AI-Google%20Gemini-blue?logo=google&logoColor=white" alt="Gemini">
  <img src="https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens&logoColor=white" alt="JWT">
</p>

<p align="center">
  <a href="#-live-demo">🌐 Live Demo</a> • 
  <a href="#-api-overview">Backend API</a> • 
  <a href="https://github.com/nidhi829n/Code-Analyst/issues">Report Issue</a>
</p>

</div>

---

## 📸 Screenshots

| Landing Page | AI Workspace |
| :---: | :---: |
| ![Landing](images/landing.png) | ![Dashboard](images/dashboard.png) |

| Review History | AI Review Details | Authentication |
| :---: | :---: | :---: |
| ![History](images/history.png) | ![Review](images/review.png) | ![Login](images/login.png) |

---

## 🎯 Project Highlights

* **Secure Authentication**: Robust JWT-based auth and protected routes.
* **AI Code Reviews**: Instant deep analysis and bug detection via Google Gemini.
* **AI Follow-up Chat**: Interactive contextual conversations regarding code fixes.
* **Review History**: Persistent user-specific code review tracking.
* **Detailed Review Reports**: Comprehensive breakdown of code quality issues.
* **Production-ready Backend**: Hardened with security, validation, and structured logging.
* **Modular Component Architecture**: Scalable, clean frontend structure.
* **CI/CD Pipeline**: Automated deployment workflows via GitHub Actions.

---

## ✨ Features

### 🤖 AI Capabilities
* AI-powered code reviews & bug identification
* Multi-language syntax and pattern support
* Real-time AI follow-up chat contextually linked to submissions
* Granular code improvement suggestions

### 🔒 Authentication
* JSON Web Token (JWT) secure authentication flow
* Protected route middleware on frontend and backend
* User-specific session history management

### ⚙️ Backend Engineering
* Clean RESTful API architecture
* Request payload validation via Zod
* Centralized error handling and async error wrapping
* Enterprise-grade logging with Winston and Morgan
* Production security layers using Rate Limiting and Helmet

### 🚀 DevOps & Tooling
* Automated CI/CD pipelines via GitHub Actions
* Code style enforcement using ESLint
* Cloud deployments hosted seamlessly on Vercel and Render

---

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React, Vite |
| **Backend** | Node.js, Express |
| **Database** | MongoDB Atlas |
| **AI Integration** | Google Gemini API |
| **Authentication** | JSON Web Tokens (JWT) |
| **Validation** | Zod |
| **Logging** | Winston, Morgan |
| **Security** | Helmet, Express Rate Limiter |
| **Deployment** | Vercel (Frontend), Render (Backend) |

---

## 🔄 How It Works

```text
User
  │
  ▼
React Frontend
  │ (Axios)
  ▼
Express API
  │ (JWT Verification)
  ▼
Controller Logic
  │
  ├─► Google Gemini API
  │
  └─► MongoDB Atlas
  │
  ▼
AI Review Response Delivered
