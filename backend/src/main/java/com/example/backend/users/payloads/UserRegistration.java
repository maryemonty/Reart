package com.example.backend.users.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;

@Getter
public class UserRegistration {
	@NotNull(message = "Please enter a username")
	@Pattern(regexp = "[a-zA-Z0-9]+", message = "Please enter a valid alphanumeric username")
	String username;
	@NotNull(message = "Please enter a name")
	@Pattern(regexp = "[a-z]+", message = "Please enter a valid name")
	String name;
	@NotNull(message = "Please enter a surname")
	@Pattern(regexp = "[a-z]+", message = "Please enter a valid surname")
	@Size(max = 30, message = "Please enter a shorter username")
	String surname;
	@NotNull(message = "Please enter an email")
	@Email
	String email;
	@NotNull(message = "Please enter a password")
	@Size(min = 8, message = "Please enter a more secure password")
	String password;
}
