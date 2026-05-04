package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ApplicationRepository extends JpaRepository<Application, Integer> {

    List<Application> findByStudent(Student student);

    List<Application> findByJob(Job job);

    Optional<Application> findByStudentAndJob(Student student, Job job);
    int countByStatus(Application.ApplicationStatus status);
}
