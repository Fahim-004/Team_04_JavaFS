package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "student_academic")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentAcademic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "academic_id")
    private Integer academicId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false, unique = true)
    private Student student;

    private String degree;

    private Double tenth;
    private Double twelfth;

    private Integer semester;

    @Column(columnDefinition = "TEXT")
    private String certifications;
}