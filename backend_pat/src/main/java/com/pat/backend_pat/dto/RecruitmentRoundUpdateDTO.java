package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RecruitmentRoundUpdateDTO {
    private Integer roundOrder;
    private String roundName;
}

