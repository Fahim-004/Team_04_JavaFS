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

    @PutMapping("/applications/{applicationId}/round-result")
    public ResponseEntity<?> updateRoundResult(
        @PathVariable Integer applicationId,
        @RequestBody Map<String, Object> body
    ) {
        Integer roundId = (Integer) body.get("roundId");
        String status   = (String)  body.get("status");
        return ResponseEntity.ok(
            roundService.updateRoundResult(applicationId, roundId, status));
    }
}