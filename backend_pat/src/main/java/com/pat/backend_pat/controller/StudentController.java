package com.pat.backend_pat.controller;

import com.pat.backend_pat.dto.StudentAcademicDTO;
import com.pat.backend_pat.dto.StudentDashboardStatsDTO;
import com.pat.backend_pat.dto.StudentProfileDTO;
import com.pat.backend_pat.entity.Resume;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.entity.StudentAcademic;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.repository.UserRepository;
import com.pat.backend_pat.service.StudentService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final UserRepository userRepository;

    private Integer getCurrentUserId() {
        String email = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getName();

        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        return user.getUserId();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {
        Integer userId = getCurrentUserId();
        Student student = studentService.getProfile(userId);
        return ResponseEntity.ok(student);
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @Valid @RequestBody StudentProfileDTO dto) {
        Integer userId = getCurrentUserId();
        Student updatedStudent = studentService.updateProfile(userId, dto);
        return ResponseEntity.ok(updatedStudent);
    }

    @PutMapping("/academic")
    public ResponseEntity<?> updateAcademic(
            @Valid @RequestBody StudentAcademicDTO dto) {
        Integer userId = getCurrentUserId();
        StudentAcademic updatedAcademic = studentService.updateAcademic(userId, dto);
        return ResponseEntity.ok(updatedAcademic);
    }

    @GetMapping("/academic")
    public ResponseEntity<?> getAcademic() {
        Integer userId = getCurrentUserId();
        StudentAcademic academic = studentService.getAcademic(userId);
        return ResponseEntity.ok(academic);
    }

    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(
            @RequestParam String filePath) {
        Integer userId = getCurrentUserId();
        Resume resume = studentService.uploadResume(userId, filePath);
        return ResponseEntity.status(201).body(resume);
    }

    @GetMapping("/resumes")
    public ResponseEntity<?> getResumes() {
        Integer userId = getCurrentUserId();
        List<Resume> resumes = studentService.getResumes(userId);
        return ResponseEntity.ok(resumes);
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        Integer userId = getCurrentUserId();
        StudentDashboardStatsDTO stats = studentService.getDashboardStats(userId);
        return ResponseEntity.ok(stats);
    }
}
