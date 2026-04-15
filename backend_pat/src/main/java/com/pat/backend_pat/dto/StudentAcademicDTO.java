package com.pat.backend_pat.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class StudentAcademicDTO {

    private String degree;
    private String branch;

    @NotNull(message = "CGPA is required")
    private Double cgpa;

    private Integer backlogCount;

    private Double tenth;
    private Double twelfth;

    private String skills;
    private String projects;
    private String certifications;

    private Integer semester;
    private Integer passingYear;

    private String usn;
}