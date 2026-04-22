package com.pat.backend_pat.controller;

import com.pat.backend_pat.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/students")
    public ResponseEntity<?> getAllStudents() {
        return ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/employers")
    public ResponseEntity<?> getAllEmployers() {
        return ResponseEntity.ok(adminService.getAllEmployers());
    }

    @PutMapping("/employers/{employerId}/approve")
    public ResponseEntity<?> approveEmployer(@PathVariable Integer employerId) {
        return ResponseEntity.ok(adminService.approveEmployer(employerId));
    }

    @DeleteMapping("/employers/{employerId}")
    public ResponseEntity<?> removeEmployer(@PathVariable Integer employerId) {
        adminService.removeEmployer(employerId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/statistics")
    public ResponseEntity<?> getStatistics() {
        return ResponseEntity.ok(adminService.getStatistics());
    }
}