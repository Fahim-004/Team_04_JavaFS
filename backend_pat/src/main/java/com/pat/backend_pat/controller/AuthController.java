package com.pat.backend_pat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pat.backend_pat.dto.LoginRequestDTO;
import com.pat.backend_pat.dto.LoginResponse;
import com.pat.backend_pat.dto.SignupRequestDTO;
import com.pat.backend_pat.security.JwtUtil;
import com.pat.backend_pat.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtUtil jwtUtil;

    // Signup API
    @PostMapping("/signup")
    public String signup(@RequestBody SignupRequestDTO request) {

        authService.registerUser(request);
        return "User registered successfully";
    }

    // Login API
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequestDTO request) {

        boolean isValid = authService.validateLogin(
                request.getEmail(),
                request.getPassword()
        );

        if (!isValid) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(request.getEmail());

        LoginResponse response = new LoginResponse();
        response.setToken(token);

        return response;
    }
}