package com.example.backend.users.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class UserSignUp {
	@NotNull(message = "Please enter a username")
	@Pattern(regexp = "[a-zA-Z0-9]+", message = "Please enter a valid alphanumeric username")
	private String username;

	@NotNull(message = "Please enter a name")
	@Pattern(regexp = "[a-z]+", message = "Please enter a valid name")
	private String name;

	@NotNull(message = "Please enter a surname")
	@Pattern(regexp = "[a-z]+", message = "Please enter a valid surname")
	@Size(max = 30, message = "Please enter a shorter username")
	private String surname;

	@NotNull(message = "Please enter an email")
	@Email
	private String email;

	@NotNull(message = "Please enter a password")
	@Size(min = 8, message = "Please enter a more secure password")
	private String password;
}
