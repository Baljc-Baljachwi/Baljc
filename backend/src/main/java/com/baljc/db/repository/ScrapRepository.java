package com.baljc.db.repository;

import com.baljc.db.entity.Board;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface ScrapRepository extends JpaRepository<Scrap, UUID> {
    Optional<Scrap> findByMemberAndBoard(Member member, Board board);
}
