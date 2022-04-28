package com.baljc.db.repository;

import com.baljc.db.entity.AccountBook;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface AccountBookRepository extends JpaRepository<AccountBook, UUID> {


}
