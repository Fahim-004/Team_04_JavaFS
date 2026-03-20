package com.pat.backend_pat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.pat.backend_pat.entity.Notification;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Integer> {

}