package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.exceptions.NotFound;

@RestController
@RequestMapping("artworks")
public class ArtworkController {

	private final ArtworkService artworkService;

	@Autowired
	public ArtworkController(ArtworkService artworkService) {
		this.artworkService = artworkService;
	}

	@GetMapping
	public List<Artwork> getArtworks() throws NotFound {
		return artworkService.find();
	}

	@GetMapping("/search")
	public List<Artwork> findByTitle(@RequestParam("q") @PathVariable String title) throws NotFound {
		return artworkService.findByTitle(title);
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
