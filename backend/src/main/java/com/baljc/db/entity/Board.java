package com.baljc.db.entity;

import com.baljc.api.dto.BoardDto;
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
public class Board {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID boardId;
    private String content;
    private Double latitude;
    private Double longitude;
    private String dong;
    private Character deletedYn;
    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(targetEntity = BoardCategory.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "board_category_id")
    private BoardCategory boardCategory;

    @Builder
    public Board(String content, Double latitude, Double longitude, String dong, Character deletedYn, Member member, BoardCategory boardCategory) {
        this.content = content;
        this.latitude = latitude;
        this.longitude = longitude;
        this.dong = dong;
        this.deletedYn = deletedYn;
        this.member = member;
        this.boardCategory = boardCategory;
    }

    @OneToMany(mappedBy = "board")
    List<BoardImg> boardImgList = new ArrayList<>();
    @OneToMany(mappedBy = "board")
    List<Heart> heartList = new ArrayList<>();
    @OneToMany(mappedBy = "board")
    List<Scrap> scrapList = new ArrayList<>();
    @OneToMany(mappedBy = "board")
    List<Comment> commentList = new ArrayList<>();

    public void updateBoard(BoardDto.BoardUpdateRequest boardUpdateRequest, BoardCategory category) {
        this.content = boardUpdateRequest.getContent();
        this.boardCategory = category;
    }
}
