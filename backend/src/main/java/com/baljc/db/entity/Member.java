package com.baljc.db.entity;

import com.baljc.api.dto.MemberDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.annotation.CreatedDate;
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
    private String fcmToken;
    private String email;
    private String nickname;
    private String profileUrl;
    private Character salaryType;
    private Integer salary;
    private Integer workingHours;
    private Integer budget;
    private Character surveyedYn;
    private LocalDateTime deletedAt;
    private Double latitude;
    private Double longitude;
    private String depth1;
    private String depth2;
    private String depth3;
    private String refreshToken;
    @CreatedDate
    private LocalDateTime createdAt;

    @Builder
    public Member(String kakaoId, String fcmToken, String email, String nickname, String profileUrl,
                  Character salaryType, Integer salary, Integer workingHours, Integer budget,
                  Character surveyedYn, LocalDateTime deletedAt, Double latitude, Double longitude,
                  String depth1, String depth2, String depth3, String refreshToken) {
        this.kakaoId = kakaoId;
        this.fcmToken = fcmToken;
        this.email = email;
        this.nickname = nickname;
        this.profileUrl = profileUrl;
        this.salaryType = salaryType;
        this.salary = salary;
        this.workingHours = workingHours;
        this.budget = budget;
        this.surveyedYn = surveyedYn;
        this.deletedAt = deletedAt;
        this.latitude = latitude;
        this.longitude = longitude;
        this.depth1 = depth1;
        this.depth2 = depth2;
        this.depth3 = depth3;
        this.refreshToken = refreshToken;
    }

    @OneToMany(mappedBy = "member")
    List<AccountBook> accountBookList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Routine> routineList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Todo> todoList = new ArrayList<>();
    @OneToOne(mappedBy = "member")
    PushAlarm pushAlarm;
    @OneToMany(mappedBy = "member")
    List<Board> boardList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Heart> heartList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Scrap> scrapList = new ArrayList<>();
    @OneToMany(mappedBy = "member")
    List<Comment> commentList = new ArrayList<>();
    @OneToMany(mappedBy = "member1")
    List<Room> roomList1 = new ArrayList<>();
    @OneToMany(mappedBy = "member2")
    List<Room> roomList2 = new ArrayList<>();

    public void argsNullSetter() {
        this.kakaoId = null;
        this.fcmToken = null;
        this.email = null;
        this.nickname = null;
        this.profileUrl = null;
        this.salaryType = null;
        this.salary = null;
        this.workingHours = null;
        this.budget = null;
        this.surveyedYn = null;
        this.latitude = null;
        this.longitude = null;
        this.depth1 = null;
        this.depth2 = null;
        this.depth3 = null;
        this.refreshToken = null;
        this.createdAt = null;
        this.deletedAt = LocalDateTime.now();
    }

    public void updateInfo(MemberDto.RegisterRequest registerRequest) {
        this.nickname = registerRequest.getNickname();
        this.salaryType = registerRequest.getSalaryType().charAt(0);
        this.salary = registerRequest.getSalary();
        this.workingHours = registerRequest.getWorkingHours();
        this.budget = registerRequest.getBudget();
        this.latitude = registerRequest.getLatitude();
        this.longitude = registerRequest.getLongitude();
        this.depth1 = registerRequest.getDepth1();
        this.depth2 = registerRequest.getDepth2();
        this.depth3 = registerRequest.getDepth3();
        if (this.surveyedYn == 'N') this.surveyedYn = 'Y';
    }

    public void updateProfileUrl(String profileUrl) { this.profileUrl = profileUrl; }

    public void updateFcmToken(String fcmToken) { this.fcmToken = fcmToken; }

    public void updateRefreshToken(String refreshToken) { this.refreshToken = refreshToken; }
}
