package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.users.payloads.UserSignUp;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
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
	public User getUser(@PathVariable String identifier) {
		return userService.getUser(identifier);
	}

	@PutMapping("/{identifier}")
	public User updateUser(@PathVariable String identifier, @RequestBody @Validated UserSignUp body) {
		return userService.updateUser(identifier, body);
	}

	@DeleteMapping("/{identifier}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable String identifier) {
		userService.deleteUser(identifier);
	}
}
