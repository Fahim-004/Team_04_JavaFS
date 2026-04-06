package com.pat.backend_pat.dto;

import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateJobDTO {

    @NotBlank(message = "Job title is required")
    private String jobTitle;

    @NotBlank(message = "Salary package is required")
    private String salaryPackage;

    @NotNull(message = "Application deadline is required")
    @Future(message = "Application deadline must be a future date")
    private LocalDate applicationDeadline;

    @NotNull(message = "Placement drive date is required")
    private LocalDate placementDriveDate;

    private String jobDescription;
    private String jobLocation;

    @DecimalMin(value = "0.0", message = "CGPA must be at least 0.0")
    @DecimalMax(value = "10.0", message = "CGPA must not exceed 10.0")
    private BigDecimal minCgpa;

    private String eligibleBranches;

    @Min(value = 0, message = "Max backlogs cannot be negative")
    private Integer maxBacklogs;

    private Integer passingYear;
}