package com.baljc.db.entity;

import com.baljc.api.dto.TodoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Todo {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID todoId;
    private LocalDate date;
    private String content;
    private Character completedYn;
    private Character deletedYn;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @Builder
    public Todo(LocalDate date, String content, Character completedYn, Character deletedYn, Member member) {
        this.date = date;
        this.content = content;
        this.completedYn = completedYn;
        this.deletedYn = deletedYn;
        this.member = member;
    }

    public void updateTodoContent(TodoDto.ContentRequest contentRequest) {
        this.content = contentRequest.getContent();
    }

    public void updateTodoYn(Character yn) {
        this.completedYn = yn;
    }

    public void deleteTodo() {
        this.deletedYn = 'Y';
    }
}
