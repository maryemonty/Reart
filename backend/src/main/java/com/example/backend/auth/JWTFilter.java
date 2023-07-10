package com.example.backend.auth;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.backend.exceptions.BadRequest;
import com.example.backend.exceptions.NotFound;
import com.example.backend.users.User;
import com.example.backend.users.UserService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JWTFilter extends OncePerRequestFilter {
	@Autowired
	UserService userService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {

		if (!request.getMethod().equalsIgnoreCase("OPTIONS")) {
			String header = request.getHeader("Authorization");
			if (header == null || !header.startsWith("Bearer "))
				throw new BadRequest("Please add the token at the header authorization");
			String tokenAccess = header.substring(7);

			JWTools.tokenValid(tokenAccess);

			String email = JWTools.extractSubject(tokenAccess);

			try {
				User user = userService.findByEmail(email);

				UsernamePasswordAuthenticationToken tokenAuth = new UsernamePasswordAuthenticationToken(user, null,
						user.getAuthorities());
				tokenAuth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(tokenAuth);

				filterChain.doFilter(request, response);
			} catch (NotFound e) {
				e.printStackTrace();
			}
		}
	}

	@Override
	protected boolean shouldNotFilter(HttpServletRequest request) {
		return new AntPathMatcher().match("/auth/**", request.getServletPath())
				|| new AntPathMatcher().match("/profile/**", request.getServletPath())
				|| new AntPathMatcher().match("/users/**", request.getServletPath());
	}

}
