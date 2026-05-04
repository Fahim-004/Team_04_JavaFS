package com.pat.backend_pat.controller;

import com.pat.backend_pat.service.ApplicationService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class StudentApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @GetMapping("/students/applications")
    public ResponseEntity<?> getMyApplications(
            Authentication auth) {

        String email = auth.getName();
        Integer userId = applicationService.getUserIdFromEmail(email);

        return ResponseEntity.ok(
                applicationService.getStudentApplications(userId));
    }
}