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
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("artworks")
public class ArtworkController {

	@Autowired
	private ArtworkService artworkService;

	@GetMapping()
	public List<Artwork> getArtworks() {
		return artworkService.find();
	};

	@PostMapping("")
	@ResponseStatus(HttpStatus.CREATED)
	public Artwork saveArtwork(@RequestBody Artwork body) {
		return artworkService.create(body);
	}

	@GetMapping("{artworkId}")
	public Artwork getArtwork(@PathVariable UUID artworkId) throws Exception {
		return artworkService.findById(artworkId);
	}

	@PutMapping("{artworkId}")
	public Artwork updateArtwork(@PathVariable UUID artworkId, @RequestBody Artwork body) throws Exception {
		return artworkService.findByIdAndUpdate(artworkId, body);
	}

	@DeleteMapping("{artworkId}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteArtwork(@PathVariable UUID artworkId) throws Exception {
		artworkService.findByIdAndDelete(artworkId);
	}
}
