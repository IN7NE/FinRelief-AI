# FinRelief-AI
TEAM MEMBERS :- JATIN 
RAJESH
HIMANI:-backend workd login authentications
SHANTANU :-ai work flow
NISHTHAA :- frontend
# FinRelief AI – AI Powered Debt Relief & Financial Recovery Platform

FinRelief AI is an AI-powered web application that helps borrowers manage loans, analyze financial health, generate AI-powered settlement recommendations, and create professional negotiation letters using Google Gemini AI.

---

## Tech Stack

### Frontend
- React.js
- Vite
- Axios
- React Router

### Backend
- FastAPI
- Python
- SQLAlchemy ORM
- SQLite
- Google Gemini API

---

# Installation Guide

## 1. Clone the Repository

```bash
git clone https://github.com/IN7NE/FinRelief-AI.git
cd FinRelief-AI
```

---

## 2. Backend Setup

Navigate to the backend folder.

```bash
cd backend
```

Create a virtual environment.

### Windows

```bash
python -m venv venv
```

Activate it.

**Command Prompt**

```bash
venv\Scripts\activate
```

**PowerShell**

```powershell
.\venv\Scripts\Activate.ps1
```

Install all required dependencies.

```bash
pip install -r requirements.txt
```

---

## 3. Configure Environment Variables

The project already contains a `.env.example` file.

Copy it and rename it to:

```
.env
```

Open the `.env` file and replace the placeholder with your own Google Gemini API key.

Example:

```env
DATABASE_URL=sqlite:///./finrelief.db
GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

Replace:

```
YOUR_GEMINI_API_KEY
```

with your actual Gemini API key.

---

## 4. Get a Google Gemini API Key

1. Visit **Google AI Studio**.
2. Sign in with your Google account.
3. Click **Get API Key**.
4. Create a new API key.
5. Copy the generated key.
6. Paste it into the `.env` file.

---

## 5. Run the Backend

```bash
uvicorn main:app --reload
```

Backend URL:

```
http://127.0.0.1:8000
```

Swagger Documentation:

```
http://127.0.0.1:8000/docs
```

---

## 6. Frontend Setup

Open another terminal.

```bash
cd frontend
```

Install frontend dependencies.

```bash
npm install
```

Run the development server.

```bash
npm run dev
```

Frontend URL:

```
http://localhost:5173
```

---

# Team Members

- Jatin Kumar – Team Lead
- Himani Agarwal – Backend Development
- Nishthaa Jain – Frontend Development
- Rajesh Saini – Database Management
- Shantanu – AI Integration

---

# License

This project was developed as part of the SkillWallet Internship Program for educational purposes.
