# Placement Automation Tool (PAT)

## Software Requirements Specification (SRS)

---

# 1. Introduction

## 1.1 Purpose

The purpose of this document is to describe the functional and non-functional requirements of the Placement Automation Tool (PAT).

PAT is a web-based system designed to automate and streamline the campus placement process by providing a centralized platform for:

* Students
* Employers
* College administrators

This document serves as a reference for developers, stakeholders, and reviewers.

---

## 1.2 Scope

The Placement Automation Tool (PAT) manages the entire campus recruitment lifecycle within a college.

The system allows:

* Students to create profiles and apply for jobs
* Employers to post job opportunities and manage recruitment rounds
* College administrators to monitor and manage placement activities

The system enforces **strict validation rules and eligibility constraints** to ensure data consistency.

---

## 1.3 Definitions

| Term      | Description                     |
| --------- | ------------------------------- |
| PAT       | Placement Automation Tool       |
| Admin     | College placement administrator |
| Employer  | Company recruiter               |
| USN       | University Seat Number          |
| Applicant | Student who applied for a job   |

---

# 2. Overall System Description

## 2.1 System Perspective

PAT replaces manual workflows involving:

* Spreadsheets
* Emails
* Messaging groups
* Manual filtering

The system ensures:

* All inputs are validated
* All actions follow defined rules
* Invalid operations are rejected

---

## 2.2 Stakeholders

### Students

* Create profiles
* Upload resumes
* Apply for jobs
* Track applications
* Receive notifications

---

### Employers

* Register company accounts
* Post jobs (with validation rules)
* Define eligibility criteria
* Manage recruitment rounds
* Track applicants

---

### Admin

* Approve employers
* Monitor system activity
* View statistics
* Maintain system integrity

---

# 3. Functional Requirements

## 3.1 User Authentication

* Register with email and password
* Login securely
* Logout

Roles:

* Student
* Employer
* Admin

Authentication uses:

* Spring Security
* JWT

---

## 3.2 Student Profile

Students must:

* Register
* Complete profile

### Fields

* Full Name
* Phone Number
* Email
* USN (Mandatory)
* Branch
* CGPA
* Backlog count
* Passing year
* Skills
* Projects
* LinkedIn (optional)
* GitHub (optional)

---

## 3.3 Resume Management

* Resume required before applying
* Multiple resumes allowed
* Resume can be updated

---

## 3.4 Employer Registration

* Employer registers
* Admin approval required
* Only approved employers can post jobs

---

## 3.5 Job Posting

### Required Fields

* Job Title
* Salary Package
* Application Deadline
* Placement Drive Date

### Optional Fields

* Job Description
* Job Location
* Minimum CGPA
* Eligible Branches
* Maximum Backlogs
* Passing Year

---

### Validation Rules

* Required fields must not be empty
* Application deadline must be future date
* Placement drive date ≥ application deadline
* CGPA (if provided) must be between 0–10
* Backlogs (if provided) must be ≥ 0

---

### Failure Handling

* Invalid requests are rejected
* Error messages returned
* No invalid data stored

---

## 3.6 Eligibility Filtering

* Criteria enforced only if provided
* NULL values are ignored

Example:

* No CGPA → no CGPA filter
* No passing year → all eligible

---

## 3.7 Job Application

### Requirements

* Resume must exist
* Job must exist
* Student must be eligible

---

### Validation

* Check eligibility
* Check resume
* Check job

---

### Failure Handling

* Reject invalid applications
* Return error response

---

## 3.8 Applicant Management

* View applicants
* Filter by CGPA, branch, skills

Rules:

* Filters apply only if provided
* No filter → full results

---

## 3.9 Recruitment Rounds

* Custom rounds allowed
* Must have order
* Order must be unique and sequential

---

## 3.10 Application Status

* Must follow valid progression
* Invalid transitions rejected

---

## 3.11 Notifications

Triggers:

* Job creation
* Application updates
* Round updates

Rules:

* Must be user-specific
* Read/unread tracked

---

## 3.12 Dashboard

Shows:

* Profile completion
* Eligible jobs
* Applications
* Status
* Analytics

---

## 3.13 Analytics

* Applications count
* Shortlisted count
* Interviews

---

## 3.14 Admin Controls

* Approve employers
* View users
* Monitor system
* Remove invalid data

---

# 4. Non-Functional Requirements

## Performance

* Handle multiple concurrent users

---

## Security

* JWT authentication
* Password hashing
* Role-based access
* API-level validation

---

## Scalability

* Extendable to multi-college system

---

## Reliability

* Strict validation before DB operations
* No invalid data stored
* Consistent behavior

---

# 5. Future Scope

* Multi-college system
* Email notifications
* AI resume analysis
* Interview scheduling
* Advanced analytics
