package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.StudentApplicationViewDTO;
import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Application.ApplicationStatus;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.Resume;
import com.pat.backend_pat.entity.RoundResult;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.ResumeRepository;
import com.pat.backend_pat.repository.RoundResultRepository;
import com.pat.backend_pat.repository.StudentRepository;
import com.pat.backend_pat.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ApplicationService {

        @Autowired
        private StudentRepository studentRepository;
        @Autowired
        private JobRepository jobRepository;
        @Autowired
        private ResumeRepository resumeRepository;
        @Autowired
        private ApplicationRepository applicationRepository;
        @Autowired
        private EligibilityService eligibilityService;
        @Autowired
        private NotificationService notificationService;
        @Autowired
        private UserRepository userRepository;
        @Autowired
        private RoundResultRepository roundResultRepository;

        public Application applyForJob(Integer userId, Integer jobId, Integer resumeId) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

                Job job = jobRepository.findById(jobId)
                                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

                if (job.getStatus() != Job.JobStatus.OPEN) {
                        throw new IllegalArgumentException("Applications are closed for this job");
                }

                Resume resume = resumeRepository.findById(resumeId)
                                .orElseThrow(() -> new ResourceNotFoundException("Resume not found"));

                if (!resume.getStudent().getStudentId().equals(student.getStudentId())) {
                        throw new IllegalArgumentException("Resume does not belong to this student");
                }

                applicationRepository.findByStudentAndJob(student, job).ifPresent(a -> {
                        throw new IllegalArgumentException("Already applied");
                });

                eligibilityService.checkEligibility(student, job);

                Application application = new Application();
                application.setStudent(student);
                application.setJob(job);
                application.setResume(resume);
                application.setStatus(ApplicationStatus.Applied);

                Application saved = applicationRepository.save(application);

                notificationService.createNotification(userId, "Application submitted successfully");
                return saved;
        }

        public List<StudentApplicationViewDTO> getStudentApplications(Integer userId) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                List<Application> applications = applicationRepository.findByStudent(student);

                return applications.stream().map(application -> {
                        Job job = application.getJob();
                        Job.JobStatus status = job.getStatus();

                        RoundResult latestRoundResult = roundResultRepository
                                        .findTopByApplicationOrderByRoundRoundOrderDescUpdatedAtDesc(application)
                                        .orElse(null);

                        String roundName = latestRoundResult != null ? latestRoundResult.getRound().getRoundName() : null;
                        Integer roundOrder = latestRoundResult != null ? latestRoundResult.getRound().getRoundOrder() : null;
                        String roundResult = latestRoundResult != null ? latestRoundResult.getStatus().name() : null;

                        StudentApplicationViewDTO dto = new StudentApplicationViewDTO();
                        dto.setApplicationId(application.getApplicationId());
                        dto.setJobTitle(job.getJobTitle());
                        dto.setCompanyName(job.getEmployer().getCompanyName());
                        dto.setSalaryPackage(job.getSalaryPackage());
                        dto.setApplicationStatus(application.getStatus());
                        dto.setAppliedAt(application.getAppliedAt());
                        dto.setLastUpdatedAt(latestRoundResult != null ? latestRoundResult.getUpdatedAt() : application.getAppliedAt());
                        dto.setCurrentRoundName(roundName);
                        dto.setCurrentRoundOrder(roundOrder);
                        dto.setCurrentRoundResult(roundResult);
                        dto.setJobStatus(status.name());
                        dto.setJobAvailabilityLabel(
                                        status == Job.JobStatus.OPEN ? "Intake Open"
                                                        : status == Job.JobStatus.CLOSED ? "Intake Closed" : "Job Removed");
                        return dto;
                }).collect(Collectors.toList());
        }

        public Integer getUserIdFromEmail(String email) {
                User user = userRepository.findByEmail(email)
                                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
                return user.getUserId();
        }
}
