package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employers")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employerId;
    
    @Column(nullable = false, unique = true)
    private Integer userId;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String companyDescription;

    @Column(nullable = false)
    private Boolean approvedStatus = false;

    @Column(nullable = false, insertable = false, updatable = false)
    private LocalDateTime createdAt;
}
