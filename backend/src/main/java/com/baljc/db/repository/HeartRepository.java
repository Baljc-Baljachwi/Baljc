package com.baljc.db.repository;

import com.baljc.db.entity.Board;
import com.baljc.db.entity.Heart;
import com.baljc.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface HeartRepository extends JpaRepository<Heart, UUID> {
    Optional<Heart> findByMemberAndBoard(Member member, Board board);
}
