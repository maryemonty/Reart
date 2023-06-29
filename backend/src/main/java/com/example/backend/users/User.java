package com.example.backend.users;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User {
	@Id
	private String username;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String propic;

	public User(String username, String name, String surname, String email, String password) {
		this.username = username;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.propic = getDefaultPropic();
	}

	public String getPropic() {
		return (propic != null && !propic.isEmpty()) ? propic : getDefaultPropic();
	}

	public void setPropic(String propic) {
		this.propic = (propic != null && !propic.isEmpty()) ? propic : getDefaultPropic();
	}

	private String getDefaultPropic() {
		return "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";
	}
}
