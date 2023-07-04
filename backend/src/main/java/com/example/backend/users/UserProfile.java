package com.example.backend.users;

import lombok.Data;

@Data
public class UserProfile {
	String username;
	String name;
	String surname;
	String propic;

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
