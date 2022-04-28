package com.baljc.db.repository;

import com.baljc.db.entity.PushAlarm;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface PushAlarmRepository extends JpaRepository<PushAlarm, UUID> {
}
