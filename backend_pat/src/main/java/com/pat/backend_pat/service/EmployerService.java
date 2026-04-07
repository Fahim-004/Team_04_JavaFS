package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.CreateJobDTO;
import com.pat.backend_pat.dto.EmployerProfileDTO;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.exception.ValidationException;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployerService {

    private EmployerRepository employerRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private JobValidationService jobValidationService;

    public EmployerService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    // ================= EXISTING METHODS =================

    @Transactional
    public Employer getProfile(Integer userId) {
        return employerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));
    }

    @Transactional
    public Employer updateProfile(Integer userId, EmployerProfileDTO dto) {

        Employer employer = employerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employer profile not found"));

        employer.setCompanyName(dto.getCompanyName());
        employer.setCompanyDescription(dto.getCompanyDescription());

        return employerRepository.save(employer);
    }

    // ================= NEW METHOD 1 =================

    public Job postJob(Integer userId, CreateJobDTO dto) {

        Employer employer = employerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        // Check approval
        if (!employer.getApprovedStatus()) {
            throw new ValidationException(
                    "Your employer account is pending admin approval. You cannot post jobs until approved."
            );
        }

        // Validate dates
        jobValidationService.validateDates(
                dto.getApplicationDeadline(),
                dto.getPlacementDriveDate()
        );

        // Create Job
        Job job = new Job();
        job.setEmployer(employer);
        job.setJobTitle(dto.getJobTitle());
        job.setJobDescription(dto.getJobDescription());
        job.setSalaryPackage(dto.getSalaryPackage());
        job.setJobLocation(dto.getJobLocation());
        job.setMinCgpa(dto.getMinCgpa());
        job.setEligibleBranches(dto.getEligibleBranches());
        job.setMaxBacklogs(dto.getMaxBacklogs());
        job.setPassingYear(dto.getPassingYear());
        job.setApplicationDeadline(dto.getApplicationDeadline());
        job.setPlacementDriveDate(dto.getPlacementDriveDate());

        return jobRepository.save(job);
    }

    // ================= NEW METHOD 2 =================

    public List<Job> getEmployerJobs(Integer userId) {

        Employer employer = employerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Employer not found"));

        return jobRepository.findByEmployer(employer);
    }
}
