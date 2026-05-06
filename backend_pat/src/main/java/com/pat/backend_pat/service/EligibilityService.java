package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.Student;
import org.springframework.stereotype.Service;

@Service
public class EligibilityService {

    public void checkEligibility(Student student, Job job) {
        if (job.getMinCgpa() != null && student.getCgpa() != null) {
            if (student.getCgpa().compareTo(job.getMinCgpa()) < 0) {
                throw new IllegalArgumentException(
                    "Not eligible: Your CGPA " + student.getCgpa() +
                    " is below the required " + job.getMinCgpa()
                );
            }
        }

        if (job.getMaxBacklogs() != null && student.getBacklogCount() != null) {
            if (student.getBacklogCount() > job.getMaxBacklogs()) {
                throw new IllegalArgumentException(
                    "Not eligible: You have " + student.getBacklogCount() +
                    " backlogs. Maximum allowed is " + job.getMaxBacklogs()
                );
            }
        }

        if (job.getPassingYear() != null && student.getPassingYear() != null) {
            if (!student.getPassingYear().equals(job.getPassingYear())) {
                throw new IllegalArgumentException(
                    "Not eligible: This job is for " + job.getPassingYear() +
                    " graduates only"
                );
            }
        }

        if (job.getEligibleBranches() != null && !job.getEligibleBranches().isBlank()) {
            String[] branches = job.getEligibleBranches().split(",");
            boolean branchFound = false;
            for (String branch : branches) {
                if (branch.trim().equalsIgnoreCase(student.getBranch())) {
                    branchFound = true;
                    break;
                }
            }
            if (!branchFound) {
                throw new IllegalArgumentException(
                    "Not eligible: This job is open to " +
                    job.getEligibleBranches() + " branches only"
                );
            }
        }
    }
}

