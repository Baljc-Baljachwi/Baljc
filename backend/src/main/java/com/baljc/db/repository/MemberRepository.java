package com.baljc.db.repository;

import com.baljc.db.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.Optional;
import java.util.UUID;

public interface MemberRepository extends JpaRepository<Member, UUID> {
    Optional<Member> findByKakaoId(String kakaoId);

    @Query("select m from Member m where m.deletedAt IS NULL and m.memberId=:memberId")
    Optional<Member> findById(@Param(value = "memberId") UUID memberId);
}
