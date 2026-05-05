package com.pat.backend_pat.controller;

import com.pat.backend_pat.dto.JobUpdateDTO;
import com.pat.backend_pat.service.ApplicationService;
import com.pat.backend_pat.service.JobService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class JobController {

        @Autowired
        private JobService jobService;

        @Autowired
        private ApplicationService applicationService;

        // GET all jobs (public)
        @GetMapping("/jobs")
        public ResponseEntity<?> getAllJobs(
                        @RequestParam(required = false) String branch,
                        @RequestParam(required = false) BigDecimal minCgpa) {
                return ResponseEntity.ok(
                                jobService.getAllJobs(branch, minCgpa));
        }

        // GET job by ID
        @GetMapping("/jobs/{jobId}")
        public ResponseEntity<?> getJobById(
                        @PathVariable Integer jobId) {
                return ResponseEntity.ok(
                                jobService.getJobById(jobId));
        }

        // PATCH job by ID (partial update, employer only, ownership enforced)
        @PatchMapping("/jobs/{jobId}")
        public ResponseEntity<?> patchJobById(
                        @PathVariable Integer jobId,
                        @RequestBody JobUpdateDTO dto,
                        Authentication auth) {
                String email = auth.getName();
                return ResponseEntity.ok(jobService.patchJobById(jobId, email, dto));
        }

        // APPLY for job
        @PostMapping("/jobs/{jobId}/apply")
        public ResponseEntity<?> applyForJob(
                        @PathVariable Integer jobId,
                        @RequestBody Map<String, Integer> body,
                        Authentication auth) {

                // Get logged-in email
                String email = auth.getName();

                // Convert email → userId
                Integer userId = applicationService.getUserIdFromEmail(email);

                // Extract resumeId
                Integer resumeId = body.get("resumeId");

                return ResponseEntity.status(201).body(
                                applicationService.applyForJob(
                                                userId,
                                                jobId,
                                                resumeId));
        }

        // GET job applicants
        @GetMapping("/jobs/{jobId}/applicants")
        public ResponseEntity<?> getApplicants(
                        @PathVariable Integer jobId,
                        Authentication auth) {
                String email = auth.getName();
                return ResponseEntity.ok(
                                jobService.getJobApplicants(jobId, email));
        }

        @GetMapping("/jobs/{jobId}/rounds/applicants")
        public ResponseEntity<?> getRoundsApplicants(
                        @PathVariable Integer jobId,
                        Authentication auth) {
                String email = auth.getName();
                return ResponseEntity.ok(
                                jobService.getRoundsManagerApplicants(jobId, email));
        }
}