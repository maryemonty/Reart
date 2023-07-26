package com.example.backend.notifications;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.like.Like;
import com.example.backend.like.LikeRepository;
import com.example.backend.users.User;
import com.example.backend.users.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class NotificationsService {

	private final NotificationsRepository notificationsRepository;
	private final UserRepository userRepository;
	private final LikeRepository likeRepository;

	@Autowired
	public NotificationsService(NotificationsRepository notificationsRepository, UserRepository userRepository,
			LikeRepository likeRepository) {
		this.notificationsRepository = notificationsRepository;
		this.userRepository = userRepository;
		this.likeRepository = likeRepository;
	}

	public Like findLikeById(UUID likeId) {
		return likeRepository.findById(likeId).orElse(null);
	}

	public User findUserById(UUID userId) {
		return userRepository.findById(userId).orElse(null);
	}

	public void sendNotificationMessage(Notifications notification) {
		String message = notification.getMessage();
		User user = notification.getUser();
	}

	@Transactional
	public void deleteNotificationByLikeId(UUID likeId) {
		List<Notifications> notifications = notificationsRepository.deleteByLikeId(likeId);
		notificationsRepository.deleteAll(notifications);

	}

	public List<Notifications> findByUserId(UUID userId) {
		return notificationsRepository.findByUserId(userId);
	}

	public void sendLikeNotification(Like like) {
		User artworkOwner = like.getArtwork().getUser();
		String message = like.getArtwork().getTitle() + " received a like by " + like.getUser().getUsername();
		Notifications notification = new Notifications(message, artworkOwner, like);
		notificationsRepository.save(notification);
		sendNotificationMessage(notification);
	}

	public List<Notifications> find() {
		return notificationsRepository.findAll();
	}
}
