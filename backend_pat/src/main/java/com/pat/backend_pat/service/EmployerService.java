package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.CreateJobDTO;
import com.pat.backend_pat.dto.EmployerProfileDTO;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.exception.AccessDeniedException;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.exception.ValidationException;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployerService {

    private final EmployerRepository employerRepository;
    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final JobValidationService jobValidationService;

    public EmployerService(
            EmployerRepository employerRepository,
            JobRepository jobRepository,
            UserRepository userRepository,
            JobValidationService jobValidationService) {
        this.employerRepository = employerRepository;
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.jobValidationService = jobValidationService;
    }

    private User validateEmployerUser(Integer userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.employer) {
            throw new AccessDeniedException("Only employer accounts can access this resource");
        }

        return user;
    }

    private Employer getEmployerOwnedBy(Integer userId) {
        return employerRepository.findByUserUserId(userId)
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));
    }

    private Job getOwnedJob(Integer userId, Integer jobId) {
        Employer employer = getEmployerOwnedBy(userId);

        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (job.getEmployer() == null || !job.getEmployer().getEmployerId().equals(employer.getEmployerId())) {
            throw new AccessDeniedException("You are not authorized to manage this job");
        }

        return job;
    }

    @Transactional
    public Employer getProfile(Integer userId) {
        validateEmployerUser(userId);
        return getEmployerOwnedBy(userId);
    }

    @Transactional
    public Employer updateProfile(Integer userId, EmployerProfileDTO dto) {
        User user = validateEmployerUser(userId);

        Employer employer = employerRepository.findByUserUserId(userId)
                .orElseGet(() -> {
                    Employer newEmployer = new Employer();
                    newEmployer.setUser(user);
                    return newEmployer;
                });

        employer.setCompanyName(dto.getCompanyName());
        employer.setCompanyDescription(dto.getCompanyDescription());

        return employerRepository.save(employer);
    }

    @Transactional
    public Job postJob(Integer userId, CreateJobDTO dto) {
        validateEmployerUser(userId);

        Employer employer = getEmployerOwnedBy(userId);

        if (!employer.getApprovedStatus()) {
            throw new ValidationException("Your employer account is pending admin approval. You cannot post jobs until approved.");
        }

        jobValidationService.validateDates(dto.getApplicationDeadline(), dto.getPlacementDriveDate());

        Job job = new Job();
        job.setEmployer(employer);
        job.setStatus(Job.JobStatus.OPEN);
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

    @Transactional
    public Job updateJob(Integer userId, Integer jobId, CreateJobDTO dto) {
        validateEmployerUser(userId);

        Job job = getOwnedJob(userId, jobId);

        if (job.getStatus() == Job.JobStatus.DELETED) {
            throw new ValidationException("Deleted jobs cannot be edited");
        }

        jobValidationService.validateDates(dto.getApplicationDeadline(), dto.getPlacementDriveDate());

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

    @Transactional
    public Job stopJobIntake(Integer userId, Integer jobId) {
        validateEmployerUser(userId);

        Job job = getOwnedJob(userId, jobId);

        if (job.getStatus() == Job.JobStatus.DELETED) {
            throw new ValidationException("Deleted jobs cannot be modified");
        }

        job.setStatus(Job.JobStatus.CLOSED);
        return jobRepository.save(job);
    }

    @Transactional
    public void deleteJob(Integer userId, Integer jobId) {
        validateEmployerUser(userId);

        Job job = getOwnedJob(userId, jobId);
        job.setStatus(Job.JobStatus.DELETED);
        jobRepository.save(job);
    }

    public List<Job> getEmployerJobs(Integer userId) {
        validateEmployerUser(userId);

        Employer employer = getEmployerOwnedBy(userId);
        return jobRepository.findByEmployer(employer)
                .stream()
                .filter(job -> job.getStatus() != Job.JobStatus.DELETED)
                .collect(Collectors.toList());
    }

    public Employer getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return getProfile(user.getUserId());
    }

    public Employer updateProfileByEmail(String email, EmployerProfileDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return updateProfile(user.getUserId(), dto);
    }

    public Job postJobByEmail(String email, CreateJobDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return postJob(user.getUserId(), dto);
    }

    public Job updateJobByEmail(String email, Integer jobId, CreateJobDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return updateJob(user.getUserId(), jobId, dto);
    }

    public Job stopJobIntakeByEmail(String email, Integer jobId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return stopJobIntake(user.getUserId(), jobId);
    }

    public void deleteJobByEmail(String email, Integer jobId) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        deleteJob(user.getUserId(), jobId);
    }

    public List<Job> getEmployerJobsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
        return getEmployerJobs(user.getUserId());
    }
}
