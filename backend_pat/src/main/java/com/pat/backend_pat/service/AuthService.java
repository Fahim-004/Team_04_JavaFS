package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.AuthResponse;
import com.pat.backend_pat.dto.LoginRequest;
import com.pat.backend_pat.dto.RegisterRequest;
import com.pat.backend_pat.entity.Employer;
import com.pat.backend_pat.entity.Student;
import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.repository.EmployerRepository;
import com.pat.backend_pat.repository.StudentRepository;
import com.pat.backend_pat.repository.UserRepository;
import com.pat.backend_pat.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final StudentRepository studentRepository;
    private final EmployerRepository employerRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @Transactional
    public AuthResponse register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setRole(User.Role.valueOf(request.getRole()));

        User savedUser = userRepository.save(user);

        if (request.getRole().equalsIgnoreCase("student")) {
            Student student = new Student();
            student.setUser(savedUser);
            studentRepository.save(student);
        }

        if (request.getRole().equalsIgnoreCase("employer")) {
            Employer employer = new Employer();
            employer.setUser(savedUser);
            employer.setApprovedStatus(false);
            employerRepository.save(employer);
        }

        String token = jwtUtil.generateToken(savedUser.getEmail(), savedUser.getRole().name());

        return new AuthResponse(token, savedUser.getRole().name(), savedUser.getUserId());
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(
                request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }

        String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

        return new AuthResponse(token, user.getRole().name(), user.getUserId());
    }
}
