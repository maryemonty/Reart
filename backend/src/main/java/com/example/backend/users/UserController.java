package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.users.payloads.UserRegistration;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

	@Autowired
	private UserService user;

	@GetMapping
	public List<User> getUsers() {
		return user.find();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User saveUser(@RequestBody @Validated UserRegistration body) {
		return user.create(body);
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable String username) throws Exception {
		return user.findByUsername(username);
	}

	@PutMapping("/{username}")
	public User updateUser(@PathVariable String username, @RequestBody @Validated UserRegistration body)
			throws Exception {
		return user.findByUsernameAndUpdate(username, body);
	}

	@DeleteMapping("/{username}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable String username) throws Exception {
		user.findyUsernameAndDelete(username);
	}

}
