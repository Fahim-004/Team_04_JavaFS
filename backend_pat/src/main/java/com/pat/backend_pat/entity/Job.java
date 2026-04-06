package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "jobs")
@Data
@NoArgsConstructor
public class Job {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "job_id")
    private Integer jobId;

    @ManyToOne
    @JoinColumn(name = "employer_id", nullable = false)
    private Employer employer;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Column(name = "job_description", columnDefinition = "TEXT")
    private String jobDescription;

    @Column(name = "salary_package", nullable = false)
    private String salaryPackage;

    @Column(name = "job_location")
    private String jobLocation;

    @Column(name = "min_cgpa", precision = 3, scale = 2)
    private BigDecimal minCgpa;

    @Column(name = "eligible_branches", columnDefinition = "TEXT")
    private String eligibleBranches;

    @Column(name = "max_backlogs")
    private Integer maxBacklogs;

    @Column(name = "passing_year")
    private Integer passingYear;

    @Column(name = "application_deadline", nullable = false)
    private LocalDate applicationDeadline;

    @Column(name = "placement_drive_date", nullable = false)
    private LocalDate placementDriveDate;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}