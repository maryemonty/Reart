package com.example.backend.users;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
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
	public List<User> getProfile() {
		List<User> users = userService.getUsers();
		List<User> profile = new ArrayList<>();

		for (User user : users) {
			User profileUser = new User();
			profileUser.setUsername(user.getUsername());
			profileUser.setName(user.getName());
			profileUser.setSurname(user.getSurname());
			profile.add(profileUser);
		}

		return profile;
	}

}
