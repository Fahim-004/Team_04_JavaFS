package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.StudentAnalytics;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentAnalyticsRepository extends JpaRepository<StudentAnalytics, Integer> {
}