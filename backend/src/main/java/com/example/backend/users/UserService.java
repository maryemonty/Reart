package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.exceptions.BadRequest;
import com.example.backend.exceptions.NotFound;
import com.example.backend.users.payloads.UserRegistration;

@Service
public class UserService {

	@Autowired
	private UserRepository users;

	public User create(UserRegistration u) {

		// check if email already exist
		users.findByEmail(u.getEmail()).ifPresent(user -> {
			throw new BadRequest("Email already in use");
		});

		// check if email already exist
		users.findByUsername(u.getUsername()).ifPresent(user -> {
			throw new BadRequest("Username already in use");
		});

		User validationUser = new User(u.getUsername(), u.getName(), u.getSurname(), u.getEmail(), u.getPassword());

		return users.save(validationUser);
	}

	public List<User> find() {
		return users.findAll();
	}

	public User findByUsername(String username) throws NotFound {
		return users.findByUsername(username).orElseThrow(() -> new NotFound("User not found"));
	}

	public User findByUsernameAndUpdate(String username, UserRegistration u) throws Exception {
		User found = this.findByUsername(username);

		found.setUsername(u.getUsername());
		found.setName(u.getName());
		found.setSurname(u.getSurname());
		found.setEmail(u.getEmail());
		found.setPassword(u.getPassword());
		found.setPropic("https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");

		return users.save(found);
	}

	public void findyUsernameAndDelete(String username) throws NotFound {
		User found = this.findByUsername(username);
		users.delete(found);
	}
}
