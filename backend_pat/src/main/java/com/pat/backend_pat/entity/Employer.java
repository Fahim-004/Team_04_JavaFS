package com.pat.backend_pat.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "employers")
public class Employer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employerId;

    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column
    private String companyName;

    @Column(columnDefinition = "TEXT")
    private String companyDescription;

    @Column(nullable = false)
    private Boolean approvedStatus = false;

    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    // ✅ No-args constructor
    public Employer() {
    }

    // ✅ All-args constructor
    public Employer(Integer employerId, User user, String companyName,
                    String companyDescription, Boolean approvedStatus,
                    LocalDateTime createdAt) {
        this.employerId = employerId;
        this.user = user;
        this.companyName = companyName;
        this.companyDescription = companyDescription;
        this.approvedStatus = approvedStatus;
        this.createdAt = createdAt;
    }

    // ✅ Getters & Setters

    public Integer getEmployerId() {
        return employerId;
    }

    public void setEmployerId(Integer employerId) {
        this.employerId = employerId;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getCompanyDescription() {
        return companyDescription;
    }

    public void setCompanyDescription(String companyDescription) {
        this.companyDescription = companyDescription;
    }

    public Boolean getApprovedStatus() {
        return approvedStatus;
    }

    public void setApprovedStatus(Boolean approvedStatus) {
        this.approvedStatus = approvedStatus;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
