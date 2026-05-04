package com.pat.backend_pat.service;

import com.pat.backend_pat.exception.ValidationException;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

@Service
public class JobValidationService {

    public void validateDates(LocalDate applicationDeadline, LocalDate placementDriveDate) {

        if (placementDriveDate.isBefore(applicationDeadline)) {
            throw new ValidationException(
                "Placement drive date cannot be before application deadline"
            );
        }
    }
}