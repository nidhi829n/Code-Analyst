🚀 Project: **Code Analyst AI**

Code Analyst AI is a full-stack web application that helps developers analyze and review their source code using AI-powered suggestions. It provides instant feedback on code quality, detects potential bugs, suggests optimizations, and follows best coding practices to improve performance and maintainability.

---
📌 Features

🧠 AI-Powered Code Analysis
Uses Google Generative AI (@google/genai) to intelligently review code.

⚡ REST API Backend
Built with Node.js and Express.js for fast and scalable performance.

🎨 Interactive Frontend (React.js)
User-friendly UI for submitting code and viewing AI-generated feedback.

🔗 API Communication using Axios
Axios is used to send code from frontend to backend and receive responses.

🌐 CORS Enabled
Ensures smooth communication between frontend and backend.

📦 Environment-Based Configuration
Uses .env file to securely manage API keys and sensitive data.

🚀 Simple API Endpoint

POST /ai/get-review

---

**Send your source code and receive:**

1. Code quality analysis

2. Bug detection

3. Optimization tips

---
Best practice suggestions

🔥 Lightweight & Easy to Deploy

---

🛠️ Tech Stack

**Frontend:**

1. React.js
2. Axios
3. HTML5
4. CSS3
5.JavaScript

**Backend:**

1.Node.js

2.Express.js

3.Google Generative AI

4.dotenv

5.Cors

---
📂 Project Structure
Code-Analyst/
│
├── frontend/
│   ├── src/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── README.md

---
⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/Code-Analyst.git

2️⃣ Backend Setup
cd backend
npm install
Create a .env file:
GOOGLE_GEMINI_KEY=your_api_key_here

Run backend:
nodemon server.js

3️⃣ Frontend Setup
cd frontend
npm install
npm start

📡 API Usage
Endpoint:
POST /ai/get-review

Request Body:
{
  "code": "your source code here"
}

Response:

AI-generated review including:

1.Code quality feedback

2.Bug detection

3.Optimization suggestions

4.Best practices

---
🎯 Purpose

The purpose of Code Analyst AI is to assist developers in improving their code quality by providing quick and intelligent AI-based feedback without manual code review.

---
✨ Future Enhancements

1.Support for multiple programming languages
2.Authentication system
3.Code review history
4.UI improvements
