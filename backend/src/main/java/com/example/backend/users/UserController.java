package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.exceptions.NotFound;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = { "http://localhost:3000", "blob:http://localhost:3000" })
public class UserController {

	private final UserService userService;

	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}

	@GetMapping
	public List<User> getUsers() {
		return userService.getUsers();
	}

	@GetMapping("/{identifier}")
	public User getUser(@PathVariable String identifier) throws NotFound {
		return userService.getUser(identifier);
	}

	@DeleteMapping("/{identifier}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable String identifier) throws NotFound {
		userService.deleteUser(identifier);
	}
}
