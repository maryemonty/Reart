package com.example.backend.auth;

import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.backend.exceptions.BadRequest;
import com.example.backend.users.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JWTools {

	private static String secret;
	private static int expiration;

	@Value("${spring.application.jwt.secret}")
	public void setSecret(String secretKey) {
		secret = secretKey;
	}

	@Value("${spring.application.jwt.expirationindays}")
	public void setExpiration(String expirationValue) {
		expiration = Integer.parseInt(expirationValue) * 24 * 60 * 60 * 1000;
	}

	static public String token(User u) {
		String token = Jwts.builder().setSubject(u.getEmail()).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + expiration))
				.signWith(Keys.hmacShaKeyFor(secret.getBytes())).compact();
		return token;
	}

	static public void tokenValid(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parse(token);
		} catch (Exception e) {
			throw new BadRequest("Session expired, login again");
		}
	}

	static public String extractSubject(String token) {
		return Jwts.parserBuilder().setSigningKey(Keys.hmacShaKeyFor(secret.getBytes())).build().parseClaimsJws(token)
				.getBody().getSubject();
	}

}
