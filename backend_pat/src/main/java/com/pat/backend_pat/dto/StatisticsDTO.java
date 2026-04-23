package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatisticsDTO {
    private int totalStudents;
    private int totalEmployers;
    private int totalJobs;
    private int totalApplications;
    private int totalSelected;
}