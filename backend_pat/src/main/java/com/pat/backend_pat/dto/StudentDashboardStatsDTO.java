package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentDashboardStatsDTO {
    private int availableDrives;
    private int myApplications;
    private int upcomingInterviews;
}
