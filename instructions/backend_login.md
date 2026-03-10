# PAT Backend Setup Guide

## Spring Boot Authentication Module

This document explains how the backend team should set up the **Spring Boot backend project** and implement the **authentication system (Register + Login)**.

This guide ensures that **all backend developers work on the same project and structure**.

---

# 1. Backend Project Creation (Only ONE Developer)

Only **one backend developer** should create the Spring Boot project.

Go to:

https://start.spring.io

Use the following configuration.

Project Settings

```
Project: Maven
Language: Java
Spring Boot: Latest stable version
Group: com.pat
Artifact: backend
Name: backend
Packaging: Jar
Java: 17
```

---

# 2. Required Dependencies

Add the following dependencies:

```
Spring Web
Spring Data JPA
Spring Security
MySQL Driver
Lombok
Validation
```

Click **Generate** and download the project.

---

# 3. Extract and Prepare the Project

Extract the downloaded zip file.

Open the project in an IDE:

* IntelliJ IDEA
* VS Code
* Eclipse

Verify that the project runs successfully before uploading it to GitHub.

---

# 4. Create the Backend Package Structure

Before uploading to GitHub, create the **standard backend package structure**.

Navigate to:

```
src/main/java/com/pat/backend
```

Create the following packages.

```
config
controller
service
repository
entity
dto
security
```

The project should look like this:

```
backend
 ├── src
 │   ├── main
 │   │   ├── java/com/pat/backend
 │   │   │   ├── config
 │   │   │   ├── controller
 │   │   │   ├── service
 │   │   │   ├── repository
 │   │   │   ├── entity
 │   │   │   ├── dto
 │   │   │   ├── security
 │   │   │   └── BackendApplication.java
 │   │   └── resources
 │   │       └── application.properties
```

Even if these folders are empty initially, they should be created.

---

# 5. Upload the Project to GitHub

Initialize Git.

```
git init
git add .
git commit -m "Initial Spring Boot backend skeleton"
```

Push to the team's GitHub repository.

```
git remote add origin <repo-url>
git push -u origin main
```

At this stage, GitHub contains the **complete backend skeleton project**.

---

# 6. Other Backend Developers Setup

All other backend developers must **clone the same repository**.

```
git clone <repo-url>
```

Open the cloned project in their IDE.

Run the project once to verify everything works.

No developer should create a separate Spring Boot project.

Everyone works on the **same backend project**.

---

# 7. Configure MySQL Database

Open:

```
src/main/resources/application.properties
```

Add database configuration.

```
spring.datasource.url=jdbc:mysql://localhost:3306/pat_system
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Run the project and verify there are no database connection errors.

---

# 8. Backend Development Responsibilities

The backend work will be divided among **four backend developers**.

---

## Backend Developer 1 — Entities

Responsible for database entity classes.

Create:

```
entity/User.java
entity/Role.java
```

These classes represent the `users` and `roles` database tables.

---

## Backend Developer 2 — Repositories

Responsible for database access.

Create:

```
repository/UserRepository.java
repository/RoleRepository.java
```

Example repository method:

```
Optional<User> findByEmail(String email);
```

---

## Backend Developer 3 — Services

Responsible for business logic.

Create:

```
service/AuthService.java
service/UserService.java
```

Responsibilities:

```
User registration logic
User login validation
Password encryption using BCrypt
```

---

## Backend Developer 4 — Controllers and Security

Responsible for API endpoints and authentication logic.

Create:

```
controller/AuthController.java
security/JwtUtil.java
dto/LoginRequest.java
dto/LoginResponse.java
dto/RegisterRequest.java
```

Endpoints to implement:

```
POST /auth/register
POST /auth/login
```

---

# 9. DTO Classes

DTOs are used to transfer data between frontend and backend.

Examples:

LoginRequest

```
email
password
```

RegisterRequest

```
name
email
password
```

LoginResponse

```
token
```

---

# 10. API Testing (Before Frontend)

Before integrating with the frontend, backend APIs must be tested using **Postman**.

Test endpoints:

```
POST /auth/register
POST /auth/login
```

Expected login response:

```
{
  "token": "jwt-token"
}
```

---

# 11. Git Workflow

Each backend developer must create a **feature branch**.

Example:

```
feature/user-entity
feature/auth-service
feature/login-controller
feature/jwt-security
```

Workflow:

```
Create branch
Write code
Commit changes
Push branch
Create Pull Request
Merge after review
```

Never commit directly to `main`.

---

# 12. Backend Completion Criteria

The authentication module is complete when:

```
User can register
User can login
JWT token is generated
User data is stored in MySQL
APIs return correct responses
```

---

# 13. Next Development Phase

After authentication works successfully, the team will begin building additional modules:

```
Student Profile Module
Recruitment Drive Module
Notification Module
Analytics Module
```

Authentication must be stable before moving forward.
