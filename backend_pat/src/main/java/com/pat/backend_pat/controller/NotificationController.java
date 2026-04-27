package com.pat.backend_pat.controller;

import com.pat.backend_pat.entity.User;
import com.pat.backend_pat.repository.UserRepository;
import com.pat.backend_pat.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class NotificationController {
	@Autowired
	private NotificationService notificationService;

	@Autowired
	private UserRepository userRepository;

	private Integer getUserIdFromAuth(Authentication auth) {
		String email = auth.getName();
		User user = userRepository.findByEmail(email)
				.orElseThrow(() -> new RuntimeException("User not found"));
		return user.getUserId();
	}

	// GET all notifications for logged-in user
	@GetMapping("/notifications")
	public ResponseEntity<?> getNotifications(Authentication auth) {

		Integer userId = getUserIdFromAuth(auth);

		return ResponseEntity.ok(
				notificationService.getNotifications(userId));
	}

	// Mark notification as read
	@PutMapping("/notifications/{notificationId}/read")
	public ResponseEntity<?> markAsRead(
			@PathVariable Integer notificationId,
			Authentication auth) {
		Integer userId = getUserIdFromAuth(auth);

		return ResponseEntity.ok(
				notificationService.markAsRead(userId, notificationId));
	}

}
