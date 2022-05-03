package com.baljc.db.repository;

import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AccountBookRepository extends JpaRepository<AccountBook, UUID> {
    List<AccountBook> findByMember(Member member);
}
