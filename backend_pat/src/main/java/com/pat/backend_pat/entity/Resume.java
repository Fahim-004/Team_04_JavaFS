package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Resume {

    // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resume_id")
    private Integer resumeId;

    // Many resumes → one student
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "student_id", nullable = false)
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Student student;

    // Resume file (TEXT in DB)
    @Column(name = "resume_file", columnDefinition = "TEXT")
    private String resumeFile;

    // Auto-handled by DB (CURRENT_TIMESTAMP)
    @Column(name = "uploaded_at", insertable = false, updatable = false)
    private LocalDateTime uploadedAt;

    // Boolean field (TINYINT in MySQL)
    @Column(name = "is_default", nullable = false)
    private Boolean isDefault = false;
}