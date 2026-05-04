package com.pat.backend_pat.dto;

import jakarta.validation.constraints.NotBlank;

public class EmployerProfileDTO {

    @NotBlank(message = "Company name is required")
    private String companyName;

    private String companyDescription;

    public String getCompanyName() {
        return companyName;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }
}