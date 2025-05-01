# Ques.ai - Podcast Management Tool 🎙️

Transform your podcast content with transcription and management.

## Features 🚀

- **Auto Transcription**: Convert speech to text automatically
- **Edit & Manage**: Easy transcript editing interface
- **Project Organization**: Manage multiple podcasts
- **Custom Widgets**: Create embeddable podcast widgets
- **User Dashboard**: Track and manage your content

## Tech Stack 💻

- **Frontend**
  - React 18
  - Redux Toolkit + RTK Query
  - TailwindCSS
  - React Router 

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - JWT Authentication
  - Cloudinary

## Quick Start 🏃‍♂️

1. **Clone & Install**
```bash
git clone https://github.com/mauryavinay1407/Ques.ai.git
cd Ques.ai

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

2. **Environment Setup**
```bash
# In /server directory
cp .env.example .env
```

Add your environment variables:
```env
PORT = 4000
SECRET_KEY = your_secret_key
CLIENT_URL = http://localhost:5173
MONGO_URI = your_mongodb_uri
CLOUD_NAME = your_cloud_name
API_KEY = your_api_key
API_SECRET = your_api_secret
```

3. **Run the App**
```bash
# Start backend (from /server)
npm run dev

# Start frontend (from /client)
npm run dev
```

Visit `http://localhost:5173` in your browser 🎉

## API Routes 🛣️

- **Auth**
  - POST `/api/user/signup`
  - POST `/api/user/login`
  - POST `/api/user/logout`

- **Projects**
  - GET `/api/project`
  - POST `/api/project/create`
  - GET `/api/project/:id`

- **Transcripts**
  - POST `/api/project/transcript/:projectId`
  - GET `/api/project/transcripts/:projectId`
  - PUT `/api/project/:projectId/transcript/:transcriptId/update`

Made with ❤️ by Vinay