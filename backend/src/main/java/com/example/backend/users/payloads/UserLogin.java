package com.example.backend.users.payloads;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class UserLogin {
	@NotNull(message = "Please enter an email")
	String email;
	@NotNull(message = "Please enter a password")
	String password;
}
