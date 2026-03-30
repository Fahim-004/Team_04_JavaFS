package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.EmployerProfileDTO;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.repository.EmployerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class EmployerService {

    private EmployerRepository employerRepository;

    public EmployerService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

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
}