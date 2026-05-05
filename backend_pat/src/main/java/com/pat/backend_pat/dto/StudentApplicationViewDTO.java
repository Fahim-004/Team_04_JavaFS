package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentApplicationViewDTO {

    private Integer applicationId;
    private String jobTitle;
    private String companyName;
    private String salaryPackage;
    private String applicationStatus;
    private LocalDateTime appliedAt;
    private String currentRoundName;
    private Integer currentRoundOrder;
    private String currentRoundResult;
    private String jobStatus;
    private String jobAvailabilityLabel;
    private LocalDateTime lastUpdatedAt;
}
