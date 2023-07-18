package com.example.backend.artwork;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArtworkRepository extends JpaRepository<Artwork, UUID> {

	List<Artwork> findByTitleContaining(String title);
}
