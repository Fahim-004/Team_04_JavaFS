package com.pat.backend_pat.repository;
import com.pat.backend_pat.entity.RecruitmentRound;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruitmentRoundRepository extends JpaRepository<RecruitmentRound,Integer>{

}
