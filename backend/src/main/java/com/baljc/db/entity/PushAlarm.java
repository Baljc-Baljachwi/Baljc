package com.baljc.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PushAlarm {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID pushAlarmId;
    private Character accountAlarmYn;
    private LocalTime accountAlarmTime;
    private Character todoAlarmYn;
    private LocalTime todoAlarmTime;

    @OneToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public PushAlarm(Character accountAlarmYn, LocalTime accountAlarmTime, Character todoAlarmYn, LocalTime todoAlarmTime, Member member) {
        this.accountAlarmYn = accountAlarmYn;
        this.accountAlarmTime = accountAlarmTime;
        this.todoAlarmYn = todoAlarmYn;
        this.todoAlarmTime = todoAlarmTime;
        this.member = member;
    }
}
