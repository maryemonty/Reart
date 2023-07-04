package com.example.backend.users;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {
	Optional<User> findByUsername(String username);

	Optional<User> findByEmail(String email);

	Optional<User> findByUsernameOrEmail(String username, String email);

	Optional<User> findById(UUID id);

}
