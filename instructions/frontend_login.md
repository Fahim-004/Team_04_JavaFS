# PAT Frontend Setup Guide

## React Authentication Module (Login System)

This guide explains how the frontend team should set up the **React frontend project** and implement the **login functionality** that connects to the backend authentication APIs.

All frontend developers must work on **one shared React project**.

---

# 1. Frontend Project Creation (Only ONE Developer)

Only **one frontend developer** should create the React project.

Run the following command:

```id="j1g2u9"
npm create vite@latest pat-frontend
```

Choose the following options:

```id="6p3x2l"
Framework: React
Variant: JavaScript
```

Navigate into the project folder.

```id="0trw6u"
cd pat-frontend
```

Install dependencies.

```id="k9w3yr"
npm install
```

---

# 2. Verify the Project Runs

Start the development server.

```id="n2g5r7"
npm run dev
```

Open the URL displayed in the terminal (usually `http://localhost:5173`).

The default Vite React page should load.

Do **not continue** until the project runs successfully.

---

# 3. Install Required Package

Install Axios for backend communication.

```id="p5v8eq"
npm install axios
```

Axios will be used for sending HTTP requests to the backend APIs.

---

# 4. Create Frontend Folder Structure

Inside the `src` folder create the following directories.

```id="w4q0hf"
pages
components
services
context
routes
```

Final structure should look like this:

```id="9r2t7b"
src
 ├── pages
 ├── components
 ├── services
 ├── context
 ├── routes
 ├── App.jsx
 └── main.jsx
```

These folders should exist before development begins.

---

# 5. Clean Default Vite Files

Remove unnecessary demo files.

Delete the following:

```id="v1t4pr"
src/assets/react.svg
src/App.css
src/index.css
```

Simplify `App.jsx` to a basic placeholder.

Example:

```id="a0c2us"
function App() {
  return <h1>PAT System</h1>;
}

export default App;
```

Run the project again to ensure it still works.

```id="3b7k9m"
npm run dev
```

---

# 6. Upload the Frontend Skeleton to GitHub

Initialize git inside the project.

```id="6p1m5j"
git init
git add .
git commit -m "Initial React frontend skeleton"
```

Add the GitHub repository.

```id="x7q4vd"
git remote add origin <repo-url>
```

Push the project.

```id="2g6w8c"
git push -u origin main
```

At this stage GitHub contains the **React frontend skeleton project**.

---

# 7. Other Frontend Developers Setup

All other frontend developers must **clone the same repository**.

```id="4h9c3r"
git clone <repo-url>
```

Install dependencies.

```id="0v2l8n"
npm install
```

Run the project locally.

```id="1m7q5t"
npm run dev
```

All developers must work on the **same frontend project**.

No developer should create a separate React project.

---

# 8. Frontend Developer Responsibilities

Frontend development will be divided among **four developers**.

---

## Frontend Developer 1 — Login Page UI

Responsible for the login page layout.

Create:

```id="j3v5t1"
pages/LoginPage.jsx
```

Tasks:

```id="2y4h6g"
Create login form
Add email input field
Add password input field
Add login button
Add basic form validation
Display login errors
```

---

## Frontend Developer 2 — Reusable Components

Responsible for reusable UI components.

Create:

```id="q6p9d4"
components/InputField.jsx
components/Button.jsx
```

Tasks:

```id="8r1w0x"
Create reusable input component
Create reusable button component
Add basic styling
```

These components will be used inside the login page.

---

## Frontend Developer 3 — API Integration

Responsible for backend communication.

Create:

```id="5l7n2c"
services/api.js
```

Tasks:

```id="0z4m9p"
Send HTTP requests to backend
Connect login page with backend API
Handle API responses
Handle API errors
```

Example backend endpoint:

```id="6b3f8v"
POST /auth/login
```

All backend communication must go through this file.

---

## Frontend Developer 4 — Authentication State

Responsible for login state management.

Create:

```id="3x8y2k"
context/AuthContext.jsx
routes/AppRoutes.jsx
```

Tasks:

```id="7d1j5w"
Store JWT token after login
Provide authentication state across the app
Create login function
Create logout function
Protect routes
Redirect user after login
```

JWT token should be stored in:

```id="4s2v0m"
localStorage
```

Example key:

```id="1q9p6r"
authToken
```

---

# 9. Backend Login API Contract

Frontend login requests must match the backend API.

Request:

```id="5k8c1p"
POST /auth/login
```

Example request body:

```id="9t3l6x"
{
  "email": "user@example.com",
  "password": "123456"
}
```

Example response:

```id="2d7w4q"
{
  "token": "jwt-token"
}
```

---

# 10. Login Flow

The authentication process should follow this flow.

```id="4v8b2s"
User enters email and password
        ↓
User clicks Login
        ↓
React sends POST request to backend
        ↓
Backend validates credentials
        ↓
Backend returns JWT token
        ↓
Frontend stores token in localStorage
        ↓
User redirected to dashboard
```

---

# 11. Git Workflow

Each frontend developer must work on a **feature branch**.

Examples:

```id="0x5m8t"
feature/login-page
feature/ui-components
feature/api-integration
feature/auth-context
```

Workflow:

```id="7p2v6k"
Create branch
Write code
Commit changes
Push branch
Create Pull Request
Merge after review
```

Developers should **never commit directly to main**.

---

# 12. Frontend Completion Criteria

The authentication module is complete when:

```id="3n8t1f"
Login page UI is functional
Login API connects to backend
JWT token is stored
User is redirected after login
Protected routes work
```

---

# 13. Next Frontend Development Phase

After authentication is complete, the team will begin building additional UI modules:

```id="8q6k3v"
Student Dashboard
Recruitment Drive Page
Application Status Page
Admin Dashboard
Analytics UI
```

Authentication must be working before these modules begin.
