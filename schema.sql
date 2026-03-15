CREATE DATABASE IF NOT EXISTS pat_system;

USE pat_system;

CREATE TABLE users (
user_id INT AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) NOT NULL UNIQUE,
password_hash VARCHAR(255) NOT NULL,
role ENUM('student','employer','admin') NOT NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
student_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE,
full_name VARCHAR(255),
phone_number VARCHAR(20),
usn VARCHAR(50),
branch VARCHAR(100),
cgpa DECIMAL(3,2),
backlog_count INT,
passing_year INT,
skills TEXT,
projects TEXT,
linkedin_url VARCHAR(255),
github_url VARCHAR(255),
profile_completed BOOLEAN DEFAULT FALSE,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE employers (
employer_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT UNIQUE,
company_name VARCHAR(255),
company_description TEXT,
approved_status BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE jobs (
job_id INT AUTO_INCREMENT PRIMARY KEY,
employer_id INT,
job_title VARCHAR(255),
job_description TEXT,
salary_package VARCHAR(100),
job_location VARCHAR(100),
min_cgpa DECIMAL(3,2),
eligible_branches TEXT,
max_backlogs INT,
passing_year INT,
application_deadline DATE,
placement_drive_date DATE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (employer_id) REFERENCES employers(employer_id)
);

CREATE TABLE resumes (
resume_id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
resume_file TEXT,
uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
is_default BOOLEAN DEFAULT FALSE,
FOREIGN KEY (student_id) REFERENCES students(student_id)
);

CREATE TABLE applications (
application_id INT AUTO_INCREMENT PRIMARY KEY,
student_id INT,
job_id INT,
resume_id INT,
status ENUM(
'Applied',
'Shortlisted',
'Round1_Cleared',
'Round2_Cleared',
'Selected',
'Rejected'
),
applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (student_id) REFERENCES students(student_id),
FOREIGN KEY (job_id) REFERENCES jobs(job_id),
FOREIGN KEY (resume_id) REFERENCES resumes(resume_id)
);

CREATE TABLE recruitment_rounds (
round_id INT AUTO_INCREMENT PRIMARY KEY,
job_id INT,
round_name VARCHAR(255),
round_order INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (job_id) REFERENCES jobs(job_id)
);

CREATE TABLE round_results (
result_id INT AUTO_INCREMENT PRIMARY KEY,
application_id INT,
round_id INT,
status ENUM('Passed','Failed','Pending'),
updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (application_id) REFERENCES applications(application_id),
FOREIGN KEY (round_id) REFERENCES recruitment_rounds(round_id)
);

CREATE TABLE notifications (
notification_id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
message TEXT,
is_read BOOLEAN DEFAULT FALSE,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE student_analytics (
student_id INT PRIMARY KEY,
applications_count INT DEFAULT 0,
shortlisted_count INT DEFAULT 0,
interviews_given INT DEFAULT 0,
FOREIGN KEY (student_id) REFERENCES students(student_id)
);
