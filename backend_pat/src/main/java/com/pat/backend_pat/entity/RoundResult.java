package com.pat.backend_pat.entity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "round_results")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundResult {
	// Primary Key
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "result_id")
    private Integer resultId;

    // Many Results → One Application
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private Application application;

    // Many Results → One RecruitmentRound
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "round_id")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private RecruitmentRound round;

    // Round Status
    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private RoundStatus status;

    // Timestamp handled by DB
    @Column(name = "updated_at", insertable = false, updatable = false)
    private LocalDateTime updatedAt;

    // ENUM
    public enum RoundStatus {
        Passed,
        Failed,
        Pending
    }
}


