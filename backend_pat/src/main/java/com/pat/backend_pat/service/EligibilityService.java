package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.Student;
import org.springframework.stereotype.Service;

@Service
public class EligibilityService {

    public void checkEligibility(Student student, Job job) {

        // Check CGPA only if the job sets a minimum
        if (job.getMinCgpa() != null && student.getCgpa() != null) {
            if (student.getCgpa().compareTo(job.getMinCgpa()) < 0) {
                throw new RuntimeException(
                    "Not eligible: Your CGPA " + student.getCgpa() +
                    " is below the required " + job.getMinCgpa()
                );
            }
        }

        // Check backlogs only if the job sets a maximum
        if (job.getMaxBacklogs() != null && student.getBacklogCount() != null) {
            if (student.getBacklogCount() > job.getMaxBacklogs()) {
                throw new RuntimeException(
                    "Not eligible: You have " + student.getBacklogCount() +
                    " backlogs. Maximum allowed is " + job.getMaxBacklogs()
                );
            }
        }

        // Check passing year only if the job specifies one
        if (job.getPassingYear() != null && student.getPassingYear() != null) {
            if (!student.getPassingYear().equals(job.getPassingYear())) {
                throw new RuntimeException(
                    "Not eligible: This job is for " + job.getPassingYear() +
                    " graduates only"
                );
            }
        }

        // Check branch only if the job specifies eligible branches
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
                throw new RuntimeException(
                    "Not eligible: This job is open to " +
                    job.getEligibleBranches() + " branches only"
                );
            }
        }
    }
}