# Student Portfolio & Task Manager

A full-stack student portfolio application built with **React, Node.js, Express, MongoDB, and Mongoose**.

The project was developed progressively through Practicals 1–6, starting with React fundamentals and routing and eventually becoming a full-stack task management application connected to a MongoDB database.

---

## 🚀 Features

### Portfolio

- Student portfolio homepage
- About section
- Skills section
- Projects page
- Contact page
- Navigation using React Router
- Dark/Light mode
- Reusable React components

### Task Manager

The Projects page is integrated with a custom REST API and provides:

- View all tasks
- Create new tasks
- Update task completion status
- Delete tasks
- Task descriptions
- Task priority selection
- Loading indicators
- Error handling
- Delete confirmation
- Success toast notifications
- MongoDB persistence

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- JavaScript
- React Router
- Fetch API
- HTML5
- CSS3

## Backend

- Node.js
- Express.js
- Mongoose
- MongoDB Atlas
- CORS

## Development Tools

- Visual Studio Code
- Git
- GitHub
- Postman
- MongoDB Atlas
- Browser DevTools

---

# 🏗️ Application Architecture

The application consists of two separate projects.

```text
                 React Frontend
                 localhost:5173
                       │
                       │ Fetch API
                       ▼
              Express REST API
              localhost:5003
                       │
                       │ Mongoose
                       ▼
                 MongoDB Atlas
```

### Data Flow

```text
User
 │
 ▼
React UI
 │
 ▼
api.js
 │
 ▼
Express REST API
 │
 ▼
Mongoose
 │
 ▼
MongoDB
 │
 ▼
API Response
 │
 ▼
React State
 │
 ▼
Updated UI
```

---

# 📁 Project Structure

## Frontend Repository

```text
student-portfolio/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── api.js
│   │
│   ├── components/
│   │   ├── About.jsx
│   │   ├── ErrorMessage.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Navbar.jsx
│   │   ├── RepoList.jsx
│   │   ├── Skills.jsx
│   │   └── Spinner.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Projects.jsx
│   │   └── Contact.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── package-lock.json
└── README.md
```

## Backend Repository

The backend is maintained separately:

```text
task-manager-api-24CE024/
│
├── models/
│   └── Task.js
│
├── .env
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
└── server.js
```

> The `.env` file is private and is intentionally excluded from GitHub.

---

# ⚙️ Prerequisites

Before running the project, install:

- Node.js 18 or higher
- npm
- Git
- A MongoDB Atlas account

You can verify Node.js and npm:

```bash
node --version
npm --version
```

---

# 📦 Repositories

The full-stack application uses two separate repositories.

### Frontend

```text
student-portfolio
```

### Backend

```text
task-manager-api-24CE024
```

Both repositories need to be available locally.

---

# 🔧 Backend Setup

The backend must be started **before or alongside the frontend**.

## 1. Clone the backend repository

```bash
git clone <BACKEND_REPOSITORY_URL>
```

Navigate into it:

```bash
cd task-manager-api-24CE024
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure MongoDB

Create a file named:

```text
.env
```

inside the backend project.

Add:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5003
```

Replace:

```text
your_mongodb_connection_string
```

with your MongoDB Atlas connection string.

### Example

```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/taskmanager
PORT=5003
```

**Never commit the real `.env` file to GitHub.**

The repository contains `.env.example` as a template:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5003
```

## 4. Start the backend

```bash
node server.js
```

Expected output:

```text
MongoDB Connected
Server running on port 5003
```

The backend API is now available at:

```text
http://localhost:5003
```

---

# 💻 Frontend Setup

Open a **second terminal**.

## 1. Clone the frontend repository

```bash
git clone <FRONTEND_REPOSITORY_URL>
```

Navigate into it:

```bash
cd student-portfolio
```

## 2. Install dependencies

```bash
npm install
```

## 3. Start the React development server

```bash
npm run dev
```

Vite will display the local development URL, normally:

```text
http://localhost:5173
```

Open:

```text
http://localhost:5173
```

---

# 🔗 Backend API Configuration

The frontend communicates with the Express backend through:

```text
src/api/api.js
```

The backend base URL is centralized in this file:

```javascript
const BASE_URL = "http://localhost:5003";
```

The API functions are:

```javascript
getTasks()
createTask()
updateTask()
deleteTask()
```

Centralizing the API URL prevents the backend address from being duplicated throughout the application.

---

# 🌐 REST API Endpoints

The backend provides the following endpoints:

| Method | Endpoint | Description |
|---|---|---|
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get one task |
| POST | `/tasks` | Create a task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

### Example

Get all tasks:

```http
GET http://localhost:5003/tasks
```

Create a task:

```http
POST http://localhost:5003/tasks
Content-Type: application/json
```

Example request body:

```json
{
  "title": "Complete Practical 6",
  "description": "Finish React and Node integration",
  "priority": "high"
}
```

---

# 🗃️ Task Schema

Tasks are stored in MongoDB using a Mongoose schema.

```text
title
description
completed
priority
createdAt
```

| Field | Type | Rules |
|---|---|---|
| `title` | String | Required |
| `description` | String | Optional |
| `completed` | Boolean | Default: `false` |
| `priority` | String | `low`, `medium`, `high` |
| `createdAt` | Date | Default: current date/time |

Example document:

```json
{
  "title": "Learn MongoDB",
  "description": "Complete database integration",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-08-12T10:00:00.000Z"
}
```

---

# 🔄 Task Operations

## Create

The user enters:

- Title
- Description
- Priority

React sends:

```text
POST /tasks
```

The backend saves the task to MongoDB and returns the created document.

The React state is then updated using the server response.

---

## Read

When the Projects page loads:

```text
React
 ↓
GET /tasks
 ↓
Express
 ↓
MongoDB
 ↓
Tasks returned
 ↓
React renders tasks
```

---

## Update

The user can change the completion status.

React sends:

```text
PUT /tasks/:id
```

The MongoDB document is updated and the updated task is returned to React.

---

## Delete

The user clicks Delete.

A confirmation dialog appears:

```text
Are you sure you want to delete this task?
```

After confirmation:

```text
DELETE /tasks/:id
```

The document is removed from MongoDB and React removes it from the displayed list.

---

# 🔔 Notifications

The frontend provides feedback after write operations.

### Create

```text
Task created successfully!
```

### Update

```text
Task updated successfully!
```

### Delete

```text
Task deleted successfully!
```

Notifications automatically disappear after a few seconds.

---

# ⏳ Loading & Error Handling

The application handles asynchronous operations using React state.

### Loading

While the initial task request is running, a reusable spinner is displayed.

### API Errors

If the backend request fails, an error message is displayed instead of leaving the UI blank.

Write operations also handle errors for:

- Create
- Update
- Delete

---

# 🛡️ Backend Validation

Mongoose validates task data before it is saved.

For example, `title` is required.

An invalid request such as:

```json
{
  "description": "Missing title"
}
```

returns a structured error:

```json
{
  "error": "Validation failed",
  "details": [
    "Path `title` is required."
  ]
}
```

Priority is also validated.

Valid values:

```text
low
medium
high
```

An invalid value such as:

```json
{
  "title": "Test",
  "priority": "urgent"
}
```

is rejected.

---

# 🌍 CORS

The Express backend uses the CORS middleware to allow the React development server to communicate with the API.

```javascript
const cors = require("cors");

app.use(cors());
```

This allows:

```text
http://localhost:5173
```

to communicate with:

```text
http://localhost:5003
```

---

# 🧪 Testing

The backend was tested using Postman.

Tested operations include:

- GET all tasks
- GET task by ID
- POST task
- PUT task
- DELETE task
- Missing required `title`
- Invalid priority
- Non-existent task ID

The frontend was tested for:

- Loading tasks
- Creating tasks
- Updating tasks
- Deleting tasks
- Delete confirmation
- Toast notifications
- Refreshing the browser
- MongoDB persistence

---

# 📚 Practical Progress

## Practical 1 — React Fundamentals

Implemented the basic React portfolio application.

### Concepts

- React
- JSX
- Components
- State
- Basic UI structure

---

## Practical 2 — React Routing & State Management

Added:

- React Router
- Multiple pages
- Navigation
- `useState`
- Controlled inputs
- Dark/Light mode

Routes:

```text
/
 /projects
 /contact
```

---

## Practical 3 — API Integration & Data Rendering

Integrated the GitHub REST API.

Implemented:

- `useEffect`
- `useState`
- `fetch`
- Asynchronous API calls
- Loading state
- Error state
- Repository rendering
- Spinner component
- ErrorMessage component
- RepoList component

The GitHub API implementation was later replaced by the custom Task API during Practical 6.

---

## Practical 4 — RESTful API with Node.js & Express

Created the Task Management backend.

Implemented:

- Node.js
- Express
- REST API
- GET
- POST
- PUT
- DELETE
- Request logging middleware
- Global error handling
- HTTP status codes
- In-memory task storage

---

## Practical 5 — MongoDB & Mongoose

Extended the backend with MongoDB Atlas.

Implemented:

- MongoDB Atlas
- Mongoose
- Task schema
- Schema validation
- Required fields
- Default values
- MongoDB CRUD
- Validation error handling
- Priority enum
- GET task by ID
- 404 handling
- Environment variables
- `.env` protection

---

## Practical 6 — Full Stack Integration

Connected the React frontend to the Express and MongoDB backend.

Implemented:

- CORS
- Centralized API layer
- React → Express communication
- GET from React
- POST from React
- PUT from React
- DELETE from React
- MongoDB persistence
- Loading states
- Error handling
- Delete confirmation
- Toast notifications
- End-to-end CRUD workflow

---

# 📸 Application Flow

```text
                  USER
                   │
                   ▼
            React Portfolio
                   │
                   ▼
             Task Manager
                   │
                   ▼
               api.js
                   │
                   ▼
          Express REST API
                   │
                   ▼
               Mongoose
                   │
                   ▼
             MongoDB Atlas
                   │
                   ▼
              API Response
                   │
                   ▼
             React State
                   │
                   ▼
              Updated UI
```

---

# 🔐 Environment Variables

The backend requires:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5003
```

The following files should **never** contain real credentials in Git:

```text
.env
```

The repository provides:

```text
.env.example
```

as a safe configuration template.

---

# 🧹 Git & GitHub

The project uses Git for version control.

The backend `.gitignore` excludes:

```text
node_modules/
.env
```

This prevents dependencies and database credentials from being committed.

---

# 📝 Development Workflow

To run the complete application:

### Terminal 1 — Backend

```bash
cd task-manager-api-24CE024
npm install
node server.js
```

### Terminal 2 — Frontend

```bash
cd student-portfolio
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

Navigate to:

```text
/projects
```

to access the Task Manager.

---

# ⚠️ Troubleshooting

## Frontend cannot fetch tasks

Make sure the backend is running:

```bash
node server.js
```

and verify:

```text
http://localhost:5003/tasks
```

returns JSON.

---

## CORS error

Confirm that the backend contains:

```javascript
const cors = require("cors");

app.use(cors());
```

Then restart the backend.

---

## MongoDB connection error

Check the backend `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Also verify that the MongoDB Atlas cluster is available and the database user has the required permissions.

---

## Tasks disappear after refresh

The frontend should retrieve tasks from:

```text
GET /tasks
```

when the Projects page loads.

If tasks disappear, check that the backend is running and that MongoDB contains the documents.

---

# 🎓 Learning Outcomes

This project demonstrates practical experience with:

- React development
- Component-based architecture
- React state management
- React Router
- REST API consumption
- JavaScript asynchronous programming
- Node.js
- Express.js
- Middleware
- RESTful API design
- MongoDB
- Mongoose
- Database validation
- CRUD operations
- CORS
- Full-stack application architecture
- Frontend-backend integration
- Git and GitHub

---

## Author

**Hriday Desai**

Computer Engineering Student

---

## Project Status

```text
Practicals 1–6: Completed
```

The application currently supports a complete:

```text
Create → Read → Update → Delete
```

workflow from the React frontend through the Express backend into MongoDB Atlas.