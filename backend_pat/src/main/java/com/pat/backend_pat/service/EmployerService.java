package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.CreateJobDTO;
import com.pat.backend_pat.dto.EmployerProfileDTO;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
<<<<<<< HEAD
import com.pat.backend_pat.exception.ValidationException;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
=======
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.exception.ValidationException;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.UserRepository;
>>>>>>> 81be807547e14ba5cd858be832b8fe958d35de09

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
    private UserRepository userRepository;


    @Autowired
    private JobValidationService jobValidationService;

    public EmployerService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    // ================= EXISTING METHODS =================

    @Transactional
    public Employer getProfile(Integer userId) {
        return employerRepository.findByUserUserId(userId)
        		.orElseThrow(() -> new ValidationException("Employer profile not found"));
    }

    @Transactional
    public Employer updateProfile(Integer userId, EmployerProfileDTO dto) {

    	Employer employer = employerRepository.findByUserUserId(userId)
    		    .orElseGet(() -> {
    		        Employer newEmployer = new Employer();

    		        // Fetch User entity
    		        User user = userRepository.findById(userId)
    		                .orElseThrow(() -> new RuntimeException("User not found"));

    		        newEmployer.setUser(user);
    		        return newEmployer;
    		    });

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

           
        		.orElseThrow(() -> new ValidationException("Employer profile not found"));
        return jobRepository.findByEmployer(employer);
    }
    
    public Employer getProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return getProfile(user.getUserId());
    }
    public Employer updateProfileByEmail(String email, EmployerProfileDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return updateProfile(user.getUserId(), dto);
    }
    public Job postJobByEmail(String email, CreateJobDTO dto) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return postJob(user.getUserId(), dto);
    }
    public List<Job> getEmployerJobsByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return getEmployerJobs(user.getUserId());
    }
}



