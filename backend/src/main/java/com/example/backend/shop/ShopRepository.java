package com.example.backend.shop;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShopRepository extends JpaRepository<Shop, UUID> {

	List<Shop> findByArtworkId(UUID artworkId);

}
