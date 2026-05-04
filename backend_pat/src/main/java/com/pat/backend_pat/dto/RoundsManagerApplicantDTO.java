package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundsManagerApplicantDTO {
    private Integer applicationId;
    private String studentName;
    private String applicationStatus;
    private List<RoundResultViewDTO> roundResults;
}
