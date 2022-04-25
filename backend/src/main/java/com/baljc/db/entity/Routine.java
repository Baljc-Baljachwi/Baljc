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
public class Routine {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID routineId;
    private String title;
    private String content;
    private Character repetition;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean deletedYn;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Routine(String title, String content, Character repetition, Boolean deletedYn) {
        this.title = title;
        this.content = content;
        this.repetition = repetition;
        this.deletedYn = deletedYn;
    }
}
