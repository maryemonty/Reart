package com.example.backend.shop;

import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.notifications.NotificationsService;

@RestController
@RequestMapping("shop")
@CrossOrigin(origins = "http://localhost:3000")
public class ShopController {
	private final ShopService shopService;
	private final NotificationsService notificationsService;

	public ShopController(ShopService shopService, NotificationsService notificationsService) {
		this.shopService = shopService;
		this.notificationsService = notificationsService;
	}

	@GetMapping
	public List<Shop> getLikes() {
		return shopService.find();
	}

	@PostMapping("/{userId}/{artworkId}")
	@ResponseStatus(HttpStatus.CREATED)
	public Shop shop(@PathVariable UUID userId, @PathVariable UUID artworkId, Shop shop) {
		Shop shopped = shopService.buy(userId, artworkId, shop);
		return shopped;
	}
}
