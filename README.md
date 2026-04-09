# Link in Bio (Monorepo)

A beautiful, production-ready "Link in Bio" web application built with the MERN stack, Docker, and GitHub Actions.

## 📁 Repository Structure

```
.
├── client/          # React (Vite) Frontend
├── server/          # Node.js + Express Backend
├── docker/          # Dockerfiles
├── .github/         # CI/CD Workflows
└── docker-compose.yml 
```

## 🚀 Setup & Local Development

### 1. Database
You can either use a local MongoDB instance running on `localhost:27017` or use the provided Docker Compose:
```bash
docker-compose up -d mongo
```

### 2. Backend
```bash
cd server
npm install
npm run dev
# Server will run on http://localhost:5000
```
Make sure you've copied `server/.env.example` to `server/.env`.

### 3. Frontend
```bash
cd client
npm install
npm run dev
# Frontend wrapper will serve on http://localhost:5173 
```

## 🐳 Docker Deployment

To run the entire application using Docker Compose (assuming connection to MongoDB container):
```bash
docker-compose up --build
```
*Note: Our `docker-compose.yml` is set up to spin up the MongoDB database and backend API.*

## 🔄 CI/CD Pipeline
Our GitHub Actions workflow (`.github/workflows/main.yml`) performs:
1. **Testing**: Runs Jest tests on the backend to ensure stability.
2. **Build Verification**: Builds the React Client.
3. **Docker Build**: Validates that our backend Docker image builds successfully (can be modified to push to GHCR or Docker Hub).

## ☁️ Deployment Guides (Vercel)

### Frontend (Client)
1. Go to Vercel and import your repository.
2. Set the Root Directory to `client`.
3. Framework Preset: `Vite`.
4. Deploy!

### Backend (Server)
1. In Vercel, import your repository again.
2. Set the Root Directory to `server`.
3. Ensure the environment variable `MONGODB_URI` points to your MongoDB Atlas connection string.
4. Deploy! Vercel will automatically detect `server/vercel.json` and serve the Express application using Serverless Functions.

---
Built with ❤️ and Modern DevOps practices!
