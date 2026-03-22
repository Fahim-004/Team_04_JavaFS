package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_analytics")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAnalytics {

    // Primary key (same as student_id)
    @Id
    @Column(name = "student_id")
    private Long studentId;

    // One-to-One mapping with Student
    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "student_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Student student;

    // Fields
    @Column(name = "applications_count")
    private Integer applicationsCount = 0;

    @Column(name = "shortlisted_count")
    private Integer shortlistedCount = 0;

    @Column(name = "interviews_given")
    private Integer interviewsGiven = 0;
}