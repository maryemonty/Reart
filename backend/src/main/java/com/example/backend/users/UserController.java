package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

//	@PostMapping("/login")
//	public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
//		if (checkCredentials(loginRequest.getEmail(), loginRequest.getPassword())) {
//
//			return null;
//		} else {
//			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
//		}
//	}
//
//	private boolean checkCredentials(String email, String password) {
//		List<User> users = userService.getAllUsers();
//		for (User user : users) {
//			if (user.getEmail().equals(email) && user.getPassword().equals(password)) {
//				return true;
//			}
//		}
//		return false;
//	}

	@Autowired
	private UserService user;

	@GetMapping
	public List<User> getUsers() {
		return user.find();
	}

	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public User saveUser(@RequestBody User body) {
		return user.create(body);
	}

	@GetMapping("/{username}")
	public User getUser(@PathVariable String username) throws Exception {
		return user.findByUsername(username);
	}

	@PutMapping("/{username}")
	public User updateUser(@PathVariable String username, @RequestBody User body) throws Exception {
		return user.findByUsernameAndUpdate(username, body);
	}

	@DeleteMapping("/{username}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	public void deleteUser(@PathVariable String username) throws Exception {
		user.findyUsernameAndDelete(username);
	}

}
