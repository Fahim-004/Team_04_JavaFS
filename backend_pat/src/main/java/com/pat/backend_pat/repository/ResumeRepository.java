package com.pat.backend_pat.repository;
import java.util.List;

import com.pat.backend_pat.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {
	List<Resume> findByStudentStudentId(Integer studentId);
}