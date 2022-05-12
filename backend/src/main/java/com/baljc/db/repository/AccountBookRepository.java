package com.baljc.db.repository;

import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Board;
import com.baljc.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface AccountBookRepository extends JpaRepository<AccountBook, UUID> {
    List<AccountBook> findByMember(Member member);

    @Query("select ab from AccountBook ab where ab.deletedYn='N' and ab.accountBookId=:accountBookId")
    Optional<AccountBook> findById(@Param(value = "accountBookId") UUID accountBookId);
}
