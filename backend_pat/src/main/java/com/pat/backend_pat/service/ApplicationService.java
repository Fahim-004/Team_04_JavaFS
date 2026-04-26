package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.*;
import com.pat.backend_pat.entity.Application.ApplicationStatus;
import com.pat.backend_pat.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired private StudentRepository studentRepository;
    @Autowired private JobRepository jobRepository;
    @Autowired private ResumeRepository resumeRepository;
    @Autowired private ApplicationRepository applicationRepository;
    @Autowired private EligibilityService eligibilityService;
    @Autowired private NotificationService notificationService;
    @Autowired private UserRepository userRepository;

    public Application applyForJob(Integer userId, Integer jobId, Integer resumeId) {

        Student student = studentRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

        Resume resume = resumeRepository.findById(resumeId)
            .orElseThrow(() -> new RuntimeException("Resume not found"));

        if (!resume.getStudent().getStudentId().equals(student.getStudentId())) {
            throw new RuntimeException("Resume does not belong to this student");
        }

        applicationRepository.findByStudentAndJob(student, job).ifPresent(a -> {
            throw new RuntimeException("Already applied");
        });

        eligibilityService.checkEligibility(student, job);

        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setResume(resume);

        // ✅ ENUM FIX
        application.setStatus(ApplicationStatus.APPLIED);

        Application saved = applicationRepository.save(application);

        notificationService.createNotification(
            userId,
            "Application submitted successfully"
        );

        return saved;
    }

    public List<Application> getStudentApplications(Integer userId) {
        Student student = studentRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        return applicationRepository.findByStudent(student);
    }

    public Integer getUserIdFromEmail(String email) {
        User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getUserId();
    }
}