package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.*;

@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private Integer studentId;

    // One-to-One relationship with User
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    // Required fields
    @Column(name = "full_name")
    private String fullName;

    @Column(name = "usn")
    private String usn;

    @Column(name = "branch")
    private String branch;

    @Column(name = "passing_year")
    private Integer passingYear;

    // Optional fields
    @Column(name = "phone_number")
    private String phoneNumber;

    private BigDecimal cgpa;

    @Column(name = "backlog_count")
    private Integer backlogCount;

    @Column(columnDefinition = "TEXT")
    private String skills;

    @Column(columnDefinition = "TEXT")
    private String projects;

    @Column(name = "linkedin_url")
    private String linkedinUrl;

    @Column(name = "github_url")
    private String githubUrl;

    // Boolean field (fixed)
    @Column(name = "profile_completed", nullable = false)
    private Boolean profileCompleted = false;
}