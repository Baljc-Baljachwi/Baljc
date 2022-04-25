package com.baljc.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID memberId;
    private String kakaoId;
    private String email;
    private String nickname;
    private String profileUrl;
    private Character salaryType;
    private Integer salary;
    private Integer budget;
    @LastModifiedDate
    private LocalDateTime deletedAt;

    @Builder
    public Member(String kakaoId, String email, String nickname, String profileUrl, Character salaryType,
                  Integer salary, Integer budget) {
        this.kakaoId = kakaoId;
        this.email = email;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.salaryType = salaryType;
        this.salary = salary;
        this.budget = budget;
    }

    @OneToMany(mappedBy = "member")
    List<AccountBook> accountBookList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Routine> routineList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Todo> todoList = new ArrayList<>();
    @OneToOne(mappedBy = "member")
    PushAlarm pushAlarm;
}
