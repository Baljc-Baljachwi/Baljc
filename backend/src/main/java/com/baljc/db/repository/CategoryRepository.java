package com.baljc.db.repository;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.db.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Optional<List<Category>> findByType(Character type);
}
