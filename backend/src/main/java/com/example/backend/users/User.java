package com.example.backend.users;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
	@Id
	@GeneratedValue
	private UUID id;
	private String name;
	private String surname;
	private String username;
	private String email;
	private String password;
	private String propic;
}
