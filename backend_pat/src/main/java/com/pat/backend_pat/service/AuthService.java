package com.pat.backend_pat.service;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.repository.UserRepository;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    // Register user
    public User registerUser(User user) {

        // Check if email already exists
        if(userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // Set created time
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }


    // Login validation
    public boolean validateLogin(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if(user == null) {
            return false;
        }

        return passwordEncoder.matches(password, user.getPassword());
    }

}