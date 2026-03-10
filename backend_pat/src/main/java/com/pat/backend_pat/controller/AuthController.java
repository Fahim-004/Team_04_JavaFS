package com.pat.backend_pat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    // Signup API
    @PostMapping("/signup")
    public User signup(@RequestBody User user) {
        return authService.registerUser(user);
    }

    // Login API
    @PostMapping("/login")
    public String login(@RequestParam String email,
                        @RequestParam String password) {

        boolean isValid = authService.validateLogin(email, password);

        if(isValid) {
            return "Login Successful";
        } else {
            return "Invalid Email or Password";
        }
    }

}