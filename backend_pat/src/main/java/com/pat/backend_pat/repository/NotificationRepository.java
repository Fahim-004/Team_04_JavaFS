package com.pat.backend_pat.repository;

import com.pat.backend_pat.entity.Notification;
import com.pat.backend_pat.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Integer> {

    List<Notification> findByUserOrderByCreatedAtDesc(User user);
}