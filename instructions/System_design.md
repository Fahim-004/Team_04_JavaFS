# Placement Automation Tool (PAT)

## System Design Document

## 1. System Overview

The Placement Automation Tool (PAT) is a web-based platform designed to streamline and automate the campus placement process. The system supports multiple stakeholders including students, placement coordinators, Training and Placement Officers (TPO), Genesis administrators, and HR representatives.

The system centralizes placement activities such as student registration, profile management, recruitment drives, notifications, and placement analytics.

The architecture follows a modular service-oriented design using Spring Boot backend services and a React-based frontend application.

The first module currently under development is the **Identity & User Management Service**, which provides authentication and authorization capabilities for the entire system.

---

## 2. Problem Statement

Many campus placement processes rely heavily on spreadsheets, emails, and manual tracking systems. These approaches introduce several challenges:

* Lack of centralized student data management
* Difficulty in managing recruitment drives
* Limited visibility into student placement status
* Inefficient communication between stakeholders

The Placement Automation Tool addresses these problems by providing a centralized digital platform that automates placement workflows and improves transparency across the placement ecosystem.

---

## 3. Technology Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* Maven

### Frontend

* React
* Vite

### Database

* MySQL

### API Communication

* REST APIs

### Authentication

* JWT (JSON Web Tokens)

### Development Environment

* Localhost development environment

Future deployments may involve containerized infrastructure or cloud hosting.

---

## 4. Functional Requirements

### Student

* Register an account
* Login to the platform
* Manage personal profile
* Apply for recruitment drives
* Track application status

### Coordinator

* Manage student data
* Verify student profiles
* Upload academic records

### Training and Placement Officer (TPO)

* Create recruitment drives
* Define eligibility criteria
* Monitor placement statistics

### HR

* View eligible student candidates
* Update recruitment results

### Genesis Admin

* Manage system configuration
* Access analytics dashboards

---

## 5. Non-Functional Requirements

### Performance

The system should support concurrent access by multiple students and administrators.

### Security

* All passwords must be securely hashed using BCrypt.
* JWT authentication must protect all secured endpoints.

### Scalability

The backend services should be modular to allow independent scaling in the future.

### Reliability

The system should implement proper error handling and maintain consistent data operations.

---

## 6. System Architecture

High-level architecture:

User Browser
    │
React Frontend
    │
REST API Layer
    │
Spring Boot Backend Services
    │
MySQL Database

Each backend service manages a specific domain within the system and communicates using REST APIs.

---

## 7. System Modules

### Identity & User Management Service

This service handles authentication and authorization for the entire platform.

Responsibilities include:

* User registration
* User login
* JWT token generation
* Role-based access control
* Password reset functionality
* OTP verification (mock implementation)
* Profile verification badge

---

### Student Profile & Rating Service

Manages student academic and professional information.

Features include:

* Academic record management
* Internship tracking
* Project tracking
* Department rating system
* CSV upload functionality
* Student dashboard

---

### Recruitment Drive & Funnel Service

Manages recruitment drives and application processes.

Features include:

* Creating recruitment drives
* Defining eligibility criteria
* Managing recruitment stages
* Allowing students to apply
* Tracking selection and rejection

---

### Notification & Communication Service

Handles system notifications and messaging.

Features include:

* Email notifications (mock APIs)
* SMS or WhatsApp notifications (mock APIs)
* Event-based notification triggers
* Bulk messaging

---

### Analytics & Admin Dashboard Service

Provides analytics and reporting for placement activities.

Features include:

* Placement statistics
* Recruitment funnel metrics
* Package analytics
* Administrative dashboards

---

## 8. Database Design

### Users Table

| Field      | Type      | Description           |
| ---------- | --------- | --------------------- |
| id         | BIGINT    | Primary key           |
| name       | VARCHAR   | User name             |
| email      | VARCHAR   | Unique email          |
| password   | VARCHAR   | Encrypted password    |
| role_id    | BIGINT    | Role reference        |
| created_at | TIMESTAMP | Account creation time |

---

### Roles Table

| Field     | Type    | Description |
| --------- | ------- | ----------- |
| id        | BIGINT  | Primary key |
| role_name | VARCHAR | Role name   |

Supported roles include:

* Student
* Coordinator
* TPO
* Genesis Admin
* HR

Future tables may include:

* OTP verification tokens
* Password reset tokens

---

## 9. Authentication Flow

Authentication uses a **JWT-based authentication system**.

Authentication flow:

1. User enters login credentials on the React login page.
2. React frontend sends a request to the backend.

POST /auth/login

3. Spring Boot validates the credentials.
4. A JWT token is generated.
5. The token is returned to the frontend.
6. The frontend stores the token and includes it in future requests.

Example request header:

Authorization: Bearer <JWT_TOKEN>

---

## 10. Example API Endpoints

### Authentication APIs

POST /auth/register
POST /auth/login
POST /auth/logout

### User APIs

GET /users/{id}
PUT /users/{id}
GET /users

### Password APIs

POST /auth/forgot-password
POST /auth/reset-password

---

## 11. Repository Structure

Example repository layout:

PAT-System
│
├── backend
│   ├── identity-service
│   ├── student-service
│   ├── recruitment-service
│   ├── notification-service
│   └── analytics-service
│
├── frontend
│   └── pat-portal
│
├── database
│   └── schema.sql
│
└── docs
    └── system-design.md

Each service is developed independently while communicating via REST APIs.

---

## 12. Deployment Strategy

### Current Development Phase

Localhost development environment

### Future Deployment Possibilities

* Docker containerization
* Cloud hosting infrastructure
* API Gateway for centralized routing
* CI/CD pipeline implementation

---

## 13. Future Improvements

Potential system enhancements include:

* API Gateway integration
* Event-driven communication between services
* Containerized deployments
* Monitoring and logging infrastructure
* Performance optimization and scaling
