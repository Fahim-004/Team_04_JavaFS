package com.pat.backend_pat.service;

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

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

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