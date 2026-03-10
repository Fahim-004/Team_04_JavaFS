# Backend Git Push Guide (PAT Project)

This document explains the **step-by-step process backend developers must follow to push their code to the team GitHub repository**.

The objective is to ensure:

* Code is organized
* No one pushes directly to `main`
* Every feature is reviewed before merging

---

# Step 1 — Open the Backend Project

Open your backend Spring Boot project in the terminal.

Navigate to the project folder.

Example:

```
cd backend
```

Verify you are inside the correct repository.

```
git status
```

---

# Step 2 — Pull the Latest Code

Before starting work, always pull the latest changes from GitHub.

```
git pull origin main
```

This ensures your local project is up to date.

---

# Step 3 — Create a Feature Branch

Every developer must create a **separate feature branch** for their work.

Example branch names:

```
feature/user-entity
feature/user-repository
feature/auth-service
feature/auth-controller
```

Create a branch using:

```
git checkout -b feature/branch-name
```

Example:

```
git checkout -b feature/user-entity
```

Confirm your branch:

```
git branch
```

---

# Step 4 — Write Your Code

Implement the feature assigned to you.

Example responsibilities:

Developer 1 (Entities)

```
entity/User.java
entity/Role.java
```

Developer 2 (Repositories)

```
repository/UserRepository.java
repository/RoleRepository.java
```

Developer 3 (Services)

```
service/AuthService.java
service/UserService.java
```

Developer 4 (Controllers & Security)

```
controller/AuthController.java
security/JwtUtil.java
dto/LoginRequest.java
dto/LoginResponse.java
dto/RegisterRequest.java
```

---

# Step 5 — Check Modified Files

Before committing, check which files were changed.

```
git status
```

---

# Step 6 — Stage Files

Add the modified files to the staging area.

To add all files:

```
git add .
```

Or add specific files:

```
git add src/main/java/com/pat/backend
```

---

# Step 7 — Commit the Changes

Write a clear commit message describing what you implemented.

```
git commit -m "Add User and Role entity classes"
```

Example commit messages:

```
Add UserRepository and RoleRepository
Implement authentication service
Create login controller and JWT utility
```

---

# Step 8 — Push the Branch to GitHub

Push your feature branch to the remote repository.

```
git push origin feature/branch-name
```

Example:

```
git push origin feature/user-entity
```

---

# Step 9 — Create a Pull Request

Go to the project repository on GitHub.

GitHub will suggest creating a Pull Request.

Create a Pull Request from:

```
feature/branch-name → main
```

Fill in the following information.

Title:

```
Add User and Role entity classes
```

Description:

```
Implemented entity classes for users and roles tables.
Added database mapping using JPA annotations.
```

---

# Step 10 — Code Review

The Pull Request will be reviewed by the team lead or another developer.

Review checks include:

* Code compiles successfully
* Correct package structure
* Proper database mapping
* Naming conventions are followed

---

# Step 11 — Merge the Pull Request

Once the Pull Request is approved, it can be merged into `main`.

After merging, the feature branch can be deleted.

---

# Step 12 — Update Your Local Repository

After a Pull Request is merged, all developers must update their local code.

```
git pull origin main
```

This ensures everyone works on the **latest version of the backend project**.

---

# Important Rules

Never push directly to `main`.

Always create a **feature branch**.

Every change must go through a **Pull Request**.

Always run the backend project locally before pushing code.
