package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.*;
import com.pat.backend_pat.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitmentRoundService {

    @Autowired private JobRepository jobRepository;
    @Autowired private RecruitmentRoundRepository roundRepository;
    @Autowired private ApplicationRepository applicationRepository;
    @Autowired private RoundResultRepository roundResultRepository;
    @Autowired private NotificationService notificationService;

    public RecruitmentRound createRound(Integer jobId, String roundName, Integer roundOrder) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

        if (roundRepository.existsByJobAndRoundOrder(job, roundOrder)) {
            throw new RuntimeException(
                "A round with order " + roundOrder + " already exists for this job");
        }

        RecruitmentRound round = new RecruitmentRound();
        round.setJob(job);
        round.setRoundName(roundName);
        round.setRoundOrder(roundOrder);
        return roundRepository.save(round);
    }

    public List<RecruitmentRound> getRoundsForJob(Integer jobId) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));
        return roundRepository.findByJobOrderByRoundOrderAsc(job);
    }

    public RoundResult updateRoundResult(Integer applicationId,
                                          Integer roundId, String status) {
        Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

        RecruitmentRound round = roundRepository.findById(roundId)
            .orElseThrow(() -> new RuntimeException("Round not found"));

        Optional<RoundResult> existing =
            roundResultRepository.findByApplicationAndRound(application, round);

        RoundResult result;
        if (existing.isPresent()) {
            result = existing.get();
            result.setStatus(status);
            result.setUpdatedAt(LocalDateTime.now());
        } else {
            result = new RoundResult();
            result.setApplication(application);
            result.setRound(round);
            result.setStatus(status);
        }

        RoundResult saved = roundResultRepository.save(result);

        notificationService.createNotification(
            application.getStudent().getUser().getUserId(),
            "Your result for round '" + round.getRoundName() +
            "' has been updated to: " + status
        );

        return saved;
    }
}
