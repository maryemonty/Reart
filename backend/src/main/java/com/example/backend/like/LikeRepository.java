package com.example.backend.like;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.backend.artwork.Artwork;
import com.example.backend.users.User;

@Repository
public interface LikeRepository extends JpaRepository<Like, UUID> {

	boolean existsByUserAndArtwork(User user, Artwork artwork);

	Optional<Like> findByUserAndArtwork(User user, Artwork artwork);

}
