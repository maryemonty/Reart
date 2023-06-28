package com.example.backend.users;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	@Autowired
	private UserRepository users;

	public User create(User u) {

		// TODO check if email and username already exist
		return users.save(u);
	}

	public List<User> find() {
		return users.findAll();
	}

	public User findByUsername(String username) throws Exception {
		return users.findByUsername(username).orElseThrow(() -> new Exception("Utente non trovato"));
	}

	public User findByUsernameAndUpdate(String username, User u) throws Exception {
		User found = this.findByUsername(username);

		found.setUsername(u.getUsername());
		found.setName(u.getName());
		found.setSurname(u.getSurname());
		found.setEmail(u.getEmail());
		found.setPassword(u.getPassword());
		found.setPropic(u.getPropic());

		return users.save(found);
	}

	public void findyUsernameAndDelete(String username) throws Exception {
		User found = this.findByUsername(username);
		users.delete(found);
	}
}
