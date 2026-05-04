package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Job;
import com.pat.backend_pat.entity.RecruitmentRound;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface RecruitmentRoundRepository extends JpaRepository<RecruitmentRound, Integer> {

    List<RecruitmentRound> findByJobOrderByRoundOrderAsc(Job job);

    boolean existsByJobAndRoundOrder(Job job, Integer roundOrder);
}