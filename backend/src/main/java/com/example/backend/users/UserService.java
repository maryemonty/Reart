package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.backend.exceptions.BadRequest;
import com.example.backend.exceptions.NotFound;
import com.example.backend.users.payloads.UserSignUp;

@Service
public class UserService {

	private final UserRepository userRepository;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public User createUser(UserSignUp userSignUp) {
		validateUniqueEmail(userSignUp.getEmail());
		validateUniqueUsername(userSignUp.getUsername());

		User newUser = new User(userSignUp.getUsername(), userSignUp.getName(), userSignUp.getSurname(),
				userSignUp.getEmail(), userSignUp.getPassword());
		newUser.setPropic("https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png");

		return userRepository.save(newUser);
	}

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public User getUser(String identifier) throws NotFound {
		return userRepository.findByUsernameOrEmail(identifier, identifier)
				.orElseThrow(() -> new NotFound("User not found"));
	}

	public User updateUser(String identifier, UserSignUp userSignUp) throws NotFound {
		User existingUser = getUser(identifier);
		existingUser.setUsername(userSignUp.getUsername());
		existingUser.setName(userSignUp.getName());
		existingUser.setSurname(userSignUp.getSurname());
		existingUser.setEmail(userSignUp.getEmail());
		existingUser.setPassword(userSignUp.getPassword());
		return userRepository.save(existingUser);
	}

	public void deleteUser(String identifier) throws NotFound {
		User user = getUser(identifier);
		userRepository.delete(user);
	}

	private void validateUniqueEmail(String email) {
		userRepository.findByEmail(email).ifPresent(user -> {
			throw new BadRequest("Email already in use");
		});
	}

	private void validateUniqueUsername(String username) {
		userRepository.findByUsername(username).ifPresent(user -> {
			throw new BadRequest("Username already in use");
		});
	}

	public User findByEmail(String email) throws NotFound {
		return userRepository.findByEmail(email).orElseThrow(() -> new NotFound("User not found"));
	}
}
