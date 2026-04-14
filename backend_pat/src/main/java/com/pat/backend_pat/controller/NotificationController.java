package com.pat.backend_pat.controller;

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

	    // GET all notifications for logged-in user
	    @GetMapping("/notifications")
	    public ResponseEntity<?> getNotifications(Authentication auth) {

	        // Get logged-in userId from JWT
	        Integer userId = (Integer) auth.getDetails();

	        return ResponseEntity.ok(
	                notificationService.getNotifications(userId)
	        );
	    }

	    // Mark notification as read
	    @PutMapping("/notifications/{notificationId}/read")
	    public ResponseEntity<?> markAsRead(
	            @PathVariable Integer notificationId
	    ) {

	        return ResponseEntity.ok(
	                notificationService.markAsRead(notificationId)
	        );
	    }

}
