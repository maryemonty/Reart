package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import com.example.backend.like.Like;
import com.example.backend.notifications.Notifications;
import com.example.backend.shop.Shop;
import com.example.backend.users.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "artworks")
@Data
@NoArgsConstructor
public class Artwork {

	@Id
	@GeneratedValue
	private UUID id;
	private String title;
	private String description;
	private String art;
	private String price;
	private int likeCount;
	@Enumerated
	private Categories category;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({ "artworks", "likes", "notify" })
	private User user;

	@OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "user", "artwork", "notifications" })
	private List<Like> likes;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "artwork", "notify", "user" })
	private Notifications notifications;

	@OneToMany(mappedBy = "artwork", cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "artwork", "shop" })
	private List<Shop> shop;

	public Artwork(String title, String description, String art, Categories category, String price, User user,
			int likeCount) {
		this.title = title;
		this.description = description;
		this.art = art;
		this.category = category;
		this.price = price;
		this.user = user;
		this.likeCount = likeCount;

	}

}
