package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Student;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
	Optional<Student> findByUserUserId(Integer userId);

}