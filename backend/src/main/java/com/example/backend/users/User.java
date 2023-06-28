package com.example.backend.users;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
	@Id
	private String username;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String propic;

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPropic() {
		return propic;
	}

	public void setPropic(String propic) {
		if (propic == null || propic.isEmpty() || propic.equals("null")) {
			this.propic = "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png";
		} else {
			this.propic = propic;
		}
	}
}
