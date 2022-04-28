package com.baljc.db.repository;

import com.baljc.db.entity.Member;
import com.baljc.db.entity.Routine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface RoutineRepository extends JpaRepository<Routine, UUID> {
    List<Routine> findByMember(Member member);
}
