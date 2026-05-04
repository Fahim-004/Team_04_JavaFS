package com.pat.backend_pat.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            // Disable CSRF because we are building a REST API
            .csrf(csrf -> csrf.disable())

            // Authorization rules
            .authorizeHttpRequests(auth -> auth
                // Public endpoints
                .requestMatchers("/auth/signup", "/auth/login").permitAll()

                // Everything else requires authentication
                .anyRequest().authenticated()
            )

            // Enable basic auth temporarily (Postman testing)
            .httpBasic(Customizer.withDefaults());

        return http.build();
    }
}