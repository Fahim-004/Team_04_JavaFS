# PAT System – Database Setup Guide

This guide explains how to create the entire Placement Automation Tool (PAT) database using the `schema.sql` file.

The goal is to allow every developer to recreate the **exact same database structure** in one step.

---

# 1. Prerequisites

Before starting, install:

* MySQL Server
* MySQL Workbench

Download links:

* https://dev.mysql.com/downloads/mysql/
* https://dev.mysql.com/downloads/workbench/

Verify MySQL installation:

```bash
mysql --version
```

If installed correctly, the terminal will display the MySQL version.

---

# 2. Start MySQL Server

Start the MySQL service and open **MySQL Workbench**.

Connect to your local database server.

Example connection:

```
Local instance MySQL80
```

Enter your MySQL root password if prompted.

---

# 3. Get the Project Repository

Clone the PAT project repository from GitHub.

Example:

```bash
git clone <repository-url>
```

Navigate into the project directory.

Example structure:

```
PAT/
│
├── backend
├── frontend
├── docs
└── schema.sql
```

The `schema.sql` file contains the full database schema.

---

# 4. Open the Schema in MySQL Workbench

1. Open **MySQL Workbench**
2. Connect to your MySQL server
3. **Run this command first before proceeeding ahead** : DROP database pat_system;
4. Click:

```
File → Open SQL Script
```

4. Select the file:

```
schema.sql
```

The SQL file will open in the Workbench editor.

---

# 5. Execute the Schema Script

Run the entire script.

You can do this in two ways.

### Method 1 — Using the Execute Button

Click the **Lightning Bolt (⚡)** button in the toolbar.

This runs all queries in the file.

---

### Method 2 — Keyboard Shortcut

Execute all statements using:

Mac:

```
Command + Shift + Enter
```

Windows:

```
Ctrl + Shift + Enter
```

---

# 6. Refresh the Database

After execution:

1. Go to the **SCHEMAS panel** on the left.
2. Click the **Refresh icon**.

You should now see the database:

```
pat_system
```

---

# 7. Verify Tables

Expand the database:

```
pat_system
```

You should see the following tables:

```
users
students
employers
jobs
resumes
applications
recruitment_rounds
round_results
notifications
student_analytics
```

If these tables appear, the database has been successfully created.

---

# 8. Quick Verification Queries

Run the following queries to confirm the schema.

```sql
USE pat_system;

SHOW TABLES;

DESCRIBE users;
DESCRIBE students;
DESCRIBE jobs;
```

If the tables appear and columns match the design, the database setup is complete.

---

# 9. Important Team Rule

Every developer must create the database using **schema.sql**.

Do not manually create or modify tables inside MySQL Workbench.

All schema changes must be updated in:

```
schema.sql
```

This ensures every developer uses the same database structure.

---

# 10. Next Step

After the database is created, backend development continues with:

* Spring Boot entity models
* Repository layer
* Service layer
* Authentication system
* REST API implementation
