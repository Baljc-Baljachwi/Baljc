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
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
@DynamicInsert
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class AccountBook {
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(columnDefinition = "BINARY(16)")
    private UUID accountBookId;
    private Character type;
    private String title;
    private Integer price;
    private String memo;
    private Character paymentMethod;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean fixedExpenditureYn;
    @Convert(converter = BooleanToYNConverter.class)
    private Boolean fixedIncomeYn;
    private Character periodType;
    private Integer monthlyPeriod;
    private Integer weeklyPeriod;
    @Convert(converter = BooleanToYNConverter.class)
    @ColumnDefault("false")
    private Boolean deletedYn;
    private LocalDateTime date;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Builder
    public AccountBook(Character type, String title, Integer price, String memo, Character paymentMethod,
                       Boolean fixedExpenditureYn, Boolean fixedIncomeYn, Character periodType,
                       Integer monthlyPeriod, Integer weeklyPeriod, Boolean deletedYn, LocalDateTime date,
                       Member member, Category category) {
        this.type = type;
        this.title = title;
        this.price = price;
        this.memo = memo;
        this.paymentMethod = paymentMethod;
        this.fixedExpenditureYn = fixedExpenditureYn;
        this.fixedIncomeYn = fixedIncomeYn;
        this.periodType = periodType;
        this.monthlyPeriod = monthlyPeriod;
        this.weeklyPeriod = weeklyPeriod;
        this.deletedYn = deletedYn;
        this.date = date;
        this.member = member;
        this.category = category;
    }
}
