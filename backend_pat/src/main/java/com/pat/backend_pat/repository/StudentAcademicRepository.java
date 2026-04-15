package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.StudentAcademic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentAcademicRepository extends JpaRepository<StudentAcademic, Integer> {

    Optional<StudentAcademic> findByStudentStudentId(Integer studentId);
}