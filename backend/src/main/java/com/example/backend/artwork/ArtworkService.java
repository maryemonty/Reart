package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ArtworkService {

	@Autowired
	private ArtworkRepository artworkRepository;

	public Artwork create(Artwork a) {
		return artworkRepository.save(a);
	}

	public List<Artwork> find() {
		return artworkRepository.findAll();
	}

	public Artwork findById(UUID id) throws Exception {
		return artworkRepository.findById(id).orElseThrow(() -> new Exception("artwork doesn't found"));
	}

	public Artwork findByIdAndUpdate(UUID id, Artwork a) throws Exception {
		Artwork artwork = this.findById(id);
		artwork.setId(id);
		artwork.setTitle(a.getTitle());
		artwork.setDescription(a.getDescription());
		artwork.setArt(a.getArt());
		artwork.setCategory(a.getCategory());
		artwork.setUser(a.getUser());

		return artworkRepository.save(artwork);
	}

	public void findByIdAndDelete(UUID id) throws Exception {
		Artwork artwork = this.findById(id);
		artworkRepository.delete(artwork);
	}
}
