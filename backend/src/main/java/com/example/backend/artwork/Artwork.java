package com.example.backend.artwork;

import java.util.UUID;

import com.example.backend.users.User;

import jakarta.persistence.Entity;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	@Enumerated
	private Categories category;

	@ManyToOne
	@JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
	private User user;

	public Artwork(String title, String description, String art, Categories category, User user) {
		this.title = title;
		this.description = description;
		this.art = art;
		this.category = category;
		this.user = user;
	}
}
