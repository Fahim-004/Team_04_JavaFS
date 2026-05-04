package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Employer;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface EmployerRepository extends JpaRepository<Employer, Integer> {

    Optional<Employer> findByUserUserId(Integer userId);
}