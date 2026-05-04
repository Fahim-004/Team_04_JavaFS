package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.math.BigDecimal;
import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findByEmployer(Employer employer);

    @Query("SELECT j FROM Job j WHERE " +
           "(:branch IS NULL OR j.eligibleBranches LIKE %:branch%) AND " +
           "(:minCgpa IS NULL OR j.minCgpa IS NULL OR j.minCgpa <= :minCgpa)")
    List<Job> findJobsWithFilters(
        @Param("branch") String branch,
        @Param("minCgpa") BigDecimal minCgpa
    );
}