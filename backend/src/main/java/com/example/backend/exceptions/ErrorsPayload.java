package com.example.backend.exceptions;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ErrorsPayload {
	private String message;
	private Date timestamp;
	private int internalCode;
}
