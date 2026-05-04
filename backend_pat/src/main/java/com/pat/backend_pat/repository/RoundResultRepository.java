package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Application;
import com.pat.backend_pat.entity.RecruitmentRound;
import com.pat.backend_pat.entity.RoundResult;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface RoundResultRepository extends JpaRepository<RoundResult, Integer> {

        Optional<RoundResult> findByApplicationAndRound(
                        Application application, RecruitmentRound round);

        Optional<RoundResult> findTopByApplicationOrderByRoundRoundOrderDescUpdatedAtDesc(
                        Application application);

        List<RoundResult> findByApplicationOrderByRoundRoundOrderAsc(Application application);
}