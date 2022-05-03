package com.baljc.db.repository;

import com.baljc.db.entity.Member;
import com.baljc.db.entity.PushAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface PushAlarmRepository extends JpaRepository<PushAlarm, UUID> {
    Optional<PushAlarm> findByMember(Member member);
}
