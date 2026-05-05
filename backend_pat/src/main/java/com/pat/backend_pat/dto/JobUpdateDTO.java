package com.pat.backend_pat.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobUpdateDTO {
    private String jobTitle;
    private String jobDescription;
    private String salaryPackage;
    private String jobLocation;

    private BigDecimal minCgpa;
    private String eligibleBranches;
    private Integer maxBacklogs;
    private Integer passingYear;
}
