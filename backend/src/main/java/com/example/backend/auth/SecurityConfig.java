package com.example.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	@Autowired
	JWTFilter jwtFilter;

	@Autowired
	CorsFilter corsFilter;

	@Bean
	SecurityFilterChain security(HttpSecurity http) throws Exception {
		http.csrf(c -> c.disable());

		// l'endpoint users già di default richiede l'autenticazione
		// .authenticated(),
		// permitAll() don't //
		// need
		// authorization
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/like/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/users/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/profile/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/**").permitAll());
		http.authorizeHttpRequests(auth -> auth.requestMatchers("/artworks/**").permitAll());
		http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
		http.addFilterBefore(corsFilter, JWTFilter.class);
		// we don't need it because we use JWT
		http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		return http.build();
	}

	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder(10);
	}

}
