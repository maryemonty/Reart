package com.example.backend.users;

import java.util.List;
import java.util.UUID;

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
		User user = userRepository.findByUsernameOrEmail(identifier, identifier)
				.orElseThrow(() -> new NotFound("User not found"));
		return user;
	}

	public User registerUser(String identifier, UserSignUp userSignUp) throws NotFound {
		User signupUser = getUser(identifier);
		signupUser.setUsername(userSignUp.getUsername());
		signupUser.setName(userSignUp.getName());
		signupUser.setSurname(userSignUp.getSurname());
		signupUser.setEmail(userSignUp.getEmail());
		signupUser.setPassword(userSignUp.getPassword());
		return userRepository.save(signupUser);
	}

	public void deleteUser(String identifier) throws NotFound {
		User user = getUser(identifier);
		userRepository.delete(user);
	}

	public void validateUniqueEmail(String email) {
		userRepository.findByEmail(email).ifPresent(user -> {
			throw new BadRequest("Email already in use");
		});
	}

	public void validateUniqueUsername(String username) {
		userRepository.findByUsername(username).ifPresent(user -> {
			throw new BadRequest("Username already in use");
		});
	}

	public User findByEmail(String email) throws NotFound {
		return userRepository.findByEmail(email).orElseThrow(() -> new NotFound("User not found"));
	}

	public User updateUser(UUID id, User existingUser) {
		User update = findById(id);
		update.setUsername(existingUser.getUsername());
		update.setName(existingUser.getName());
		update.setSurname(existingUser.getSurname());
		update.setEmail(existingUser.getEmail());
		update.setPassword(existingUser.getPassword());
		return userRepository.save(update);
	}

	public User findById(UUID id) {
		return userRepository.findById(id).orElseThrow(() -> new NotFound("User not found"));
	}

}
