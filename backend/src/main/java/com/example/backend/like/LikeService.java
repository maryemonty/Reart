package com.example.backend.like;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.artwork.Artwork;
import com.example.backend.artwork.ArtworkRepository;
import com.example.backend.artwork.ArtworkService;
import com.example.backend.exceptions.NotFound;
import com.example.backend.notifications.NotificationsService;
import com.example.backend.users.User;
import com.example.backend.users.UserRepository;

@Service
public class LikeService {
	private final LikeRepository likeRepository;
	private final UserRepository userRepository;
	private final ArtworkRepository artworkRepository;
	private final ArtworkService artworkService;
	private final NotificationsService notificationsService;

	@Autowired
	public LikeService(LikeRepository likeRepository, UserRepository userRepository,
			ArtworkRepository artworkRepository, ArtworkService artworkService,
			NotificationsService notificationsService) {
		this.likeRepository = likeRepository;
		this.userRepository = userRepository;
		this.artworkRepository = artworkRepository;
		this.artworkService = artworkService;
		this.notificationsService = notificationsService;
	}

	public User findByUserId(UUID id) throws NotFound {
		return userRepository.findById(id).orElseThrow(() -> new NotFound("User not found"));
	}

	public Artwork findByArtworkId(UUID id) throws NotFound {
		return artworkRepository.findById(id).orElseThrow(() -> new NotFound("Artwork not found"));
	}

	public Like create(UUID userId, UUID artworkId, Like like) {
		User user = findByUserId(userId);
		Artwork artwork = findByArtworkId(artworkId);
		boolean userLiked = likeRepository.existsByUserAndArtwork(user, artwork);
		if (userLiked) {
			throw new IllegalArgumentException("user already liked this artwork");
		}
		String message = user.getName() + " ha messo like a " + artwork.getTitle();
		artworkService.incrementLikeCount(artworkId);
		Like newLike = new Like(like.getId(), user, artwork);

		return likeRepository.save(newLike);
	}

	public Like findById(UUID id) throws NotFound {
		return likeRepository.findById(id).orElseThrow(() -> new NotFound("User not found"));
	}

	public void delete(UUID id, UUID artworkId) throws NotFound {
		artworkService.decrementLikeCount(artworkId);
		Like like = findById(id);
		notificationsService.deleteNotificationByLikeId(like.getId());
		likeRepository.delete(like);
	}

	public List<Like> find() {
		return likeRepository.findAll();
	}

	public Like findByUserAndArtworkId(UUID userId, UUID artworkId) throws NotFound {
		User user = findByUserId(userId);
		Artwork artwork = findByArtworkId(artworkId);
		return likeRepository.findByUserAndArtwork(user, artwork).orElseThrow(() -> new NotFound("Like not found"));
	}

}
