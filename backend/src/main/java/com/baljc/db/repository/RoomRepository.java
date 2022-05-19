package com.baljc.db.repository;

import com.baljc.db.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.UUID;

public interface RoomRepository extends JpaRepository<Room, UUID> {
    @Query("select r from Room r where (member_id1=:memberId1 and member_id2=:memberId2) " +
            "or (member_id1=:memberId2 and member_id2=:memberId1)")
    Optional<Room> findByMembers(@Param("memberId1") UUID memberId1, @Param("memberId2") UUID memberId2);
}
