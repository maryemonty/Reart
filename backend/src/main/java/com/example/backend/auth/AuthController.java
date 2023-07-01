package com.example.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.exceptions.BadRequest;
import com.example.backend.exceptions.NotFound;
import com.example.backend.users.User;
import com.example.backend.users.UserService;
import com.example.backend.users.payloads.UserAuth;
import com.example.backend.users.payloads.UserLogin;
import com.example.backend.users.payloads.UserSignUp;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

	private final UserService userService;
	private final PasswordEncoder bcrypt;

	@Autowired
	public AuthController(UserService userService, PasswordEncoder bcrypt) {
		this.userService = userService;
		this.bcrypt = bcrypt;
	}

	@PostMapping("/signup")
	public ResponseEntity<User> signup(@RequestBody @Validated UserSignUp body) {
		body.setPassword(bcrypt.encode(body.getPassword()));
		User createdUser = userService.createUser(body);
		return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
	}

	@PostMapping("/login")
	public ResponseEntity<UserAuth> login(@RequestBody UserLogin body) throws NotFound {
		User userLogIn = userService.findByEmail(body.getEmail());

		if (!bcrypt.matches(body.getPassword(), userLogIn.getPassword()))
			throw new BadRequest("Invalid credentials");

		String token = JWTools.token(userLogIn);
		return ResponseEntity.ok(new UserAuth(token));
	}
}
