package com.example.backend.like;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.exceptions.NotFound;
import com.example.backend.notifications.NotificationsService;

@RestController
@RequestMapping("like")
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {

	private final LikeService likeService;
	private final NotificationsService notificationsService;

	@Autowired
	public LikeController(LikeService likeService, NotificationsService notificationsService) {
		this.likeService = likeService;
		this.notificationsService = notificationsService;
	}

	@GetMapping
	public List<Like> getLikes() {
		return likeService.find();
	}

	@GetMapping("/{userId}/{artworkId}")
	public Like getLike(@PathVariable String userId, @PathVariable String artworkId) {
		if (userId == null || artworkId == null) {
			return null;
		}

		UUID userUUID;
		UUID artworkUUID;
		try {
			userUUID = UUID.fromString(userId);
			artworkUUID = UUID.fromString(artworkId);
		} catch (IllegalArgumentException e) {
			return null;
		}

		Like like;
		try {
			like = likeService.findByUserAndArtworkId(userUUID, artworkUUID);
		} catch (NotFound e) {
			return null;
		}

		return like;
	}

	@PostMapping("/{userId}/{artworkId}")
	@ResponseStatus(HttpStatus.CREATED)
	public Like like(@PathVariable UUID userId, @PathVariable UUID artworkId, @RequestBody Like like) {
		Like createdLike = likeService.create(userId, artworkId, like);
		notificationsService.sendLikeNotification(createdLike);
		return createdLike;
	}

	@DeleteMapping("/{id}/{artworkId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void unlike(@PathVariable UUID id, @PathVariable UUID artworkId) {
		likeService.delete(id, artworkId);
	}
}
