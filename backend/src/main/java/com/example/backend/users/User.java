package com.example.backend.users;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;

@SuppressWarnings("serial")
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
public class User implements UserDetails {
	@Id
	private String username;
	private String name;
	private String surname;
	private String email;
	private String password;
	private String propic;
	@Enumerated(EnumType.STRING)
	private Role role;

	public User(String username, String name, String surname, String email, String password) {
		this.username = username;
		this.name = name;
		this.surname = surname;
		this.email = email;
		this.password = password;
		this.propic = getDefaultPropic();
		this.role = Role.USER;
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

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getUsername() {

		return this.username;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
}
