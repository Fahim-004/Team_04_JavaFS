# Placement Automation Tool (PAT)
## Software Requirements Specification (SRS)

---

# 1. Introduction

## 1.1 Purpose

The purpose of this document is to describe the functional and non‑functional requirements of the **Placement Automation Tool (PAT)**.

PAT is a web-based system designed to automate and streamline the campus placement process by providing a centralized platform for:

- Students
- Employers
- College administrators

This document serves as a reference for developers, stakeholders, and reviewers involved in the project.

---

## 1.2 Scope

The Placement Automation Tool (PAT) manages the entire campus recruitment lifecycle within a college.

The system allows:

- Students to create profiles and apply for jobs
- Employers to post job opportunities and manage recruitment rounds
- College administrators to monitor and manage placement activities

The initial version of the system supports **a single college**, with potential future expansion to **multi‑college support**.

---

## 1.3 Definitions

| Term | Description |
|-----|-------------|
| PAT | Placement Automation Tool |
| Admin | College placement administrator |
| Employer | Company recruiter |
| USN | University Seat Number |
| Applicant | Student who applied for a job |

---

# 2. Overall System Description

## 2.1 System Perspective

PAT replaces manual placement workflows that rely on:

- spreadsheets
- emails
- messaging groups
- manual eligibility filtering

The system provides a **centralized platform** where all placement activities are managed.

---

## 2.2 Stakeholders

### Students

Students use PAT to:

- Create profiles
- Upload resumes
- Apply for job opportunities
- Track application progress
- Receive placement notifications

---

### Employers

Employers use PAT to:

- Register company accounts
- Post job opportunities
- Define eligibility criteria
- Manage recruitment rounds
- Track candidate progress

---

### College Admin

The College Admin oversees the system and ensures smooth operation.

Responsibilities include:

- Approving employer accounts
- Monitoring platform activity
- Viewing placement statistics
- Managing student and employer data

---

# 3. Functional Requirements

## 3.1 User Authentication

The system must allow users to:

- Register using **email and password**
- Log in securely
- Log out of the system

Supported roles:

- Student
- Employer
- Admin

Authentication is implemented using:

- Spring Security
- JWT tokens

---

## 3.2 Student Registration and Profile

Students must be able to:

- Register using email
- Complete their profile

### Student Profile Fields

#### Personal Information

- Full Name
- Phone Number
- Email
- USN (Mandatory)

#### Academic Information

- Branch / Department
- CGPA
- Backlog count
- Passing year

#### Professional Information

- Skills
- Projects
- LinkedIn (optional)
- GitHub (optional)

---

## 3.3 Resume Management

Students must upload a resume before applying for jobs.

Rules:

- Resume upload is **mandatory**
- Students may update their resume anytime
- Students can upload **custom resumes for specific jobs**

Resumes are stored in the **database**.

---

## 3.4 Employer Registration

Employers must:

1. Register on the platform
2. Wait for **Admin approval**

After approval, employers can:

- Post jobs
- Manage applicants
- Create recruitment rounds

---

## 3.5 Job Posting

Employers can create job listings with the following fields:

- Company Name
- Job Role / Title
- Job Description
- Salary / Package
- Job Location
- Eligibility Criteria
- Application Deadline
- Placement Drive Date

---

## 3.6 Eligibility Filtering

Eligibility criteria may include:

- Minimum CGPA
- Eligible branches
- Backlog status
- Passing year

The system automatically determines **which students are eligible**.

---

## 3.7 Job Application

Students can:

- View eligible job opportunities
- Apply for jobs

Requirements:

- Resume must be uploaded
- Custom resume optional

Students may apply to **multiple companies** if eligible.

Students can still apply even after getting placed.

---

## 3.8 Applicant Management (Employer)

Employers can:

- View applicants for a job
- Filter applicants by:

  - CGPA
  - Branch
  - Skills

- Download student resumes

Employers can only see **students who applied** to their jobs.

---

## 3.9 Recruitment Round Management

Employers can define **custom recruitment rounds**.

Examples:

- Aptitude Test
- Coding Round
- Technical Interview
- HR Interview

Employers update **results individually for each student**.

---

## 3.10 Application Status Tracking

Students can track their application status.

Possible statuses:

- Applied
- Shortlisted
- Round 1 Cleared
- Round 2 Cleared
- Selected
- Rejected

---

## 3.11 Notification System

The platform provides **in‑platform notifications** for:

- New job postings
- Interview updates
- Recruitment results
- Selection notifications

---

## 3.12 Student Dashboard

The student dashboard shows:

- Profile completion status
- Eligible job opportunities
- Applied jobs
- Application status
- Placement analytics

---

## 3.13 Student Analytics

Students can view:

- Number of companies applied
- Number of shortlisted applications
- Number of interviews attended

---

## 3.14 Admin Controls

The College Admin can:

- View all students
- View all employers
- Approve employer accounts
- Remove fake companies
- View placement statistics

Admin **cannot post jobs on behalf of employers**.

---

# 4. Non‑Functional Requirements

## Performance

The system should support multiple concurrent users without performance degradation.

---

## Security

Security measures include:

- JWT authentication
- Secure password hashing
- Role-based access control

---

## Scalability

The architecture should support future expansion to:

- Multi‑college placement systems
- Larger user bases

---

## Reliability

The system must ensure:

- Consistent database operations
- Accurate tracking of applications
- Reliable data storage

---

# 5. Future Scope

Potential future improvements include:

- Multi‑college placement network
- Email notifications
- AI‑based resume analysis
- Interview scheduling
- University academic data integration
- Advanced placement analytics
