package com.baljc.db.entity;

import com.baljc.common.util.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
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
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean accountAlarmYn;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean routineAlarmYn;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean todoAlarmYn;

    @OneToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public PushAlarm(Boolean accountAlarmYn, Boolean routineAlarmYn, Boolean todoAlarmYn) {
        this.accountAlarmYn = accountAlarmYn;
        this.routineAlarmYn = routineAlarmYn;
        this.todoAlarmYn = todoAlarmYn;
    }
}
