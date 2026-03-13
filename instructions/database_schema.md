# Placement Automation Tool (PAT)

# Database Setup & Initialization Guide

This document explains how to:

1. Install MySQL
2. Start the MySQL server
3. Run the PAT database initialization script
4. Verify the database setup

The goal is to ensure **every developer on the team has the exact same database schema**.

---

# 1. Install MySQL

Install the following:

• **MySQL Server**
• **MySQL Workbench**

Download links:

https://dev.mysql.com/downloads/mysql/
https://dev.mysql.com/downloads/workbench/

After installation, verify MySQL is installed correctly.

```sql
mysql --version
```

If installed correctly, the terminal will display the MySQL version.

---

# 2. Start MySQL Server

Start the MySQL server.

Open either:

• **MySQL Workbench**
or
• **MySQL Terminal**

Login to MySQL:

```sql
mysql -u root -p
```

Enter your MySQL password.

---

# 3. Project Database Initialization

Instead of manually creating tables, the PAT project uses a **single initialization script**.

This ensures that every developer has the **same database structure and default data**.

Create a file called:

```
schema.sql
```

This file will contain the entire database setup.

---

# 4. Database Initialization Script (schema.sql)

Paste the following into `schema.sql`.

```sql
CREATE DATABASE IF NOT EXISTS pat_system;

USE pat_system;

CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_ibfk_1
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
);

INSERT INTO roles (role_name) VALUES
('ADMIN'),
('HR'),
('STUDENT');
```

---

# 5. Run the Initialization Script

You can run the script in two ways.

### Option 1 — From Terminal

```sql
mysql -u root -p < schema.sql
```

---

### Option 2 — Inside MySQL

Login to MySQL first:

```sql
mysql -u root -p
```

Then run:

```sql
SOURCE schema.sql;
```

---

# 6. Verify Database Setup

Run the following queries.

```sql
SHOW TABLES;

DESCRIBE roles;

DESCRIBE users;

SELECT * FROM roles;
```

Expected roles:

| id | role_name |
| -- | --------- |
| 1  | ADMIN     |
| 2  | HR        |
| 3  | STUDENT   |

Expected tables:

```
roles
users
```

---

# 7. Database Relationship

Current relationship:

```
roles (1) -------- (many) users
```

Meaning:

• One role can belong to multiple users
• Each user has exactly one role

---

# 8. Team Rules

To prevent database issues across the team:

1. Every developer must use **the schema.sql file**.
2. Do not manually change table structures in MySQL Workbench.
3. Any schema changes must be updated inside **schema.sql**.

Following these rules prevents database inconsistencies across environments.
