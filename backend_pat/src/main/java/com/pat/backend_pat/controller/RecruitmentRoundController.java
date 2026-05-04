package com.pat.backend_pat.controller;

import com.pat.backend_pat.service.RecruitmentRoundService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class RecruitmentRoundController {

    @Autowired
    private RecruitmentRoundService roundService;

    @PostMapping("/jobs/{jobId}/rounds")
    public ResponseEntity<?> createRound(
        @PathVariable Integer jobId,
        @RequestBody Map<String, Object> body
    ) {
        String roundName  = (String)  body.get("roundName");
        Integer roundOrder = (Integer) body.get("roundOrder");
        return ResponseEntity.status(201)
            .body(roundService.createRound(jobId, roundName, roundOrder));
    }

    @GetMapping("/jobs/{jobId}/rounds")
    public ResponseEntity<?> getRounds(@PathVariable Integer jobId) {
        return ResponseEntity.ok(roundService.getRoundsForJob(jobId));
    }

    @PutMapping("/rounds/update-result")
    public ResponseEntity<?> updateResult(
            @RequestParam Integer applicationId,
            @RequestParam Integer roundId,
            @RequestParam String status) {

        roundService.updateRoundResult(applicationId, roundId, status);
        return ResponseEntity.ok("Updated");
    }
}