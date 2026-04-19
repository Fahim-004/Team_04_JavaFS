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

    	String email = auth.getName();
    	return ResponseEntity.ok(employerService.updateProfileByEmail(email, dto));

    }

    // ================= POST JOB =================
    @PostMapping("/jobs")
    public ResponseEntity<?> postJob(
            Authentication auth,
            @Valid @RequestBody CreateJobDTO dto
    ) {

    	String email = auth.getName();
    	return ResponseEntity.status(201).body(employerService.postJobByEmail(email, dto));
    }

    // ================= GET EMPLOYER JOBS =================
    @GetMapping("/employers/jobs")
    public ResponseEntity<?> getEmployerJobs(Authentication auth) {

    	String email = auth.getName();
    	return ResponseEntity.ok(employerService.getEmployerJobsByEmail(email));
    }
    @GetMapping("/employers/profile")
    public ResponseEntity<?> getProfile(Authentication auth) {
    	String email = auth.getName();
    	return ResponseEntity.ok(employerService.getProfileByEmail(email));

    }
}