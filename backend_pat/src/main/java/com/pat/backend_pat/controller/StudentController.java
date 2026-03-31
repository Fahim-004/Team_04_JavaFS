package com.pat.backend_pat.controller;

import com.pat.backend_pat.dto.StudentProfileDTO;
import com.pat.backend_pat.entity.Resume;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.repository.UserRepository;
import com.pat.backend_pat.service.StudentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.security.core.context.SecurityContextHolder;

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
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        return user.getUserId();
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getProfile() {

        try {

            Integer userId = getCurrentUserId();

            Student student =
                    studentService.getProfile(userId);

            return ResponseEntity.ok(student);

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .status(404)
                    .body(ex.getMessage());
        }
    }

    @PutMapping("/profile")
    public ResponseEntity<?> updateProfile(
            @Valid @RequestBody StudentProfileDTO dto) {

        try {

            Integer userId = getCurrentUserId();

            Student updatedStudent =
                    studentService.updateProfile(userId, dto);

            return ResponseEntity.ok(updatedStudent);

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
    @PostMapping("/resume")
    public ResponseEntity<?> uploadResume(
            @RequestParam String filePath) {

        try {

            Integer userId = getCurrentUserId();

            Resume resume =
                    studentService.uploadResume(userId, filePath);

            return ResponseEntity
                    .status(201)
                    .body(resume);

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
    @GetMapping("/resumes")
    public ResponseEntity<?> getResumes() {

        try {

            Integer userId = getCurrentUserId();

            List<Resume> resumes =
                    studentService.getResumes(userId);

            return ResponseEntity.ok(resumes);

        } catch (RuntimeException ex) {

            return ResponseEntity
                    .badRequest()
                    .body(ex.getMessage());
        }
    }
}