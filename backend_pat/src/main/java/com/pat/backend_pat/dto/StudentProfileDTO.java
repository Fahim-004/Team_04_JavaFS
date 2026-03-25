package com.pat.backend_pat.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentProfileDTO {

    @NotBlank(message = "Full name is required")
    private String fullName;

    private String phoneNumber;

    @NotBlank(message = "USN is required")
    private String usn;

    @NotBlank(message = "Branch is required")
    private String branch;

    @DecimalMin(value = "0.0", message = "CGPA must be at least 0.0")
    @DecimalMax(value = "10.0", message = "CGPA must not exceed 10.0")
    private BigDecimal cgpa;

    @Min(value = 0, message = "Backlog count cannot be negative")
    private Integer backlogCount;

    private Integer passingYear;
    private String skills;
    private String projects;
    private String linkedinUrl;
    private String githubUrl;
}