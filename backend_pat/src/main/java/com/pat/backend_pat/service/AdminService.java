package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.StatisticsDTO;
import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AdminService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private EmployerRepository employerRepository;
    @Autowired private JobRepository jobRepository;
    @Autowired private ApplicationRepository applicationRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<Employer> getAllEmployers() {
        return employerRepository.findAll();
    }

    public Employer approveEmployer(Integer employerId) {
        Employer employer = employerRepository.findById(employerId)
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found with id: " + employerId));
        employer.setApprovedStatus(true);
        return employerRepository.save(employer);
    }

    public void removeEmployer(Integer employerId) {
        Employer employer = employerRepository.findById(employerId)
            .orElseThrow(() -> new ResourceNotFoundException("Employer not found with id: " + employerId));
        employerRepository.delete(employer);
    }

    public StatisticsDTO getStatistics() {
        int totalStudents     = (int) studentRepository.count();
        int totalEmployers    = (int) employerRepository.count();
        int totalJobs         = (int) jobRepository.count();
        int totalApplications = (int) applicationRepository.count();
        int totalSelected     = applicationRepository.countByStatus(Application.ApplicationStatus.Selected);
        return new StatisticsDTO(totalStudents, totalEmployers,
            totalJobs, totalApplications, totalSelected);
    }
}
