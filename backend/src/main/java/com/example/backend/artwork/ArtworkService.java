package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.exceptions.NotFound;
import com.example.backend.users.User;
import com.example.backend.users.UserRepository;

@Service
public class ArtworkService {

	private final ArtworkRepository artworkRepository;
	private final UserRepository userRepository;

	@Autowired
	public ArtworkService(ArtworkRepository artworkRepository, UserRepository userRepository) {
		this.artworkRepository = artworkRepository;
		this.userRepository = userRepository;
	}

	public User findByUserId(UUID id) throws NotFound {
		return userRepository.findById(id).orElseThrow(() -> new NotFound("User not found"));
	}

	public Artwork create(UUID userId, Artwork artwork) {
		User user = findByUserId(userId);
		Artwork newArtwork = new Artwork(artwork.getTitle(), artwork.getDescription(), artwork.getArt(),
				artwork.getCategory(), artwork.getPrice(), user);
		return artworkRepository.save(newArtwork);
	}

	public List<Artwork> find() {
		return artworkRepository.findAll();
	}

	public Artwork findById(UUID id) throws NotFound {
		return artworkRepository.findById(id).orElseThrow(() -> new NotFound("Artwork not found"));
	}

	public Artwork findByIdAndUpdate(UUID userId, UUID artworkId, Artwork updatedArtwork) throws NotFound {
		User user = findByUserId(userId);
		Artwork artwork = findById(artworkId);
		artwork.setTitle(updatedArtwork.getTitle());
		artwork.setDescription(updatedArtwork.getDescription());
		artwork.setArt(updatedArtwork.getArt());
		artwork.setCategory(updatedArtwork.getCategory());
		artwork.setUser(user);

		return artworkRepository.save(artwork);
	}

	public void findByIdAndDelete(UUID id) throws NotFound {
		Artwork artwork = findById(id);
		artworkRepository.delete(artwork);
	}
}
