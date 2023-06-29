package com.example.backend.exceptions;

public class BadRequest extends RuntimeException {
	public BadRequest(String message) {
		super(message);
	}

}
