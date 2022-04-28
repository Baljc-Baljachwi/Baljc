package com.baljc.db.repository;

import com.baljc.db.entity.Member;
import com.baljc.db.entity.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface TodoRepository extends JpaRepository<Todo, UUID> {
    List<Todo> findByMember(Member member);
}
