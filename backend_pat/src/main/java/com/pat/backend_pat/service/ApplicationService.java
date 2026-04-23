package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.*;
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
    public Application applyForJob(Integer userId, Integer jobId, Integer resumeId) {

        Student student = studentRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found with id: " + jobId));

        Resume resume = resumeRepository.findById(resumeId)
            .orElseThrow(() -> new RuntimeException("Resume not found"));

        // Resume must belong to this student
        if (!resume.getStudent().getStudentId().equals(student.getStudentId())) {
            throw new RuntimeException("Resume does not belong to this student");
        }

        // Check if already applied
        applicationRepository.findByStudentAndJob(student, job).ifPresent(a -> {
            throw new RuntimeException("You have already applied for this job");
        });

        // Run eligibility check — throws exception with reason if not eligible
        eligibilityService.checkEligibility(student, job);

        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setResume(resume);

     // Save application
        Application savedApplication =
                applicationRepository.save(application);

        // Trigger notification
        notificationService.createNotification(
                userId,
                "Your application for '" + job.getJobTitle() +
                "' at " + job.getEmployer().getCompanyName() +
                " has been submitted successfully."
        );

        return savedApplication;
    }

    public List<Application> getStudentApplications(Integer userId) {
        Student student = studentRepository.findByUserUserId(userId)
            .orElseThrow(() -> new RuntimeException("Student not found"));
        return applicationRepository.findByStudent(student);
    }
}
