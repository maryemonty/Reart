package com.example.backend.notifications;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NotificationsRepository extends JpaRepository<Notifications, UUID> {
	List<Notifications> findByUserId(UUID userId);

	void deleteByLikeId(UUID likeId);
}
