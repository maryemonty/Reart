package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.exceptions.NotFound;
import com.example.backend.users.User;
import com.example.backend.users.UserService;

@RestController
@RequestMapping("artworks")
public class ArtworkController {

	private final ArtworkRepository artworkRepository;
	private final ArtworkService artworkService;
	private final UserService userService;

	@Autowired
	public ArtworkController(ArtworkService artworkService, UserService userService,
			ArtworkRepository artworkRepository) {
		this.artworkService = artworkService;
		this.userService = userService;
		this.artworkRepository = artworkRepository;
	}

	@GetMapping
	public List<Artwork> getArtworks() {
		return artworkService.find();
	}

	private boolean hasUserLikedArtwork(Artwork artwork, User user) {
		return artwork.getLikes() > 0;
	}

	@PostMapping("/like/{artworkId}/{userId}")
	public ResponseEntity<String> like(@PathVariable UUID artworkId, @PathVariable UUID userId) throws NotFound {
		Artwork artwork = artworkService.findById(artworkId);
		User currentUser = userService.findById(userId);
		if (artwork != null && currentUser != null) {
			if (!hasUserLikedArtwork(artwork, currentUser)) {
				artwork.setLikes(artwork.getLikes() + 1); // Increment the number of likes
				artworkRepository.save(artwork); // Save the modified artwork
				return ResponseEntity.ok("Artwork liked successfully.");
			} else {
				return ResponseEntity.ok("Artwork already liked by the user.");
			}
		} else {
			throw new NotFound("Artwork or User not found.");
		}
	}

	@PostMapping("/dislike/{artworkId}/{userId}")
	public ResponseEntity<String> dislike(@PathVariable UUID artworkId, @PathVariable UUID userId) throws NotFound {
		Artwork artwork = artworkService.findById(artworkId);
		User currentUser = userService.findById(userId);
		if (artwork != null && currentUser != null) {
			if (hasUserLikedArtwork(artwork, currentUser)) {
				artwork.setLikes(artwork.getLikes() - 1); // Decrement the number of likes
				artworkRepository.save(artwork); // Save the modified artwork
				return ResponseEntity.ok("Artwork disliked successfully.");
			} else {
				return ResponseEntity.ok("Artwork not liked by the user.");
			}
		} else {
			throw new NotFound("Artwork or User not found.");
		}
	}

	@GetMapping("/isliked/{artworkId}/{userId}")
	public ResponseEntity<Boolean> isLiked(@PathVariable UUID artworkId, @PathVariable UUID userId) throws NotFound {
		Artwork artwork = artworkService.findById(artworkId);
		User currentUser = userService.findById(userId);
		if (artwork != null && currentUser != null) {
			boolean isLiked = hasUserLikedArtwork(artwork, currentUser);
			return ResponseEntity.ok(isLiked);
		} else {
			throw new NotFound("Artwork or User not found.");
		}
	}

	@PostMapping("/{userId}")
	@ResponseStatus(HttpStatus.CREATED)
	public Artwork saveArtwork(@PathVariable UUID userId, @RequestBody Artwork artwork) {
		return artworkService.create(userId, artwork);
	}

	@GetMapping("{artworkId}")
	public Artwork getArtwork(@PathVariable UUID artworkId) throws NotFound {
		return artworkService.findById(artworkId);
	}

	@PutMapping("{userId}/{artworkId}")
	public Artwork updateArtwork(@PathVariable UUID userId, @PathVariable UUID artworkId,
			@RequestBody Artwork updatedArtwork) throws NotFound {
		return artworkService.findByIdAndUpdate(userId, artworkId, updatedArtwork);
	}

	@DeleteMapping("{artworkId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteArtwork(@PathVariable UUID artworkId) throws NotFound {
		artworkService.findByIdAndDelete(artworkId);
	}
}
