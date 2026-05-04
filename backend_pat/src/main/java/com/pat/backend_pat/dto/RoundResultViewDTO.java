package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RoundResultViewDTO {
    private Integer roundId;
    private Integer roundOrder;
    private String roundName;
    private String status;
    private LocalDateTime updatedAt;
}
