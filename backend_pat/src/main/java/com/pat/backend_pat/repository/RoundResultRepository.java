package com.pat.backend_pat.repository;
import com.pat.backend_pat.entity.RoundResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoundResultRepository extends JpaRepository<RoundResult,Integer>{

}
