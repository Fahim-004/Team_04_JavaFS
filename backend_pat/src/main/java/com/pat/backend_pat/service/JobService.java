package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.RoundResultViewDTO;
import com.pat.backend_pat.dto.RoundsManagerApplicantDTO;
import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.RoundResult;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.RoundResultRepository;
import com.pat.backend_pat.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));

        if (user.getRole() != User.Role.employer) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "Only employers can view applicants");
        }

        Employer employer = employerRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.FORBIDDEN,
                        "Employer profile not found"));

        if (!employer.getEmployerId().equals(job.getEmployer().getEmployerId())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN,
                    "You are not authorized to access applicants for this job");
        }
    }

    public List<Job> getAllJobs(String branch, BigDecimal minCgpa) {

        if (branch == null && minCgpa == null) {
            return jobRepository.findAll();
        }

        return jobRepository.findJobsWithFilters(branch, minCgpa);
    }

    public Job getJobById(Integer jobId) {

        return jobRepository.findById(jobId).orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));
    }

    public List<Application> getJobApplicants(Integer jobId, String email) {

        // Reuse method
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
                            .map(result -> new RoundResultViewDTO(
                                    result.getRound().getRoundId(),
                                    result.getRound().getRoundOrder(),
                                    result.getRound().getRoundName(),
                                    result.getStatus().name(),
                                    result.getUpdatedAt()))
                            .collect(Collectors.toList());

                    return new RoundsManagerApplicantDTO(
                            application.getApplicationId(),
                            application.getStudent().getFullName(),
                            application.getStatus(),
                            results);
                })
                .collect(Collectors.toList());
    }
}