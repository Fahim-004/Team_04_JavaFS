package com.pat.backend_pat.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pat.backend_pat.entity.*;
public interface JobRepository extends JpaRepository<Job, Integer>{
	
}
