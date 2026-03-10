package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    // Optional: you can add these later if needed
    // boolean existsByEmail(String email);
}