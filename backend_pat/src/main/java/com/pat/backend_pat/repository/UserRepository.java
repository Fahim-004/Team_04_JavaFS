package com.pat.backend_pat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pat.backend_pat.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

}