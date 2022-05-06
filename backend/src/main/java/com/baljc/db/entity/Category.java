package com.baljc.db.entity;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Category {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID categoryId;
    private Character type;
    private String name;
    private String imgUrl;

    @Builder
    public Category(Character type, String name, String imgUrl) {
        this.type = type;
        this.name = name;
        this.imgUrl = imgUrl;
    }

    @OneToMany(mappedBy = "category")
    List<AccountBook> accountBookList = new ArrayList<>();
}
