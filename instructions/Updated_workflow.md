# PAT Project – Development Workflow Guide

This document explains how the **team should work with Git and GitHub for this project**.

The goal of this workflow is to:

* Keep the project **simple and fast to develop**
* Avoid complicated Git workflows (branches, pull requests, etc.)
* Ensure everyone's code stays **synchronized**
* Prevent accidental overwriting of each other's work

Instead of complex branching strategies, the team will use a **simple two-branch workflow**.

```
main → Stable working version of the project
dev  → Active development branch where everyone works
```

---

# Repository Structure

The repository currently looks like this:

```
PAT_System
│
├── backend_pat        → Spring Boot Backend
├── pat-frontend       → React Frontend
├── instructions       → Project documentation
└── .gitignore
```

Both **backend and frontend developers will work inside the same repository**.

---

# Important Rule

All development will happen in the **dev branch**.

No one should push code directly to the **main branch**.

The `main` branch should always remain **stable and runnable**.

---

# One-Time Setup (For Every Developer)

Each developer only needs to do this **once**.

### 1. Clone the Repository

Download the project from GitHub.

```
git clone <repository-url>
```

Example:

```
git clone https://github.com/your-team/PAT_System.git
```

Enter the project folder:

```
cd PAT_System
```

---

### 2. Switch to the Development Branch

The team works on the `dev` branch.

```
git checkout dev
```

---

### 3. Pull the Latest Code

This ensures you have the latest version of the project.

```
git pull origin dev
```

You must do this **before starting any work**.

Why?

Because other developers may have already pushed changes.

Pulling first prevents **merge conflicts** and code overwriting.

---

# Daily Development Workflow

Every developer must follow these steps while working.

---

# Step 1 — Update Your Local Code

Before writing any code, always run:

```
git checkout dev
git pull origin dev
```

Why?

This ensures your project contains **everyone's latest changes**.

Skipping this step may cause conflicts later.

---

# Step 2 — Work on Your Assigned Files

Each developer should only modify the files assigned to them.

Example responsibilities:

### Backend Developers

```
entity/User.java
entity/Role.java
repository/UserRepository.java
service/AuthService.java
controller/AuthController.java
```

### Frontend Developers

```
src/pages/LoginPage.jsx
src/components/InputField.jsx
src/services/api.js
src/context/AuthContext.jsx
```

Avoid modifying files owned by other developers unless necessary.

---

# Step 3 — Save and Test Your Code

Before committing, make sure:

* The backend project **runs successfully**
* The frontend project **runs successfully**
* Your changes **do not break the application**

Backend test example:

```
./mvnw spring-boot:run
```

Frontend test example:

```
npm run dev
```

---

# Step 4 — Stage Your Changes

Tell Git which files should be included in the commit.

```
git add .
```

This adds all modified files.

---

# Step 5 — Commit Your Changes

Create a commit describing your work.

```
git commit -m "Implement login service logic"
```

Examples:

```
Add UserRepository
Implement login API
Create login page UI
Add API integration
```

Good commit messages help the team understand changes.

---

# Step 6 — Push Your Code

Upload your changes to the GitHub repository.

```
git push origin dev
```

Your teammates will now be able to pull and use your updates.

---

# Important Team Rules

To keep development smooth, the team must follow these rules.

### Rule 1

Always run:

```
git pull origin dev
```

before starting work.

---

### Rule 2

Push your changes after completing a task.

Do not keep large changes locally for too long.

---

### Rule 3

Do not modify someone else's files without informing them.

This helps avoid unnecessary conflicts.

---

### Rule 4

Always test your code before pushing.

Never push code that breaks the application.

---

# When Do We Use the Main Branch?

The `main` branch represents a **stable version of the project**.

We only merge code into `main` when:

* A full feature is completed
* The backend and frontend work together
* The application runs without errors

Example milestone:

```
Authentication system completed
```

Then the team lead merges:

```
dev → main
```

This creates a **stable checkpoint** of the project.

---

# Example Development Cycle

Developer A pushes backend service.

```
git push origin dev
```

Developer B later runs:

```
git pull origin dev
```

Developer B now automatically receives Developer A's changes.

This keeps the entire team synchronized.

---

# Summary

The workflow for the team is very simple:

Before coding:

```
git checkout dev
git pull origin dev
```

After finishing work:

```
git add .
git commit -m "describe your change"
git push origin dev
```

That's it.

This workflow keeps development **fast, simple, and synchronized for the entire team**.
