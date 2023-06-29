package com.example.backend.exceptions;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ExceptionsMain {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<ErrorsPayload> handleValidationError(MethodArgumentNotValidException e) {
		List<String> errors = e.getBindingResult().getFieldErrors().stream().map(error -> error.getDefaultMessage())
				.collect(Collectors.toList());

		ErrorsPayload payload = new ErrorsPayload(errors.get(0), new Date(), 400);
		return new ResponseEntity<ErrorsPayload>(payload, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(BadRequest.class)
	public ResponseEntity<ErrorsPayload> handleBadRequest(BadRequest e) {
		ErrorsPayload payload = new ErrorsPayload(e.getMessage(), new Date(), 400);
		return new ResponseEntity<ErrorsPayload>(payload, HttpStatus.BAD_REQUEST);

	}

	@ExceptionHandler(NotFound.class)
	public ResponseEntity<ErrorsPayload> handleNotFound(NotFound e) {
		ErrorsPayload payload = new ErrorsPayload(e.getMessage(), new Date(), 404);
		return new ResponseEntity<ErrorsPayload>(payload, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorsPayload> handleGeneric(Exception e) {
		System.out.println(e);
		ErrorsPayload payload = new ErrorsPayload("Generic Error", new Date(), 500);
		return new ResponseEntity<ErrorsPayload>(payload, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
