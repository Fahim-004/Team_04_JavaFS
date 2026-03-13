# Placement Automation Tool (PAT)
## Technology Stack

This document defines the technology stack used to develop the Placement Automation Tool (PAT). The system follows a modern web application architecture using a React frontend, Spring Boot backend, and MySQL database.

---

# 1. System Architecture Overview

PAT follows a **3‑tier architecture**:

```
Client (Browser)
      │
      ▼
Frontend (React.js)
      │
      ▼
Backend API (Spring Boot)
      │
      ▼
Database (MySQL)
```

---

# 2. Frontend Technology Stack

The frontend is responsible for rendering the user interface and interacting with backend APIs.

### Core Technologies

| Technology | Purpose |
|------|------|
| React.js | Frontend framework for building UI |
| HTML5 | Structure of the web pages |
| CSS3 | Styling and layout |
| JavaScript | Application logic |

### Responsibilities

The frontend handles:

- User authentication interface
- Student dashboard
- Employer dashboard
- Admin dashboard
- Job listings
- Application workflow
- Notification display
- Analytics display

### Communication with Backend

The frontend communicates with backend services using:

```
REST APIs over HTTP
```

Example API calls:

```
GET /api/v1/jobs
POST /api/v1/auth/login
POST /api/v1/jobs/{job_id}/apply
```

---

# 3. Backend Technology Stack

The backend is responsible for handling business logic, authentication, data processing, and API services.

### Core Technologies

| Technology | Purpose |
|------|------|
| Java | Programming language |
| Spring Boot | Backend application framework |
| Spring Security | Authentication and authorization |
| JWT (JSON Web Tokens) | Secure API authentication |
| Spring Data JPA | Data access abstraction |
| Hibernate | ORM (Object Relational Mapping) |

### Backend Responsibilities

The backend manages:

- User authentication
- Role-based access control
- Student profile management
- Employer job postings
- Job eligibility filtering
- Job applications
- Recruitment round management
- Application status tracking
- Notifications
- Analytics

---

# 4. Database

### Database System

| Technology | Purpose |
|------|------|
| MySQL | Relational database management system |

### Database Responsibilities

The database stores:

- User accounts
- Student profiles
- Employer profiles
- Job postings
- Applications
- Recruitment rounds
- Resume files
- Notifications
- Analytics data

### Data Access Layer

Database operations are handled using:

```
Spring Data JPA
Hibernate ORM
```

This allows the application to map Java entities directly to database tables.

---

# 5. Authentication & Security

Authentication and authorization are implemented using **Spring Security with JWT**.

### Authentication Flow

```
User Login
    │
    ▼
Backend validates credentials
    │
    ▼
JWT token generated
    │
    ▼
Frontend stores token
    │
    ▼
Token sent with every API request
```

### Security Features

- JWT based authentication
- Role based access control
- Secure password hashing
- Protected API endpoints

---

# 6. API Testing

### Tool Used

| Tool | Purpose |
|------|------|
| Postman | API testing and debugging |

Postman is used during development for:

- Testing REST endpoints
- Verifying request and response structures
- Debugging backend APIs

---

# 7. Build & Dependency Management

### Build Tool

| Tool | Purpose |
|------|------|
| Maven | Dependency management and build automation |

### Maven Responsibilities

- Managing project dependencies
- Building the backend application
- Packaging the application
- Running tests

Main configuration file:

```
pom.xml
```

---

# 8. Configuration Management

Application configuration is stored in:

```
application.properties
```

Typical configuration includes:

```
server.port
spring.datasource.url
spring.datasource.username
spring.datasource.password
spring.jpa.hibernate.ddl-auto
jwt.secret
```

This file controls environment configuration for the backend system.

---

# 9. Version Control

### Tools Used

| Tool | Purpose |
|------|------|
| Git | Source code version control |
| GitHub | Remote repository hosting |

### Benefits

Version control allows the team to:

- Track code changes
- Collaborate efficiently
- Maintain version history
- Manage feature branches

---

# 10. Project Repository Structure

Example repository layout:

```
PAT
│
├── backend
│   └── Spring Boot application
│
├── frontend
│   └── React application
│
├── docs
│   ├── srs.md
│   ├── api_design.md
│   ├── database_schema.md
│   ├── er_diagram.md
│   └── tech_stack.md
│
└── README.md
```

---

# 11. Future Technology Improvements

Possible future enhancements include:

- Docker containerization
- Cloud deployment (AWS / Azure)
- Cloud storage for resumes
- Email notification services
- CI/CD pipelines
- Multi‑college architecture

---

# Final Technology Stack Summary

```
Frontend
React.js
HTML
CSS
JavaScript

Backend
Java
Spring Boot
Spring Security
JWT Authentication
Spring Data JPA
Hibernate

Database
MySQL

API Testing
Postman

Build Tool
Maven

Configuration
application.properties

Version Control
Git + GitHub
```

---

# Conclusion

The selected technology stack provides a scalable and maintainable architecture for the Placement Automation Tool. It follows modern web development practices and is suitable for both academic implementation and potential real-world deployment.
