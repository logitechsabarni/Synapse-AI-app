# 🚀 AI Synapse (Full-Stack AI Web App)

An AI-powered full-stack web application built with **Flask (backend)** and **React (frontend)**, integrated with **Google Gemini API** and deployed on **Google Cloud Run**.









## 🌐 Live Demo

👉 https://ais-dev-adwduvsxwk3u2i3vbqohxv-730312893469.asia-east1.run.app/

---

## 🧠 Features

- ⚡ AI-powered responses using Google Gemini API  
- 💬 Real-time API-based chat/analysis system  
- 🌐 Modern React frontend UI  
- 🔥 Flask backend REST API  
- ☁️ Fully deployed on Google Cloud Run  
- 🔐 Environment-based API key security  

---

## 🏗️ Tech Stack

### Frontend
- React (Vite)
- JavaScript / TypeScript (if used)
- TailwindCSS (if used)

### Backend
- Flask
- Flask-CORS
- Gunicorn

### AI
- Google Gemini API

### Deployment
- Google Cloud Run
- Docker (multi-stage build)

---

## 📁 Project Structure

```

project/
│
├── api.py              # Flask backend
├── requirements.txt    # Python dependencies
├── Dockerfile          # Cloud Run deployment
│
├── frontend/           # React app (if separate)
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
└── dist/               # Production build (generated)

```

---

## ⚙️ Environment Variables

The following environment variable is required:

```

GEMINI_API_KEY=your_api_key_here

````

---

## 🚀 Local Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ai-synapse.git
cd ai-synapse
````

---

### 2️⃣ Backend setup

```bash
pip install -r requirements.txt
python api.py
```

Runs on:

```
http://localhost:8080
```

---

### 3️⃣ Frontend setup (if separate)

```bash
npm install
npm run dev
```

---

## 🐳 Docker Setup (Optional)

### Build image

```bash
docker build -t ai-synapse .
```

### Run container

```bash
docker run -p 8080:8080 ai-synapse
```

---

## ☁️ Deployment (Google Cloud Run)

```bash
gcloud run deploy ai-synapse \
  --source . \
  --region asia-east1 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key
```

---

## 🔌 API Endpoints

### Health Check

```
GET /api/test
```

Response:

```json
{
  "status": "working"
}
```

---

### AI Endpoint (example)

```
POST /api/analyze
```

Request:

```json
{
  "input": "Hello AI"
}
```

Response:

```json
{
  "response": "AI generated output"
}
```

---

## ⚠️ Notes

* Ensure `GEMINI_API_KEY` is correctly set in Cloud Run environment variables
* React build (`dist/`) must be generated before deployment
* Backend serves both API and frontend in production

---

## 🏆 Project Highlights

* Production-level full-stack architecture
* Cloud deployment using Google Cloud Run
* Secure environment variable handling
* Scalable AI integration using Gemini API

---

## 👨‍💻 Author

Built by **Sabarni Guha**

---

## 📜 License

This project is for educational and hackathon purposes.

```

How should we pivot our supply chain to mitigate geopolitical risk while maintaining 15% margins?- This input is there as an example for seeing how does the report work and workspace works.






