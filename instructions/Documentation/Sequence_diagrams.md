# Placement Automation Tool (PAT)
## Sequence Diagrams

This document illustrates key workflows in the Placement Automation Tool.

---

# 1. Student Registration Flow

```mermaid
sequenceDiagram

    participant Student
    participant Frontend
    participant Backend
    participant Database

    Student->>Frontend: Register account
    Frontend->>Backend: POST /auth/register
    Backend->>Database: Save user
    Database-->>Backend: Success
    Backend-->>Frontend: Registration success
    Frontend-->>Student: Account created
```

---

# 2. Job Application Flow

```mermaid
sequenceDiagram

    participant Student
    participant Frontend
    participant Backend
    participant Database

    Student->>Frontend: Click Apply Job
    Frontend->>Backend: POST /jobs/{job_id}/apply
    Backend->>Database: Validate eligibility
    Database-->>Backend: Eligible
    Backend->>Database: Create application
    Backend-->>Frontend: Application successful
    Frontend-->>Student: Application submitted
```

---

# 3. Employer Job Posting Flow

```mermaid
sequenceDiagram

    participant Employer
    participant Frontend
    participant Backend
    participant Database

    Employer->>Frontend: Create Job
    Frontend->>Backend: POST /jobs
    Backend->>Database: Save job posting
    Database-->>Backend: Job saved
    Backend-->>Frontend: Job created
    Frontend-->>Employer: Job visible
```

---

# 4. Recruitment Round Update Flow

```mermaid
sequenceDiagram

    participant Employer
    participant Frontend
    participant Backend
    participant Database
    participant Student

    Employer->>Frontend: Update round result
    Frontend->>Backend: PUT /applications/{id}/status
    Backend->>Database: Update status
    Database-->>Backend: Success
    Backend->>Database: Create notification
    Backend-->>Frontend: Update complete
    Frontend-->>Student: Status updated notification
```

---

# Key System Workflows Covered

The diagrams represent the main system operations:

1. Student registration
2. Job application
3. Employer job posting
4. Recruitment round updates

These workflows define the primary interactions between users and the PAT system.
