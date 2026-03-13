# Placement Automation Tool (PAT)
## Database Schema

This document defines the relational database schema for the Placement Automation Tool (PAT).

---

# 1. Users

This table stores authentication information for all system users.

| Field | Type | Description |
|-----|-----|-----|
| user_id | UUID / INT (PK) | Unique identifier for the user |
| email | VARCHAR | User email address |
| password_hash | VARCHAR | Hashed password |
| role | ENUM(student, employer, admin) | User role |
| created_at | TIMESTAMP | Account creation time |

---

# 2. Students

Stores student profile information.

| Field | Type | Description |
|-----|-----|-----|
| student_id | UUID / INT (PK) | Unique student identifier |
| user_id | FK → users.user_id | Linked user account |
| full_name | VARCHAR | Student full name |
| phone_number | VARCHAR | Contact number |
| usn | VARCHAR | University Seat Number |
| branch | VARCHAR | Department / Branch |
| cgpa | DECIMAL | Current CGPA |
| backlog_count | INT | Number of backlogs |
| passing_year | INT | Graduation year |
| skills | TEXT | Skills list |
| projects | TEXT | Projects description |
| linkedin_url | VARCHAR | LinkedIn profile |
| github_url | VARCHAR | GitHub profile |
| profile_completed | BOOLEAN | Profile completion flag |

---

# 3. Employers

Stores company recruiter information.

| Field | Type | Description |
|-----|-----|-----|
| employer_id | UUID / INT (PK) | Unique employer identifier |
| user_id | FK → users.user_id | Linked user account |
| company_name | VARCHAR | Company name |
| company_description | TEXT | Description of company |
| approved_status | BOOLEAN | Approved by admin or not |
| created_at | TIMESTAMP | Registration time |

---

# 4. Jobs

Stores job postings created by employers.

| Field | Type | Description |
|-----|-----|-----|
| job_id | UUID / INT (PK) | Unique job identifier |
| employer_id | FK → employers.employer_id | Company posting job |
| job_title | VARCHAR | Job role title |
| job_description | TEXT | Job details |
| salary_package | VARCHAR | Offered salary |
| job_location | VARCHAR | Job location |
| min_cgpa | DECIMAL | Minimum CGPA requirement |
| eligible_branches | TEXT | Allowed departments |
| max_backlogs | INT | Maximum allowed backlogs |
| passing_year | INT | Required passing year |
| application_deadline | DATE | Last date to apply |
| placement_drive_date | DATE | Placement drive date |
| created_at | TIMESTAMP | Job posting time |

---

# 5. Resumes

Stores student resumes.

| Field | Type | Description |
|-----|-----|-----|
| resume_id | UUID / INT (PK) | Unique resume identifier |
| student_id | FK → students.student_id | Owner of resume |
| resume_file | TEXT / BLOB | Resume file path or data |
| uploaded_at | TIMESTAMP | Upload time |
| is_default | BOOLEAN | Default resume flag |

---

# 6. Applications

Stores job applications submitted by students.

| Field | Type | Description |
|-----|-----|-----|
| application_id | UUID / INT (PK) | Unique application ID |
| student_id | FK → students.student_id | Applicant |
| job_id | FK → jobs.job_id | Job applied for |
| resume_id | FK → resumes.resume_id | Resume used |
| status | ENUM | Application status |
| applied_at | TIMESTAMP | Application time |

### Application Status Values

- Applied
- Shortlisted
- Round1_Cleared
- Round2_Cleared
- Selected
- Rejected

---

# 7. Recruitment Rounds

Defines recruitment stages for a job.

| Field | Type | Description |
|-----|-----|-----|
| round_id | UUID / INT (PK) | Unique round ID |
| job_id | FK → jobs.job_id | Related job |
| round_name | VARCHAR | Name of round |
| round_order | INT | Order of round |
| created_at | TIMESTAMP | Creation time |

Example:

| round_id | job_id | round_name | round_order |
|---|---|---|---|
| 1 | 15 | Aptitude Test | 1 |
| 2 | 15 | Technical Interview | 2 |
| 3 | 15 | HR Interview | 3 |

---

# 8. Round Results

Tracks student performance in each round.

| Field | Type | Description |
|-----|-----|-----|
| result_id | UUID / INT (PK) | Result ID |
| application_id | FK → applications.application_id | Related application |
| round_id | FK → recruitment_rounds.round_id | Round identifier |
| status | ENUM(Passed, Failed, Pending) | Round outcome |
| updated_at | TIMESTAMP | Last update time |

---

# 9. Notifications

Stores system notifications.

| Field | Type | Description |
|-----|-----|-----|
| notification_id | UUID / INT (PK) | Notification ID |
| user_id | FK → users.user_id | Target user |
| message | TEXT | Notification message |
| is_read | BOOLEAN | Read status |
| created_at | TIMESTAMP | Notification time |

---

# 10. Student Analytics (Optional)

Precomputed analytics for student dashboards.

| Field | Type | Description |
|-----|-----|-----|
| student_id | FK → students.student_id | Student |
| applications_count | INT | Total applications |
| shortlisted_count | INT | Total shortlisted |
| interviews_given | INT | Interviews attended |

---

# Entity Relationships (Summary)

- users → students (1:1)
- users → employers (1:1)
- employers → jobs (1:N)
- students → resumes (1:N)
- students → applications (1:N)
- jobs → applications (1:N)
- jobs → recruitment_rounds (1:N)
- applications → round_results (1:N)
- users → notifications (1:N)

---

# Future Tables (Optional Expansion)

Possible future extensions:

- university_integrations
- interview_schedules
- email_notifications
- skill_matching_ai
- multi_college_support
