package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.StudentAcademicDTO;
import com.pat.backend_pat.dto.StudentDashboardStatsDTO;
import com.pat.backend_pat.dto.StudentProfileDTO;
import com.pat.backend_pat.dto.ResumeUploadResponseDTO;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.Resume;
import com.pat.backend_pat.entity.RoundStatus;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.entity.StudentAcademic;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.repository.ApplicationRepository;
import com.pat.backend_pat.repository.JobRepository;
import com.pat.backend_pat.repository.ResumeRepository;
import com.pat.backend_pat.repository.RoundResultRepository;
import com.pat.backend_pat.repository.StudentAcademicRepository;
import com.pat.backend_pat.repository.StudentRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StudentService {

        private final StudentRepository studentRepository;
        private final ResumeRepository resumeRepository;
        private final ApplicationRepository applicationRepository;
        private final JobRepository jobRepository;
        private final RoundResultRepository roundResultRepository;

        // ✅ 1. Get Profile
        @Transactional
        public Student getProfile(Integer userId) {
                return studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));
        }

        // ✅ 2. Update Profile
        @Transactional
        public Student updateProfile(Integer userId, StudentProfileDTO dto) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

                student.setFullName(dto.getFullName());
                student.setPhoneNumber(dto.getPhoneNumber());
                student.setUsn(dto.getUsn());
                student.setBranch(dto.getBranch());
                student.setCgpa(dto.getCgpa());
                student.setBacklogCount(dto.getBacklogCount());
                student.setPassingYear(dto.getPassingYear());
                student.setSkills(dto.getSkills());
                student.setProjects(dto.getProjects());
                student.setLinkedinUrl(dto.getLinkedinUrl());
                student.setGithubUrl(dto.getGithubUrl());

                student.setProfileCompleted(true);
                return studentRepository.save(student);
        }

        // ✅ 3. Upload Resume
        @Transactional
        public ResumeUploadResponseDTO uploadResume(Integer userId, MultipartFile file) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

                // Validate file presence
                if (file == null || file.isEmpty()) {
                        throw new IllegalArgumentException("Resume file is required");
                }

                // Validate file size (1MB limit)
                if (file.getSize() > 1_048_576) {
                        throw new IllegalArgumentException("Resume file must not exceed 1MB");
                }

                // Validate file extension
                String originalFileName = StringUtils.cleanPath(file.getOriginalFilename());
                if (originalFileName == null || originalFileName.isBlank()) {
                        throw new IllegalArgumentException("File name is required");
                }
                if (!originalFileName.toLowerCase().endsWith(".pdf")) {
                        throw new IllegalArgumentException("Only PDF resumes are allowed");
                }

                // Validate content type
                String contentType = file.getContentType();
                if (contentType != null && !contentType.equalsIgnoreCase("application/pdf")) {
                        throw new IllegalArgumentException("Only PDF resumes are allowed");
                }

                // Create storage directory
                Path uploadDir = Paths.get("uploads", "resumes").toAbsolutePath().normalize();
                try {
                        Files.createDirectories(uploadDir);
                } catch (IOException ex) {
                        throw new IllegalStateException("Unable to create resume storage directory", ex);
                }

                // Store file: uploads/resumes/{userId}.pdf (overwrites existing)
                Path targetFile = uploadDir.resolve(userId + ".pdf");
                try (InputStream inputStream = file.getInputStream()) {
                        Files.copy(inputStream, targetFile, StandardCopyOption.REPLACE_EXISTING);
                } catch (IOException ex) {
                        throw new IllegalStateException("Failed to store resume file", ex);
                }

                String resumeUrl = "/uploads/resumes/" + userId + ".pdf";

                // Update existing resume or create new one (prevents duplicate rows)
                Optional<Resume> existingResume = resumeRepository
                                .findTopByStudentStudentIdOrderByUploadedAtDesc(student.getStudentId());

                Resume resume = existingResume.orElse(new Resume());
                resume.setStudent(student);
                resume.setResumeFile(resumeUrl);
                resume.setFileName(originalFileName);
                resume.setUploadedAt(LocalDateTime.now());
                resume.setIsDefault(false);

                Resume savedResume = resumeRepository.save(resume);
                return new ResumeUploadResponseDTO(
                                resumeUrl,
                                originalFileName,
                                savedResume.getUploadedAt());
        }

        // ✅ 4. Get All Resumes
        @Transactional
        public List<Resume> getResumes(Integer userId) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

                return resumeRepository.findByStudentStudentId(student.getStudentId());
        }

        @Autowired
        private StudentAcademicRepository studentAcademicRepository;

        public StudentAcademic updateAcademic(Integer userId, StudentAcademicDTO dto) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                StudentAcademic academic = studentAcademicRepository
                                .findByStudentStudentId(student.getStudentId())
                                .orElse(new StudentAcademic());

                academic.setStudent(student);
                academic.setDegree(dto.getDegree());
                academic.setTenth(dto.getTenth());
                academic.setTwelfth(dto.getTwelfth());
                academic.setSemester(dto.getSemester());
                academic.setCertifications(dto.getCertifications());

                return studentAcademicRepository.save(academic);
        }

        public StudentAcademic getAcademic(Integer userId) {
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student not found"));

                return studentAcademicRepository
                                .findByStudentStudentId(student.getStudentId())
                                .orElseThrow(() -> new ResourceNotFoundException("Academic details not found"));
        }

        @Transactional
        public StudentDashboardStatsDTO getDashboardStats(Integer userId) {
                // Get student; throw if not found (not silent null)
                Student student = studentRepository.findByUserUserId(userId)
                                .orElseThrow(() -> new ResourceNotFoundException("Student profile not found"));

                // Available drives: count of open jobs (efficient count query)
                long availableDrives = jobRepository.countByStatus(Job.JobStatus.OPEN);

                // My applications: count of this student's applications (efficient count query)
                long myApplications = applicationRepository.countByStudent(student);

                // Upcoming interviews: count distinct applications where student passed a round
                // (efficient database query, not stream-based)
                long upcomingInterviews = roundResultRepository
                                .countDistinctByApplicationStudentAndStatus(
                                                student,
                                                RoundStatus.PASSED);

                return new StudentDashboardStatsDTO(
                                (int) availableDrives,
                                (int) myApplications,
                                (int) upcomingInterviews);
        }
}
