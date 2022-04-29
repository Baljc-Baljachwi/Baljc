package com.baljc.db.entity;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.common.util.BooleanToYNConverter;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@EntityListeners(AuditingEntityListener.class)
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
    private Character fixedExpenditureYn;
    private Character fixedIncomeYn;
    private Integer monthlyPeriod;
    private Character deletedYn;
    private LocalDateTime date;
    private LocalDate startDate;
    private LocalDate endDate;

    @ManyToOne(targetEntity = Member.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;
    @ManyToOne(targetEntity = Category.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Builder
    public AccountBook(Character type, String title, Integer price, String memo, Character paymentMethod,
                       Character fixedExpenditureYn, Character fixedIncomeYn,
                       Integer monthlyPeriod, Character deletedYn, LocalDateTime date,
                       LocalDate startDate, LocalDate endDate,
                       Member member, Category category) {
        this.type = type;
        this.title = title;
        this.price = price;
        this.memo = memo;
        this.paymentMethod = paymentMethod;
        this.fixedExpenditureYn = fixedExpenditureYn;
        this.fixedIncomeYn = fixedIncomeYn;
        this.monthlyPeriod = monthlyPeriod;
        this.deletedYn = deletedYn;
        this.date = date;
        this.startDate = startDate;
        this.endDate = endDate;
        this.member = member;
        this.category = category;
    }

    public void updateAccontBook(AccountBookDto.AccountBookRequest accountBookRequest, Category category) {
        LocalDateTime localDateTime = null;
        if (accountBookRequest.getDate() != null && accountBookRequest.getTime() != null) {
            localDateTime = LocalDateTime.of(accountBookRequest.getDate(), accountBookRequest.getTime());
        }

        this.type = accountBookRequest.getType().charAt(0);
        this.title = accountBookRequest.getTitle();
        this.price = accountBookRequest.getPrice();
        this.memo = accountBookRequest.getMemo();
        this.paymentMethod = accountBookRequest.getPaymentMethod().charAt(0);
        this.fixedExpenditureYn = accountBookRequest.getFixedExpenditureYn().charAt(0);
        this.fixedIncomeYn = accountBookRequest.getFixedIncomeYn().charAt(0);
        this.monthlyPeriod = accountBookRequest.getMonthlyPeriod();
        this.date = localDateTime;
        this.startDate = accountBookRequest.getStartDate();
        this.endDate = accountBookRequest.getEndDate();
        this.category = category;
    }

    public void deleteAccountBook() {
        this.deletedYn = 'Y';
    }
}
