package com.pat.backend_pat.service;

import com.pat.backend_pat.dto.RecruitmentRoundUpdateDTO;
import com.pat.backend_pat.entity.*;
import com.pat.backend_pat.entity.Application.ApplicationStatus;
import com.pat.backend_pat.exception.AccessDeniedException;
import com.pat.backend_pat.exception.ConflictException;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.exception.ValidationException;
import com.pat.backend_pat.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RecruitmentRoundService {

    @Autowired
    private JobRepository jobRepository;
    @Autowired
    private RecruitmentRoundRepository roundRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private EmployerRepository employerRepository;
    @Autowired
    private ApplicationRepository applicationRepository;
    @Autowired
    private RoundResultRepository roundResultRepository;
    @Autowired
    private NotificationService notificationService;

    public RecruitmentRound createRound(Integer jobId, String roundName, Integer roundOrder) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));

        if (roundRepository.existsByJobAndRoundOrder(job, roundOrder)) {
            throw new IllegalArgumentException("Round order already exists for this job");
        }

        RecruitmentRound round = new RecruitmentRound();
        round.setJob(job);
        round.setRoundName(roundName);
        round.setRoundOrder(roundOrder);

        return roundRepository.save(round);
    }

    public List<RecruitmentRound> getRoundsForJob(Integer jobId) {
        Job job = jobRepository.findById(jobId)
                .orElseThrow(() -> new ResourceNotFoundException("Job not found"));
        return roundRepository.findByJobOrderByRoundOrderAsc(job);
    }

    public RecruitmentRound updateRoundById(Integer roundId, String email, RecruitmentRoundUpdateDTO dto) {
        RecruitmentRound round = roundRepository.findById(roundId)
                .orElseThrow(() -> new ResourceNotFoundException("Round not found"));

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.getRole() != User.Role.employer) {
            throw new AccessDeniedException("You are not authorized to edit this round");
        }

        Employer employer = employerRepository.findByUserUserId(user.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("Employer profile not found"));

        Job job = round.getJob();
        if (job == null || job.getEmployer() == null
                || job.getEmployer().getEmployerId() == null
                || !job.getEmployer().getEmployerId().equals(employer.getEmployerId())) {
            throw new AccessDeniedException("You are not authorized to edit this round");
        }

        Integer newRoundOrder = dto != null ? dto.getRoundOrder() : null;
        String newRoundName = dto != null ? dto.getRoundName() : null;

        if (newRoundOrder != null && !newRoundOrder.equals(round.getRoundOrder())) {
            if (roundRepository.existsByJobAndRoundOrderAndRoundIdNot(round.getJob(), newRoundOrder, round.getRoundId())) {
                throw new ConflictException("A round with this order already exists for this job");
            }
            round.setRoundOrder(newRoundOrder);
        }

        if (newRoundName != null) {
            String trimmed = newRoundName.trim();
            if (trimmed.isEmpty()) {
                throw new ValidationException("roundName cannot be empty");
            }
            round.setRoundName(trimmed);
        }

        return roundRepository.save(round);
    }

    private boolean isFinalRound(RecruitmentRound currentRound) {
        List<RecruitmentRound> rounds = roundRepository.findByJobOrderByRoundOrderAsc(currentRound.getJob());

        return rounds.get(rounds.size() - 1).getRoundId()
                .equals(currentRound.getRoundId());
    }

    private void validateRoundUpdateOrder(Application application,
            RecruitmentRound currentRound) {

        if (!application.getJob().getJobId().equals(currentRound.getJob().getJobId())) {
            throw new IllegalArgumentException("Round does not belong to this application's job");
        }

        List<RecruitmentRound> rounds = roundRepository.findByJobOrderByRoundOrderAsc(currentRound.getJob());

        for (RecruitmentRound round : rounds) {
            if (round.getRoundOrder() >= currentRound.getRoundOrder()) {
                continue;
            }

            Optional<RoundResult> priorResult = roundResultRepository
                    .findByApplicationAndRound(application, round);

            if (priorResult.isEmpty()) {
                throw new IllegalArgumentException(
                        "Blocked at Round " + round.getRoundOrder() + " ("
                                + round.getRoundName() + "): result not updated yet");
            }

            if (priorResult.get().getStatus() != RoundStatus.PASSED) {
                throw new IllegalArgumentException(
                        "Blocked at Round " + round.getRoundOrder() + " ("
                                + round.getRoundName() + "): status is "
                                + priorResult.get().getStatus() + ", expected PASSED");
            }
        }
    }

    public RoundResult updateRoundResult(Integer applicationId,
            Integer roundId,
            String status) {

        System.out.println("STATUS RECEIVED: " + status);
        RoundStatus roundStatus = RoundStatus.valueOf(status.toUpperCase());

        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found"));

        RecruitmentRound round = roundRepository.findById(roundId)
                .orElseThrow(() -> new ResourceNotFoundException("Round not found"));

        validateRoundUpdateOrder(application, round);

        Optional<RoundResult> existing = roundResultRepository.findByApplicationAndRound(application, round);
        RoundStatus previousRoundStatus = existing.map(RoundResult::getStatus).orElse(null);
        String previousApplicationStatus = application.getStatus();

        RoundResult result;
        System.out.println("ROUND STATUS: " + roundStatus);
        System.out.println("APPLICATION BEFORE: " + application.getStatus());

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

        switch (roundStatus) {
            case FAILED:
                System.out.println("SETTING REJECTED");
                application.setStatus(ApplicationStatus.Rejected);
                break;

            case PASSED:
                System.out.println("SETTING PASSED LOGIC");
                if (isFinalRound(round)) {
                    application.setStatus(ApplicationStatus.Selected);
                } else {
                    application.setStatus(ApplicationStatus.Shortlisted);
                }
                break;

            case PENDING:
                System.out.println("SETTING APPLIED");
                application.setStatus(ApplicationStatus.Applied);
                break;

            default:
                application.setStatus(ApplicationStatus.Applied);
        }

        applicationRepository.save(application);

        String companyName = application.getJob().getEmployer().getCompanyName();
        String jobTitle = application.getJob().getJobTitle();
        String roundLabel = "Round " + round.getRoundOrder() + " (" + round.getRoundName() + ")";
        String resultMessage;

        if (previousRoundStatus == null) {
            resultMessage = "Update: " + roundLabel + " result is " + roundStatus + " for "
                    + jobTitle + " at " + companyName + ".";
        } else {
            resultMessage = "Update: " + roundLabel + " result changed from " + previousRoundStatus
                    + " to " + roundStatus + " for " + jobTitle + " at " + companyName + ".";
        }

        notificationService.createNotification(
                application.getStudent().getUser().getUserId(),
                resultMessage);

        if (!previousApplicationStatus.equals(application.getStatus())) {
            notificationService.createNotification(
                    application.getStudent().getUser().getUserId(),
                    "Application status changed to " + application.getStatus() + " for " + jobTitle
                            + " at " + companyName + ".");
        }

        System.out.println("APPLICATION AFTER: " + application.getStatus());

        return saved;
    }
}
