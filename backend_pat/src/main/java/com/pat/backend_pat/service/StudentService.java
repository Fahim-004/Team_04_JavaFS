package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.StudentAcademicDTO;
import com.pat.backend_pat.entity.StudentAcademic;
import com.pat.backend_pat.repository.StudentAcademicRepository;
import com.pat.backend_pat.dto.StudentProfileDTO;
import com.pat.backend_pat.entity.Resume;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.repository.ResumeRepository;
import com.pat.backend_pat.repository.StudentRepository;
import com.pat.backend_pat.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final ResumeRepository resumeRepository;
    private final UserRepository userRepository;

    // ✅ 1. Get Profile
    @Transactional
    public Student getProfile(Integer userId) {
        return studentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));
    }

    // ✅ 2. Update Profile
    @Transactional
    public Student updateProfile(Integer userId, StudentProfileDTO dto) {

        Student student = studentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

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
    public Resume uploadResume(Integer userId, String filePath) {

        Student student = studentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        Resume resume = new Resume();
        resume.setStudent(student);
        resume.setResumeFile(filePath);
        resume.setUploadedAt(LocalDateTime.now());
        resume.setIsDefault(false);

        return resumeRepository.save(resume);
    }

    // ✅ 4. Get All Resumes
    @Transactional
    public List<Resume> getResumes(Integer userId) {

        Student student = studentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student profile not found"));

        return resumeRepository.findByStudentStudentId(student.getStudentId());
    }
    @Autowired
    private StudentAcademicRepository studentAcademicRepository;
    public StudentAcademic updateAcademic(Integer userId, StudentAcademicDTO dto) {

        Student student = studentRepository.findByUserUserId(userId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

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
                .orElseThrow(() -> new RuntimeException("Student not found"));

        return studentAcademicRepository
                .findByStudentStudentId(student.getStudentId())
                .orElseThrow(() -> new RuntimeException("Academic details not found"));
    }
}
