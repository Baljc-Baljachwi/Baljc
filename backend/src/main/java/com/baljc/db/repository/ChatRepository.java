package com.baljc.db.repository;

import com.baljc.db.entity.Chat;
import com.baljc.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ChatRepository extends JpaRepository<Chat, UUID> {
    List<Chat> findByRoom(Room room);
}
