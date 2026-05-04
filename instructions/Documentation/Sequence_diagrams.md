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

    Backend->>Backend: Validate input

    alt Validation Failed
        Backend-->>Frontend: Error response
        Frontend-->>Student: Show error message
    else Validation Success
        Backend->>Database: Save user
        Database-->>Backend: Success
        Backend-->>Frontend: Registration success
        Frontend-->>Student: Account created
    end
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

    Backend->>Database: Fetch job + eligibility data
    Backend->>Backend: Validate eligibility

    alt Not Eligible
        Backend-->>Frontend: Application rejected
        Frontend-->>Student: Show rejection reason
    else Eligible
        Backend->>Database: Create application
        Database-->>Backend: Success
        Backend-->>Frontend: Application successful
        Frontend-->>Student: Application submitted
    end
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

    Backend->>Backend: Validate job data

    alt Validation Failed
        Backend-->>Frontend: Error response
        Frontend-->>Employer: Show validation errors
    else Validation Success
        Backend->>Database: Save job posting
        Database-->>Backend: Success
        Backend-->>Frontend: Job created
        Frontend-->>Employer: Job visible
    end
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

    Backend->>Backend: Validate request

    alt Validation Failed
        Backend-->>Frontend: Error response
        Frontend-->>Employer: Show error
    else Validation Success
        Backend->>Database: Update status
        Database-->>Backend: Success
        Backend->>Database: Create notification
        Backend-->>Frontend: Update complete
        Frontend-->>Student: Status updated notification
    end
```

---

# Key System Workflows Covered

The diagrams represent the main system operations:

1. Student registration with validation
2. Job application with eligibility checks
3. Employer job posting with strict validation
4. Recruitment round updates with validation and notification

These workflows define both **successful and failure paths** in the system.
