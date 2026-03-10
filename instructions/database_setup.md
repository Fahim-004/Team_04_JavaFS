# Placement Automation Tool (PAT)

## Database Setup Guide (MySQL)

This document explains how to create the **initial database schema** for the Placement Automation Tool (PAT).
The goal of this phase is to create the **minimum database required for user authentication and login functionality**.

---

# 1. Install MySQL

Install **MySQL Server** and **MySQL Workbench**.

Download links:

* https://dev.mysql.com/downloads/mysql/
* https://dev.mysql.com/downloads/workbench/

Verify installation:

```sql
mysql --version
```

---

# 2. Start MySQL Server

Start the MySQL server and open:

* MySQL Workbench
  or
* MySQL Terminal

Login to MySQL:

```sql
mysql -u root -p
```

Enter your MySQL password.

---

# 3. Create the Project Database

Create the database for the project.

```sql
CREATE DATABASE pat_system;
```

Verify the database was created.

```sql
SHOW DATABASES;
```

Select the database.

```sql
USE pat_system;
```

---

# 4. Create Roles Table

This table stores the different roles available in the system.

```sql
CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(50) NOT NULL UNIQUE
);
```

---

# 5. Create Users Table

This table stores all user accounts.

```sql
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (role_id) REFERENCES roles(id)
);
```

---

# 6. Insert Default Roles

Insert the predefined system roles.

```sql
INSERT INTO roles (role_name) VALUES ('STUDENT');
INSERT INTO roles (role_name) VALUES ('COORDINATOR');
INSERT INTO roles (role_name) VALUES ('TPO');
INSERT INTO roles (role_name) VALUES ('ADMIN');
INSERT INTO roles (role_name) VALUES ('HR');
```

Verify inserted roles.

```sql
SELECT * FROM roles;
```

---

# 7. Verify Tables

Check that both tables were created successfully.

```sql
SHOW TABLES;
```

Expected output:

```
roles
users
```

Check table structure.

```sql
DESCRIBE roles;
DESCRIBE users;
```

---

# 8. Test User Insert (Optional)

Insert a test user.

```sql
INSERT INTO users (name, email, password, role_id)
VALUES ('Test User', 'test@example.com', 'testpassword', 1);
```

Verify data.

```sql
SELECT * FROM users;
```

---

# 9. Database Relationship

The database currently has the following relationship:

```
roles (1) -------- (many) users
```

Meaning:

* One role can belong to multiple users
* Each user has one role

---

# 10. Expected Database Structure

Database: `pat_system`

Tables:

```
roles
users
```

---

# 11. Important Notes

* Every team member must use the **same database schema**.
* Do not modify table structures without informing the team.
* Future modules (student profiles, recruitment drives, analytics) will add additional tables.

---

# 12. Next Step

After the database is successfully created, the next task is:

```
Backend Authentication System
- User Registration API
- Login API
- JWT Authentication
```
