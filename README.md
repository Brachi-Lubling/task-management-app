# Task Management App (Fullstack)

A fullstack task management system built with React (Vite) on the frontend and Node.js + Express + MongoDB on the backend.

The project demonstrates a modular architecture, REST API design, and full CRUD functionality across users, projects, and tasks.

---

## Tech Stack

Frontend:
- React (Vite)
- JavaScript (ES6+)
- Axios

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- CORS

Development Tools:
- Nodemon
- Git & GitHub

---

## Project Structure

project-root/
├── client/         (React frontend)
├── server/         (Node.js backend)
└── README.md

---

## Getting Started

### 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO

---

### 2. Install backend dependencies
cd server
npm install

---

### 3. Run backend server
npm run dev

Backend will run on:
http://localhost:5000

---

### 4. Install frontend dependencies
cd ../client
npm install

---

### 5. Run frontend
npm run dev

Frontend will run on:
http://localhost:5173

---

## API Endpoints

Users:
- GET /users/:id
- POST /users
- PUT /users/:id
- DELETE /users/:id

Projects:
- GET /projects
- POST /projects
- PUT /projects/:id
- DELETE /projects/:id

Tasks:
- GET /tasks
- POST /tasks
- PUT /tasks/:id
- DELETE /tasks/:id

---

## Features

- Full CRUD system for tasks, users, and projects
- Modular backend structure (routes/controllers/services)
- RESTful API design
- MongoDB integration
- Separation between frontend and backend

---

## Backend Architecture

- Routes → API endpoints
- Controllers → Business logic
- Services → Optional logic layer
- Middlewares → Logging, errors, validation

---

## Git Workflow

- main → stable production branch
- feature/* → new features
- bugfix/* → fixes

All commits and merges are preserved in Git history.

---

## Notes

- Make sure MongoDB Atlas is running and accessible
- Create a .env file in server directory:
  MONGO_URI=your_connection_string
  PORT=5000
- Backend must run before frontend

---

## Purpose

This project was built for learning fullstack development, REST APIs, and modern project architecture using React and Node.js.
