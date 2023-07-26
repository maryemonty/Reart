package com.example.backend.shop;

import java.util.UUID;

import com.example.backend.artwork.Artwork;
import com.example.backend.users.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "shop")
@Data
@NoArgsConstructor
public class Shop {

	@Id
	@GeneratedValue
	private UUID id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({ "user", "shop" })
	private User user;
	@OneToOne
	@JoinColumn(name = "artwork_id")
	@JsonIgnore
	private Artwork artwork;

	public Shop(UUID id, User user, Artwork artwork) {
		this.id = id;
		this.user = user;
		this.artwork = artwork;
	}

}
