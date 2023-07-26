package com.example.backend.shop;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.artwork.Artwork;
import com.example.backend.artwork.ArtworkRepository;
import com.example.backend.exceptions.NotFound;
import com.example.backend.users.User;
import com.example.backend.users.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class ShopService {

	private final ArtworkRepository artworkRepository;
	private final UserRepository userRepository;
	private final ShopRepository shopRepository;

	@Autowired
	public ShopService(ArtworkRepository artworkRepository, UserRepository userRepository,
			ShopRepository shopRepository) {
		this.artworkRepository = artworkRepository;
		this.userRepository = userRepository;
		this.shopRepository = shopRepository;
		;
	}

	public User findByUserId(UUID id) throws NotFound {
		return userRepository.findById(id).orElseThrow(() -> new NotFound("User not found"));
	}

	public Artwork findByArtworkId(UUID id) throws NotFound {
		return artworkRepository.findById(id).orElseThrow(() -> new NotFound("Artwork not found"));
	}

	public Shop buy(UUID userId, UUID artworkId, Shop shop) {
		User user = findByUserId(userId);
		Artwork artwork = findByArtworkId(artworkId);
		Shop newShop = new Shop(shop.getId(), user, artwork);
		return shopRepository.save(newShop);
	}

	public List<Shop> find() {
		return shopRepository.findAll();
	}

	@Transactional
	public void deleteShopByArtworkId(UUID artworkId) {
		List<Shop> shops = shopRepository.findByArtworkId(artworkId);
		shopRepository.deleteAll(shops);
	}

}
