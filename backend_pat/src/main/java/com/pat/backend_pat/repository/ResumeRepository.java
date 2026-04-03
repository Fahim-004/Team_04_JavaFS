package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Integer> {

    List<Resume> findByStudent_StudentId(Integer studentId);
}