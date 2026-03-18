package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Application;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApplicationRepository extends JpaRepository<Application,Long>{
	boolean existsByStudentAndJob(Student student, Job job);

}
