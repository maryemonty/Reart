package com.example.backend.like;

import java.util.UUID;

import com.example.backend.artwork.Artwork;
import com.example.backend.notifications.Notifications;
import com.example.backend.users.User;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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
@Table(name = "likes")
@Data
@NoArgsConstructor
public class Like {

	@Id
	@GeneratedValue
	private UUID id;
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({ "user", "likes" })
	private User user;
	@ManyToOne
	@JoinColumn(name = "artwork_id")
	@JsonIgnoreProperties({ "user", "likes" })
	private Artwork artwork;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties({ "likes", "notify" })
	private Notifications notifications;

	public Like(UUID id, User user, Artwork artwork) {
		this.id = id;
		this.user = user;
		this.artwork = artwork;
	}
}
