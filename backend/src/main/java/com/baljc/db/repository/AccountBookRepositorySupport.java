package com.baljc.db.repository;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.QAccountBookDto_AccountBookDetailResponse;
import com.baljc.api.dto.QAccountBookDto_AccountBookMonthTotal;
import com.baljc.db.entity.QAccountBook;
import com.baljc.db.entity.QCategory;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Repository
public class AccountBookRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QAccountBook qAccountBook = QAccountBook.accountBook;
    QCategory qCategory = QCategory.category;

    public Optional<AccountBookDto.AccountBookDetailResponse> getAccountBookDetail(UUID accountbookId) {
        AccountBookDto.AccountBookDetailResponse response = jpaQueryFactory.select(new QAccountBookDto_AccountBookDetailResponse(qAccountBook.accountBookId, qCategory.categoryId, qCategory.name, qAccountBook.type, qAccountBook.title, qAccountBook.price, qAccountBook.memo, qAccountBook.paymentMethod, qAccountBook.fixedExpenditureYn, qAccountBook.fixedIncomeYn, qAccountBook.monthlyPeriod, qAccountBook.date, qAccountBook.startDate, qAccountBook.endDate))
                .from(qAccountBook)
                .leftJoin(qCategory).on(qAccountBook.category.eq(qCategory))
                .where(qAccountBook.accountBookId.eq(accountbookId))
                .fetchOne();

        return Optional.ofNullable(response);
    }

}
