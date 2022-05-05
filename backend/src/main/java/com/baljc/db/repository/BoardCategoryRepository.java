package com.baljc.db.repository;

import com.baljc.db.entity.BoardCategory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface BoardCategoryRepository extends JpaRepository<BoardCategory, UUID> {

}
