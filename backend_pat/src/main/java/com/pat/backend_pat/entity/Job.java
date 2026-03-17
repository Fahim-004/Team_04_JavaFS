package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
@Table(name = "jobs")
public class Job {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int jobId;
	
	
	@ManyToOne
	@JoinColumn(name = "employer_id", nullable = false)
	private Employer employer;
	
	@Column(nullable = false)
	private String jobTitle;
	
	private String jobDescription;
	
	private String salaryPackage;
	
	private String jobLocation;
	
	private Double minCgpa;
	
	private String eligibleBranches;
	
	private Integer maxBacklogs;
	
	private Integer passingYear;
	
	@Column(nullable = false)
	private LocalDate applicationDeadline;
	
	@Column(nullable = false)
	private LocalDate placementDriveDate;
	
	@Column(nullable = false)
	private LocalDateTime createdAt;
	
	@PrePersist
	protected void onCreate() {
		this.createdAt =  LocalDateTime.now();
	}
	
	

}
