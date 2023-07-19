package com.example.backend.notifications;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.users.UserService;

@RestController
@RequestMapping("notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationsController {

	private final NotificationsService notificationsService;

	@Autowired
	public NotificationsController(NotificationsService notificationsService, UserService userService) {
		this.notificationsService = notificationsService;
	}

	@GetMapping
	public List<Notifications> getNotifications() {
		return notificationsService.find();
	}

	@GetMapping("/{userId}")
	public List<Notifications> getNotificationsByUserId(@PathVariable UUID userId) {
		return notificationsService.findByUserId(userId);
	}

}
