# Database Fix – Foreign Key Type Mismatch

## Problem

When starting the Spring Boot backend, Hibernate produced the following error:

```
Referencing column 'role_id' and referenced column 'id' in foreign key constraint 'users_ibfk_1' are incompatible
```

This happened because the **foreign key column type did not match the referenced primary key type**.

### Current Schema (Before Fix)

**roles table**

| column    | type    |
| --------- | ------- |
| id        | INT     |
| role_name | VARCHAR |

**users table**

| column  | type   |
| ------- | ------ |
| id      | BIGINT |
| role_id | INT    |

### Entity Definition

The entity used the following field:

```java
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

In JPA/Hibernate:

```
Long → BIGINT
```

Therefore the database should use **BIGINT** for all related keys.

---

# Root Cause

MySQL requires **foreign key columns and referenced columns to have identical data types**.

The mismatch was:

```
roles.id      → INT
users.role_id → INT
users.id      → BIGINT
```

Hibernate attempted to convert `roles.id` to `BIGINT`, but MySQL blocked the change because the foreign key already existed.

---

# Solution

We updated the database schema so that both sides of the foreign key use **BIGINT**.

The fix requires three steps.

---

# Step 1 — Drop the Foreign Key Constraint

```
ALTER TABLE users DROP FOREIGN KEY users_ibfk_1;
```

This removes the constraint so column types can be modified.

---

# Step 2 — Update Column Types

Convert both columns to **BIGINT**.

```
ALTER TABLE roles MODIFY id BIGINT AUTO_INCREMENT;

ALTER TABLE users MODIFY role_id BIGINT;
```

---

# Step 3 — Recreate the Foreign Key

```
ALTER TABLE users
ADD CONSTRAINT users_ibfk_1
FOREIGN KEY (role_id)
REFERENCES roles(id);
```

---

# Final Schema

### roles

| column    | type    |
| --------- | ------- |
| id        | BIGINT  |
| role_name | VARCHAR |

### users

| column     | type      |
| ---------- | --------- |
| id         | BIGINT    |
| name       | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role_id    | BIGINT    |
| created_at | TIMESTAMP |

---

# Verification

Run the following queries to verify the schema:

```
DESCRIBE roles;
DESCRIBE users;
```

Expected result:

```
roles.id      → BIGINT
users.role_id → BIGINT
```

After this change, the Spring Boot application should start without the foreign key compatibility error.

---

# Development Note

During development, enable automatic schema updates by adding the following property:

```
spring.jpa.hibernate.ddl-auto=update
```

This allows Hibernate to automatically align database tables with entity definitions.
