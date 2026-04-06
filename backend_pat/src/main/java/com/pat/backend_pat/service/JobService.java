package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.JobRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    
    public List<Job> getAllJobs(String branch, BigDecimal minCgpa) {

        
        if (branch == null && minCgpa == null) {
            return jobRepository.findAll();
        }

       
        return jobRepository.findJobsWithFilters(branch, minCgpa);
    }

    public Job getJobById(Integer jobId) {

        return jobRepository.findById(jobId).orElseThrow(() ->
                        new RuntimeException("Job not found with id: " + jobId)
                );
    }

    public List<Application> getJobApplicants(Integer jobId) {

        // Reuse method
        Job job = getJobById(jobId);

        return applicationRepository.findByJob(job);
    }
}