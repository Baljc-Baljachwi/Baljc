package com.baljc.db.entity;

import com.baljc.common.util.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalTime;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class PushAlarm {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID pushAlarmId;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean accountAlarmYn;
    @ColumnDefault("'09:00:00'")
    private LocalTime accountAlarmTime;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean todoAlarmYn;
    @ColumnDefault("'09:00:00'")
    private LocalTime todoAlarmTime;

    @OneToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public PushAlarm(Boolean accountAlarmYn, LocalTime accountAlarmTime, Boolean todoAlarmYn, LocalTime todoAlarmTime, Member member) {
        this.accountAlarmYn = accountAlarmYn;
        this.accountAlarmTime = accountAlarmTime;
        this.todoAlarmYn = todoAlarmYn;
        this.todoAlarmTime = todoAlarmTime;
        this.member = member;
    }
}
