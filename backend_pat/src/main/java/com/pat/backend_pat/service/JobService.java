package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.JobUpdateDTO;
import com.pat.backend_pat.dto.RoundResultViewDTO;
import com.pat.backend_pat.dto.RoundsManagerApplicantDTO;
import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.RoundResult;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.exception.AccessDeniedException;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.RoundResultRepository;
import com.pat.backend_pat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployerRepository employerRepository;

    @Autowired
    private RoundResultRepository roundResultRepository;

    private void validateEmployerJobAccess(String email, Job job) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.employer) {
            throw new AccessDeniedException("Only employers can view applicants");
        }

        Employer employer = employerRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));

        if (job.getEmployer() == null || !employer.getEmployerId().equals(job.getEmployer().getEmployerId())) {
            throw new AccessDeniedException("You are not authorized to access applicants for this job");
        }
    }

    public List<Job> getAllJobs(String branch, BigDecimal minCgpa) {
        if (branch == null && minCgpa == null) {
            return jobRepository.findAll()
                    .stream()
                    .filter(job -> job.getStatus() == Job.JobStatus.OPEN)
                    .collect(Collectors.toList());
        }

        return jobRepository.findJobsWithFilters(branch, minCgpa)
                .stream()
                .filter(job -> job.getStatus() == Job.JobStatus.OPEN)
                .collect(Collectors.toList());
    }

    public Job getJobById(Integer jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (job.getStatus() == Job.JobStatus.DELETED) {
            throw new ResourceNotFoundException("Job not found");
        }

        return job;
    }

    public Job patchJobById(Integer jobId, String email, JobUpdateDTO dto) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.employer) {
            throw new AccessDeniedException("Only employers can update jobs");
        }

        Employer employer = employerRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));

        if (job.getEmployer() == null || job.getEmployer().getEmployerId() == null
                || !job.getEmployer().getEmployerId().equals(employer.getEmployerId())) {
            throw new AccessDeniedException("You are not authorized to update this job");
        }

        if (dto.getJobTitle() != null) {
            job.setJobTitle(dto.getJobTitle());
        }
        if (dto.getJobDescription() != null) {
            job.setJobDescription(dto.getJobDescription());
        }
        if (dto.getSalaryPackage() != null) {
            job.setSalaryPackage(dto.getSalaryPackage());
        }
        if (dto.getJobLocation() != null) {
            job.setJobLocation(dto.getJobLocation());
        }
        if (dto.getMinCgpa() != null) {
            job.setMinCgpa(dto.getMinCgpa());
        }
        if (dto.getEligibleBranches() != null) {
            job.setEligibleBranches(dto.getEligibleBranches());
        }
        if (dto.getMaxBacklogs() != null) {
            job.setMaxBacklogs(dto.getMaxBacklogs());
        }
        if (dto.getPassingYear() != null) {
            job.setPassingYear(dto.getPassingYear());
        }

        return jobRepository.save(job);
    }

    public List<Application> getJobApplicants(Integer jobId, String email) {
        Job job = getJobById(jobId);
        validateEmployerJobAccess(email, job);
        return applicationRepository.findByJob(job);
    }

    public List<RoundsManagerApplicantDTO> getRoundsManagerApplicants(Integer jobId, String email) {
        Job job = getJobById(jobId);
        validateEmployerJobAccess(email, job);

        List<Application> applications = applicationRepository.findByJob(job);

        return applications.stream()
                .map(application -> {
                    List<RoundResultViewDTO> results = roundResultRepository
                            .findByApplicationOrderByRoundRoundOrderAsc(application)
                            .stream()
                            .map(this::toRoundResultView)
                            .collect(Collectors.toList());

                    return new RoundsManagerApplicantDTO(
                            application.getApplicationId(),
                            application.getStudent().getFullName(),
                            application.getStatus(),
                            results);
                })
                .collect(Collectors.toList());
    }

    private RoundResultViewDTO toRoundResultView(RoundResult result) {
        return new RoundResultViewDTO(
                result.getRound().getRoundId(),
                result.getRound().getRoundOrder(),
                result.getRound().getRoundName(),
                result.getStatus().name(),
                result.getUpdatedAt());
    }
}
