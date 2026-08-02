
## Installation

npm install

npm run dev








# 🏔️ BaseCamp - Collaborative Project Management System Backend

[![Node.js Version](https://img.shields.io/badge/Node.js-v18%2B-brightgreen.svg)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-v5.2-blue.svg)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose%20v9-green.svg)](https://mongoosejs.com/)
[![JWT Authentication](https://img.shields.io/badge/Auth-JWT%20%2B%20Refresh%20Tokens-orange.svg)](https://jwt.io/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

**BaseCamp Project Management System** is a robust, production-ready RESTful API service built with Node.js, Express.js, and MongoDB. It provides end-to-end features for collaborative project management, task tracking with subtasks, file attachments, project notes, role-based permission management, and secure JWT authentication.

---

## 🌟 Key Features

- **🔐 Robust Authentication & Security**
  - Registration with automatic tokenized email verification via Mailtrap & Mailgen.
  - JWT Authentication using dual-token system (**Short-lived Access Tokens** & **Secure Refresh Tokens** stored in HTTP-only cookies).
  - Secure Password Hashing using **bcrypt** (salt factor 10).
  - Password management: Change password, forgot password with encrypted URL tokens, and reset password flows.

- **📁 Project Management & Team Collaboration**
  - Complete project lifecycle management (Create, Read, Update, Delete).
  - MongoDB Aggregation Pipeline for fast project listing enriched with dynamic member counts.
  - Granular **Role-Based Access Control (RBAC)** across 3 permission levels:
    - 👑 **Admin**: Full control over projects, team members, tasks, and project notes.
    - 🛠️ **Project Admin**: Create and manage tasks, subtasks, and view project assets.
    - 👤 **Member**: View assigned projects/tasks and update subtask completion statuses.

- **📋 Task & Subtask Hierarchy**
  - Rich task tracking with 3-tier status system (`todo`, `in_progress`, `done`).
  - Task assignment to specific project members with `assignedBy` audit trails.
  - Multiple file attachment support powered by **Multer** middleware (saved under `/public/images`).
  - Subtask management linked to parent tasks with real-time completion tracking.

- **📝 Project Notes**
  - Dedicated note-taking system per project for key team announcements and project documentation.

- **🛡️ Enterprise Architecture & Code Quality**
  - **Modular Architecture**: Clean separation of Controllers, Routers, Middlewares, Models, and Validators.
  - **Input Validation**: Strict request sanitization powered by `express-validator`.
  - **Centralized Error Handling**: Unified `ApiError` class and global error handling middleware for safe, standard JSON error responses.

---

## 🏗️ Tech Stack & Dependencies

- **Runtime Environment**: [Node.js](https://nodejs.org/) (v18+)
- **Web Framework**: [Express.js](https://expressjs.com/) (v5.x)
- **Database & ODM**: [MongoDB](https://www.mongodb.com/) with [Mongoose ODM](https://mongoosejs.com/)
- **Authentication**: [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) & [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- **File Uploads**: [Multer](https://github.com/expressjs/multer)
- **Email Delivery**: [Nodemailer](https://nodemailer.com/) & [Mailgen](https://github.com/eladnava/mailgen)
- **Validation**: [express-validator](https://express-validator.github.io/docs/)
- **Utilities**: `cookie-parser`, `cors`, `dotenv`

---

## 📂 Directory Structure

```text
BaseCamp-Project_Management_System/
├── Public/
│   └── images/                 # Uploaded file attachments static storage
├── src/
│   ├── Controllers/            # Request handlers & core business logic
│   │   ├── Auth.Controllers.js
│   │   ├── healthCheck.controller.js
│   │   ├── note.controllers.js
│   │   ├── project.controllers.js
│   │   └── task.controllers.js
│   ├── DB/                     # Database connection setup
│   │   └── db.js
│   ├── Middlewares/            # Authentication, upload & error middlewares
│   │   ├── auth.middlewares.js
│   │   ├── multer.middleware.js
│   │   └── validator.middlewre.js
│   ├── Models/                 # Mongoose schema definitions & methods
│   │   ├── note.models.js
│   │   ├── project.models.js
│   │   ├── projectmember.models.js
│   │   ├── subtask.models.js
│   │   ├── task.models.js
│   │   └── user.models.js
│   ├── Routers/                # Express API routes
│   │   ├── AuthRoutes.js
│   │   ├── healthcheck.routers.js
│   │   ├── note.routes.js
│   │   ├── project.routes.js
│   │   └── task.routes.js
│   ├── utils/                  # Helper classes and constant definitions
│   │   ├── ap-error.js
│   │   ├── api-response.js
│   │   ├── async-handler.js
│   │   ├── constants.js
│   │   └── mail.js
│   ├── validators/             # Request payload validation schemas
│   │   └── index.js
│   └── app.js                  # Express app initialization & route mounting
├── .env                        # Environment variable configuration
├── PRD.md                      # Product Requirements Document
├── package.json
└── server.js                   # Application entry point
```

---

## ⚙️ Environment Variables Setup

Create a `.env` file in the root directory and configure the following variables:

```env
PORT=3000

# Database Configuration
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/basecamp?retryWrites=true&w=majority

# JWT Token Secrets & Expiries
ACCESS_TOKEN_SECRET=your_super_secret_access_key
ACCESS_TOKEN_EXPIRY=1d

REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRY=10d

# Mailtrap / SMTP Email Configuration
MAILTRAP_SMPT_HOST=sandbox.smtp.mailtrap.io
MAILTRAP_SMPT_PORT=2525
MAILTRAP_SMPT_USER=your_mailtrap_user
MAILTRAP_SMPT_PASS=your_mailtrap_password

# Redirect URLs
FORGOT_PASSWORD_REDIRECT_URL=http://localhost:3000/forgot-password
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
Ensure you have Node.js (v18+) and MongoDB installed or access to a MongoDB Atlas cluster.

### 2. Installation
Clone the repository and install all required dependencies:

```bash
git clone https://github.com/your-username/BaseCamp-Project_Management_System.git
cd BaseCamp-Project_Management_System
npm install
```

### 3. Running the Server

#### Development Mode (with hot reloading via nodemon):
```bash
npm run dev
```

#### Production Mode:
```bash
node server.js
```

The server will start listening on `http://localhost:3000` (or your configured `PORT`).

---

## 🔐 Role Permission Matrix

| Feature / Endpoint Action   | Admin | Project Admin | Member |
| --------------------------- | :---: | :-----------: | :----: |
| Create Project              |  ✓   |      ✗        |   ✗    |
| Update / Delete Project     |  ✓   |      ✗        |   ✗    |
| Add / Remove Team Members   |  ✓   |      ✗        |   ✗    |
| Update Member Roles         |  ✓   |      ✗        |   ✗    |
| Create / Delete Tasks       |  ✓   |      ✓        |   ✗    |
| Update Task & Status        |  ✓   |      ✓        |   ✗    |
| View Project & Tasks        |  ✓   |      ✓        |   ✓    |
| Create / Delete Subtasks    |  ✓   |      ✓        |   ✗    |
| Update Subtask Completion   |  ✓   |      ✓        |   ✓    |
| Create / Edit / Delete Notes|  ✓   |      ✗        |   ✗    |
| View Project Notes          |  ✓   |      ✓        |   ✓    |

---

## 📡 Complete API Reference

All requests and responses return standard JSON format using the uniform `ApiResponse` / `ApiError` structures.

### 🏥 1. System Health Check
- **`GET /api/v1/healthcheck/`**
  - **Access**: Public
  - **Description**: Returns API system health status.

---

### 🔑 2. Authentication Routes (`/api/v1/auth/`)

| Method | Endpoint                        | Protection | Description |
| :----- | :------------------------------ | :--------: | :---------- |
| `POST` | `/register`                     |   Public   | Register a new user account & trigger verification email. |
| `POST` | `/login`                        |   Public   | Authenticate with `email`/`username` & `password`. Returns tokens & sets cookies. |
| `GET`  | `/verify-email/:verificationToken` | Public  | Verify user account via token link. |
| `POST` | `/refresh-token`                |   Public   | Refresh expired `accessToken` using a valid `refreshToken`. |
| `POST` | `/forgot-password`             |   Public   | Send password reset link to user's email. |
| `POST` | `/reset-password/:resetToken`   |   Public   | Reset user password using token. |
| `POST` | `/logout`                       | 🔒 JWT Sec | Invalidate refresh token and clear auth cookies. |
| `GET`  | `/current-user`                 | 🔒 JWT Sec | Fetch logged-in user profile. |
| `POST` | `/change-password`              | 🔒 JWT Sec | Update password for current logged-in user. |
| `POST` | `/resend-email-verification`    | 🔒 JWT Sec | Resend email verification link. |

---

### 📂 3. Project Routes (`/api/v1/projects/`)

| Method   | Endpoint                          | Protection & Role          | Description |
| :------- | :-------------------------------- | :------------------------: | :---------- |
| `GET`    | `/`                               | 🔒 JWT Sec                 | List all projects where user is a member (with total member count). |
| `POST`   | `/`                               | 🔒 JWT Sec                 | Create a new project (Creator assigned `admin` role automatically). |
| `GET`    | `/:projectId`                     | 🔒 Member Permission       | Get detailed project information. |
| `PUT`    | `/:projectId`                     | 🔒 Admin Only              | Update project `name` and `description`. |
| `DELETE` | `/:projectId`                     | 🔒 Admin Only              | Delete project and clean up related member records. |
| `GET`    | `/:projectId/members`             | 🔒 Member Permission       | List all team members assigned to a project. |
| `POST`   | `/:projectId/members`             | 🔒 Admin Only              | Add a team member to project by email & role. |
| `PUT`    | `/:projectId/members/:userId`     | 🔒 Admin Only              | Update a project member's role (`admin`, `project_admin`, `member`). |
| `DELETE` | `/:projectId/members/:userId`     | 🔒 Admin Only              | Remove a team member from project. |

---

### 📋 4. Task & Subtask Routes (`/api/v1/tasks/`)

| Method   | Endpoint                          | Protection & Role          | Description |
| :------- | :-------------------------------- | :------------------------: | :---------- |
| `GET`    | `/:projectId`                     | 🔒 Member Permission       | Fetch all tasks for a specific project. |
| `POST`   | `/:projectId`                     | 🔒 Admin / Project Admin   | Create a new task with optional file attachments (Multer). |
| `GET`    | `/:projectId/t/:taskId`           | 🔒 Member Permission       | Get task details with populated assignee & subtasks. |
| `PUT`    | `/:projectId/t/:taskId`           | 🔒 Admin / Project Admin   | Update task details or status (`todo`, `in_progress`, `done`). |
| `DELETE` | `/:projectId/t/:taskId`           | 🔒 Admin / Project Admin   | Delete task and all associated subtasks. |
| `POST`   | `/:projectId/t/:taskId/subtasks`  | 🔒 Admin / Project Admin   | Add a subtask to a task. |
| `PUT`    | `/:projectId/st/:subTaskId`       | 🔒 Member Permission       | Update subtask title or toggle `isCompleted`. |
| `DELETE` | `/:projectId/st/:subTaskId`       | 🔒 Admin / Project Admin   | Remove a subtask. |

---

### 📝 5. Project Note Routes (`/api/v1/notes/`)

| Method   | Endpoint                          | Protection & Role          | Description |
| :------- | :-------------------------------- | :------------------------: | :---------- |
| `GET`    | `/:projectId`                     | 🔒 Member Permission       | List all notes under a project. |
| `POST`   | `/:projectId`                     | 🔒 Admin Only              | Create a new project note. |
| `GET`    | `/:projectId/n/:noteId`           | 🔒 Member Permission       | Get note details by ID. |
| `PUT`    | `/:projectId/n/:noteId`           | 🔒 Admin Only              | Update project note content. |
| `DELETE` | `/:projectId/n/:noteId`           | 🔒 Admin Only              | Delete a project note. |

---

## 🧪 Response & Error Formats

### Standard Success Response:
```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "66a5e1f0b2c3d4e5f6a7b8c9",
      "username": "johndoe",
      "email": "john@example.com",
      "fullName": "John Doe"
    }
  },
  "message": "User logged in successfully",
  "success": true
}
```

### Standard Error Response:
```json
{
  "statusCode": 401,
  "success": false,
  "message": "Invalid credentials",
  "errors": [],
  "data": null
}
```

---

## 📄 License

This project is open-source and licensed under the [ISC License](LICENSE).















