package com.pat.backend_pat.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
	// Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "application_id")
    private Integer applicationId;

    // Many Applications → One Student
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Student student;

    // Many Applications → One Job
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Job job;

    // Many Applications → One Resume
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "resume_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Resume resume;

    // Application Status
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private ApplicationStatus status;

    // Timestamp handled by DB
    @Column(name = "applied_at", insertable = false, updatable = false)
    private LocalDateTime appliedAt;

    // ENUM for status
    public enum ApplicationStatus {
        Applied,
        Shortlisted,
        Round1_Cleared,
        Round2_Cleared,
        Selected,
        Rejected
    }
}


