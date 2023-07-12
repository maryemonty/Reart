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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.example.backend.exceptions.NotFound;

@RestController
@RequestMapping("like")
@CrossOrigin(origins = "http://localhost:3000")
public class LikeController {

	private final LikeService likeService;

	@Autowired
	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}

	@GetMapping
	public List<Like> getLikes() {
		return likeService.find();
	}

	@GetMapping("/{userId}/{artworkId}")
	public Like getLike(@PathVariable UUID userId, @PathVariable UUID artworkId) {
		try {
			return likeService.findByUserAndArtworkId(userId, artworkId);
		} catch (NotFound e) {
			throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Like not found", e);
		}
	}

	@PostMapping("/{userId}/{artworkId}")
	@ResponseStatus(HttpStatus.CREATED)
	public Like like(@PathVariable UUID userId, @PathVariable UUID artworkId, Like like) {
		return likeService.create(userId, artworkId, like);
	}

	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void like(@PathVariable UUID id) {
		likeService.delete(id);
	}

}
