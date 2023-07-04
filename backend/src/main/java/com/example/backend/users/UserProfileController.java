package com.example.backend.users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
@CrossOrigin(origins = "http://localhost:3000")
public class UserProfileController {

	private final UserService userService;

	@Autowired
	public UserProfileController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping("")
	public List<UserProfile> getProfile() {
		List<User> users = userService.getUsers();
		List<UserProfile> profile = new ArrayList<>();

		for (User user : users) {
			UserProfile profileUser = new UserProfile();
			profileUser.setUsername(user.getUsername());
			profileUser.setName(user.getName());
			profileUser.setSurname(user.getSurname());
			profile.add(profileUser);
		}

		return profile;
	}

	@GetMapping("/{username}")
	public UserProfile getUser(@PathVariable String username) {
		User user = userService.getUser(username);
		UserProfile profileUser = new UserProfile();
		profileUser.setUsername(user.getUsername());
		profileUser.setName(user.getName());
		profileUser.setSurname(user.getSurname());
		return profileUser;
	}

}
