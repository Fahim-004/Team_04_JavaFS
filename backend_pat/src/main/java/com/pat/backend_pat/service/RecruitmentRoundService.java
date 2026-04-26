package com.pat.backend_pat.service;

import com.pat.backend_pat.entity.*;
import com.pat.backend_pat.entity.Application.ApplicationStatus;
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

    public RecruitmentRound createRound(Integer jobId, String roundName, Integer roundOrder) {
        Job job = jobRepository.findById(jobId)
            .orElseThrow(() -> new RuntimeException("Job not found"));

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

    private boolean isFinalRound(RecruitmentRound currentRound) {
        List<RecruitmentRound> rounds =
            roundRepository.findByJobOrderByRoundOrderAsc(currentRound.getJob());

        return rounds.get(rounds.size() - 1).getRoundId()
                .equals(currentRound.getRoundId());
    }

    public RoundResult updateRoundResult(Integer applicationId,
                                         Integer roundId,
                                         String status) {
    	RoundStatus roundStatus = RoundStatus.valueOf(status.toUpperCase());

        Application application = applicationRepository.findById(applicationId)
            .orElseThrow(() -> new RuntimeException("Application not found"));

        RecruitmentRound round = roundRepository.findById(roundId)
            .orElseThrow(() -> new RuntimeException("Round not found"));

        Optional<RoundResult> existing =
            roundResultRepository.findByApplicationAndRound(application, round);

        RoundResult result;

        if (existing.isPresent()) {
            result = existing.get();
            result.setStatus(roundStatus);
            result.setUpdatedAt(LocalDateTime.now());
        } else {
            result = new RoundResult();
            result.setApplication(application);
            result.setRound(round);
            result.setStatus(roundStatus);
        }

        RoundResult saved = roundResultRepository.save(result);

        // ✅ MAIN FIX (ENUM SAFE)
        switch (status) {
            case "FAILED":
                application.setStatus(ApplicationStatus.Rejected);
                break;

            case "PASSED":
                if (isFinalRound(round)) {
                    application.setStatus(ApplicationStatus.Selected);
                } else {
                    application.setStatus(ApplicationStatus.Shortlisted);
                }
                break;

            case "PENDING":
                application.setStatus(ApplicationStatus.Applied);
                break;

            default:
                application.setStatus(ApplicationStatus.Applied);
        }

        applicationRepository.save(application);

        return saved;
    }
}