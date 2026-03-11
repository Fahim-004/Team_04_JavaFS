package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByRolename(String rolename);

    // Optional extras (good to have for seeding or checks)
    // boolean existsByRolename(String rolename);
}