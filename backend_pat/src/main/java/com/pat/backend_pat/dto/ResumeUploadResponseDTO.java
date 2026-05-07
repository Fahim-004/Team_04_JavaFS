package com.pat.backend_pat.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResumeUploadResponseDTO {

    private String resumeUrl;
    private String fileName;
    private LocalDateTime uploadedAt;
}
