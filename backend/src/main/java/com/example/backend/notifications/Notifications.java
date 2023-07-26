package com.example.backend.notifications;

import java.util.UUID;

import com.example.backend.like.Like;
import com.example.backend.users.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Table(name = "notifications")
@Data
@NoArgsConstructor
public class Notifications {

	@Id
	@GeneratedValue
	private UUID id;
	private String message;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({ "notifications", "notify" })
	private User user;

	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnore
	private Like like;

	public Notifications(String message, User user, Like like) {
		this.message = message;
		this.user = user;
		this.like = like;
	}
}
