# Activity 1: Todo List Project


## 📌 Features

- Add, view, and delete tasks.
- Interactive frontend using React hooks.
- REST API backend with NestJS and TypeORM.
- Swagger API documentation available for backend endpoints.
- Basic styling with Tailwind CSS for better UI/UX.

---

## 💻 Project Structure

activity1-todo-list/
├─ backend/ # NestJS backend
├─ frontend/ # React frontend
└─ README.md

yaml


---

## 🚀 Getting Started

### 1. Backend

1. Go to the `backend` folder:

```bash
cd backend
Install dependencies:

bash

npm install
Start the backend server:

bash
npm run start
The backend runs on http://localhost:4000.

2. Frontend
Go to the frontend folder:

bash
cd frontend
Install dependencies:

bash
npm install
Start the frontend:

bash
npm start
The frontend runs on http://localhost:3000.

📘 Swagger API Documentation
After running the backend, access Swagger documentation at:

http://localhost:4000/api-docs

This provides interactive API testing for all endpoints:

GET /task – Retrieve all tasks

POST /task – Add a new task

DELETE /task/:id – Delete a task

🎨 Demo

⚙️ Tech Stack
Frontend: React.js, Tailwind CSS, Axios

Backend: NestJS, TypeORM, Swagger

Database: SQLite (or your preferred DB)

Other: Node.js, npm

✅ Notes
Ensure CORS is enabled in backend (http://localhost:3000) to allow API requests from frontend.

Tailwind CSS must be configured correctly in frontend (index.css with @tailwind base;, @tailwind components;, @tailwind utilities;).

📝 License
This project is open-source and available for personal and educational use.

yaml

