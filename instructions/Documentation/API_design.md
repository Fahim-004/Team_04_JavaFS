# Placement Automation Tool (PAT)

## REST API Design

This document defines the REST API endpoints for the Placement Automation Tool (PAT).

Base URL:

```
/api/v1
```

---

# 1. Authentication APIs

## Register User

```
POST /auth/register
```

### Request Body

```json
{
  "email": "student@email.com",
  "password": "securepassword",
  "role": "student"
}
```

---

## Login

```
POST /auth/login
```

### Request

```json
{
  "email": "user@email.com",
  "password": "password"
}
```

### Response

```json
{
  "token": "jwt_token",
  "role": "student"
}
```

---

# 2. Student APIs

## Get Student Profile

```
GET /students/profile
```

---

## Update Student Profile

```
PUT /students/profile
```

---

## Upload Resume

```
POST /students/resume
```

---

## Get All Resumes

```
GET /students/resumes
```

---

# 3. Job APIs

## Get All Jobs

```
GET /jobs
```

### Query Parameters

```
?branch=CSE
?min_cgpa=7
```

---

## Get Job Details

```
GET /jobs/{job_id}
```

---

## Apply for Job

```
POST /jobs/{job_id}/apply
```

### Request

```json
{
  "resume_id": 123
}
```

---

## Get Applied Jobs

```
GET /students/applications
```

---

# 4. Employer APIs

## Register Employer Profile

```
POST /employers/profile
```

### Request

```json
{
  "company_name": "Google",
  "company_description": "Technology company"
}
```

---

## Post Job

```
POST /jobs
```

### Request (Validated)

```json
{
  "job_title": "Software Engineer",
  "salary_package": "18 LPA",
  "application_deadline": "2026-10-20",
  "placement_drive_date": "2026-10-25",

  "job_description": "Backend development",
  "job_location": "Bangalore",
  "min_cgpa": 7.0,
  "eligible_branches": ["CSE", "ISE"],
  "max_backlogs": 0,
  "passing_year": 2026
}
```

### Required Fields

* job_title
* salary_package
* application_deadline
* placement_drive_date

### Optional Fields

* job_description
* job_location
* min_cgpa
* eligible_branches
* max_backlogs
* passing_year

### Validation Rules

* job_title must not be empty
* salary_package must not be empty
* application_deadline must be a valid future date
* placement_drive_date must be ≥ application_deadline
* min_cgpa (if provided) must be between 0–10
* max_backlogs (if provided) must be ≥ 0

---

## Get Employer Jobs

```
GET /employers/jobs
```

---

## Get Applicants for Job

```
GET /jobs/{job_id}/applicants
```

### Query Filters

```
?cgpa=7
?branch=CSE
?skills=React
```

---

# 5. Recruitment Round APIs

## Create Recruitment Round

```
POST /jobs/{job_id}/rounds
```

---

## Get Job Rounds

```
GET /jobs/{job_id}/rounds
```

---

## Update Round Result

```
PUT /applications/{application_id}/round-result
```

---

# 6. Application Management APIs

## Update Application Status

```
PUT /applications/{application_id}/status
```

---

## Get Application Status

```
GET /applications/{application_id}
```

---

# 7. Notification APIs

## Get Notifications

```
GET /notifications
```

---

## Mark Notification Read

```
PUT /notifications/{notification_id}/read
```

---

# 8. Admin APIs

## Get All Students

```
GET /admin/students
```

---

## Get All Employers

```
GET /admin/employers
```

---

## Approve Employer

```
PUT /admin/employers/{employer_id}/approve
```

---

## Remove Employer

```
DELETE /admin/employers/{employer_id}
```

---

## Placement Statistics

```
GET /admin/statistics
```

---

# 9. Analytics APIs

## Student Analytics

```
GET /students/analytics
```

---

# 10. Security & Validation Rules

* All APIs require JWT authentication
* Role-based access control enforced
* Input validation must be handled at backend layer
* Never rely only on database constraints for validation

---

# API Roles Summary

| Role     | Access                               |
| -------- | ------------------------------------ |
| Student  | Profile, Resume, Jobs, Applications  |
| Employer | Jobs, Applicants, Recruitment Rounds |
| Admin    | Employer approval, System monitoring |
