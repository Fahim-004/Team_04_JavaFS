package com.pat.backend_pat.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "recruitment_rounds")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruitmentRound {
	 // Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "round_id")
    private Integer roundId;

    // Many Rounds → One Job
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "job_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Job job;

    // Round Name
    @Column(name = "round_name")
    private String roundName;

    // Round Order
    @Column(name = "round_order")
    private Integer roundOrder;

    // Timestamp handled by DB
    @Column(name = "created_at", insertable = false, updatable = false)
    private LocalDateTime createdAt;
}


