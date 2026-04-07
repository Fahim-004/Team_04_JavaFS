package com.pat.backend_pat.controller;

import com.pat.backend_pat.dto.CreateJobDTO;
import com.pat.backend_pat.dto.EmployerProfileDTO;
import com.pat.backend_pat.service.EmployerService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class EmployerController {

    @Autowired
    private EmployerService employerService;

    // ================= CREATE / UPDATE PROFILE =================
    @PostMapping("/employers/profile")
    public ResponseEntity<?> createProfile(
            Authentication auth,
            @Valid @RequestBody EmployerProfileDTO dto
    ) {
        Integer userId = (Integer) auth.getDetails();
        return ResponseEntity.ok(employerService.updateProfile(userId, dto));
    }

    // ================= POST JOB =================
    @PostMapping("/jobs")
    public ResponseEntity<?> postJob(
            Authentication auth,
            @Valid @RequestBody CreateJobDTO dto
    ) {
        Integer userId = (Integer) auth.getDetails();
        return ResponseEntity.status(201).body(employerService.postJob(userId, dto));
    }

    // ================= GET EMPLOYER JOBS =================
    @GetMapping("/employers/jobs")
    public ResponseEntity<?> getEmployerJobs(Authentication auth) {
        Integer userId = (Integer) auth.getDetails();
        return ResponseEntity.ok(employerService.getEmployerJobs(userId));
    }
}