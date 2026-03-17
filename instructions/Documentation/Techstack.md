# Placement Automation Tool (PAT)

## Technology Stack

This document defines the technology stack used to develop the Placement Automation Tool (PAT). The system follows a modern web application architecture using a React frontend, Spring Boot backend, and MySQL database.

---

# 1. System Architecture Overview

PAT follows a **3-tier architecture**:

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

| Technology | Purpose                            |
| ---------- | ---------------------------------- |
| React.js   | Frontend framework for building UI |
| HTML5      | Structure of the web pages         |
| CSS3       | Styling and layout                 |
| JavaScript | Application logic                  |

### Responsibilities

The frontend handles:

* User authentication interface
* Student dashboard
* Employer dashboard
* Admin dashboard
* Job listings
* Application workflow
* Notification display
* Analytics display

### Communication with Backend

The frontend communicates with backend services using:

```
REST APIs over HTTP
```

---

# 3. Backend Technology Stack

The backend is responsible for handling business logic, authentication, data processing, and API services.

### Core Technologies

| Technology            | Purpose                            |
| --------------------- | ---------------------------------- |
| Java                  | Programming language               |
| Spring Boot           | Backend application framework      |
| Spring Web            | REST API development               |
| Spring Security       | Authentication and authorization   |
| JWT (JSON Web Tokens) | Secure API authentication          |
| Spring Data JPA       | Data access abstraction            |
| Hibernate             | ORM (Object Relational Mapping)    |
| Jakarta Validation    | Input validation using annotations |

---

### Backend Responsibilities

The backend manages:

* User authentication
* Role-based access control
* Input validation (API-level validation before DB operations)
* Student profile management
* Employer job postings
* Job eligibility filtering
* Job applications
* Recruitment round management
* Application status tracking
* Notifications
* Analytics

---

# 4. Database

### Database System

| Technology | Purpose                               |
| ---------- | ------------------------------------- |
| MySQL      | Relational database management system |

### Database Responsibilities

The database stores:

* User accounts
* Student profiles
* Employer profiles
* Job postings
* Applications
* Recruitment rounds
* Resume files
* Notifications
* Analytics data

### Data Access Layer

Database operations are handled using:

```
Spring Data JPA
Hibernate ORM
```

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

* JWT based authentication
* Role based access control
* Secure password hashing
* Protected API endpoints

---

# 6. API Testing

### Tool Used

| Tool    | Purpose                   |
| ------- | ------------------------- |
| Postman | API testing and debugging |

---

# 7. Build & Dependency Management

### Build Tool

| Tool  | Purpose                                    |
| ----- | ------------------------------------------ |
| Maven | Dependency management and build automation |

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

---

# 9. Version Control

| Tool   | Purpose                     |
| ------ | --------------------------- |
| Git    | Source code version control |
| GitHub | Remote repository hosting   |

---

# 10. Project Repository Structure

```
PAT
│
├── backend
├── frontend
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

* Docker containerization
* Cloud deployment (AWS / Azure)
* Cloud storage for resumes
* Email notification services
* CI/CD pipelines
* Multi-college architecture

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
Spring Web
Spring Security
JWT Authentication
Spring Data JPA
Hibernate
Jakarta Validation

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
