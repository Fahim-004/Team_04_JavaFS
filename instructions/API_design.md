# Placement Automation Tool (PAT)
## REST API Design

This document defines the REST API endpoints for the Placement Automation Tool (PAT).

Base URL example:

```
/api/v1
```

---

# 1. Authentication APIs

## Register User

Creates a new account.

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

### Response

```json
{
  "message": "User registered successfully"
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

## Logout

```
POST /auth/logout
```

---

# 2. Student APIs

## Get Student Profile

```
GET /students/profile
```

### Response

```json
{
  "full_name": "John Doe",
  "phone_number": "9876543210",
  "usn": "1RV21CS001",
  "branch": "CSE",
  "cgpa": 8.5,
  "backlog_count": 0,
  "passing_year": 2026,
  "skills": ["Java", "React"],
  "projects": "Placement portal",
  "linkedin_url": "",
  "github_url": ""
}
```

---

## Update Student Profile

```
PUT /students/profile
```

### Request

```json
{
  "full_name": "John Doe",
  "phone_number": "9876543210",
  "cgpa": 8.7,
  "skills": ["React", "Node"]
}
```

---

## Upload Resume

```
POST /students/resume
```

### Form Data

```
resume_file: file
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
  "resume_id": "123"
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

### Request

```json
{
  "job_title": "Software Engineer",
  "job_description": "Backend development",
  "salary_package": "18 LPA",
  "job_location": "Bangalore",
  "min_cgpa": 7,
  "eligible_branches": ["CSE", "ISE"],
  "max_backlogs": 0,
  "passing_year": 2026,
  "application_deadline": "2026-10-20",
  "placement_drive_date": "2026-10-25"
}
```

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

### Request

```json
{
  "round_name": "Technical Interview",
  "round_order": 2
}
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

### Request

```json
{
  "round_id": "12",
  "status": "Passed"
}
```

---

# 6. Application Management APIs

## Update Application Status

```
PUT /applications/{application_id}/status
```

### Request

```json
{
  "status": "Shortlisted"
}
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

### Example Response

```json
{
  "total_students": 420,
  "total_companies": 35,
  "total_jobs": 18,
  "total_applications": 560
}
```

---

# 9. Analytics APIs

## Student Analytics

```
GET /students/analytics
```

### Response

```json
{
  "applications_count": 8,
  "shortlisted_count": 3,
  "interviews_given": 2
}
```

---

# 10. Security Considerations

- All APIs require **JWT authentication**
- Role-based access control should be implemented
- Passwords must be **hashed before storage**
- Input validation should be applied to all endpoints

---

# API Roles Summary

| Role | Access |
|-----|-----|
| Student | Profile, Resume, Jobs, Applications |
| Employer | Jobs, Applicants, Recruitment Rounds |
| Admin | Employer approval, System monitoring |

---

# Future API Extensions

Possible future additions:

- Email notification APIs
- Interview scheduling APIs
- University data integration
- AI resume analysis endpoints
