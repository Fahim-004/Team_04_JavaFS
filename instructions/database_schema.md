# PAT System – Database Initialization Script

# File: schema.sql

This script recreates the database schema and inserts default data.

Run this file when setting up the project for the first time.

---

# 1. Create Database

```sql
CREATE DATABASE IF NOT EXISTS pat_system;
USE pat_system;
```

---

# 2. Create Roles Table

```sql
CREATE TABLE IF NOT EXISTS roles (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(255) NOT NULL UNIQUE
);
```

---

# 3. Create Users Table

```sql
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
```

---

# 4. Insert Default Roles

```sql
INSERT INTO roles (role_name) VALUES
('ADMIN'),
('HR'),
('STUDENT');
```

---

# 5. Verify Setup

Run these queries to verify the setup:

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

```


```

```


```
