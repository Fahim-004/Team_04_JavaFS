package com.pat.backend_pat.security;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import java.util.Date;

public class JwtUtil {

    private String secret = "pat-secret-key";

    public String generateToken(String email) {

        return Jwts.builder()
                .setSubject(email)        // user identifier
                .setIssuedAt(new Date())  // token creation time
                .signWith(SignatureAlgorithm.HS256, secret) // encryption algorithm
                .compact();
    }

}

	


