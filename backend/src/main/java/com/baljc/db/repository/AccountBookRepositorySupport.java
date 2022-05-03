package com.baljc.db.repository;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.QAccountBookDto_AccountBookDetailResponse;
import com.baljc.api.dto.QAccountBookDto_AccountBookMonth;
import com.baljc.api.dto.QAccountBookDto_AccountBookMonthTotal;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.QAccountBook;
import com.baljc.db.entity.QCategory;
import com.querydsl.core.types.ConstantImpl;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringTemplate;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
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

    public Optional<List<AccountBookDto.AccountBookMonthTotal>> getAccountBookMonthTotal(int year, int month, Member member) {
        int[] day = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String startDate = year + "-" + temp + "-01 00:00:00";
        String endDate = year + "-" + temp + "-" + day[month] + " 23:59:59";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

//        StringTemplate formattedDate = Expressions.stringTemplate(
//                "DATE_FORMAT({0}, {1})"
//                , qAccountBook.date
//                , ConstantImpl.create("%y-%m"));

        List<AccountBookDto.AccountBookMonthTotal> response = jpaQueryFactory.select(new QAccountBookDto_AccountBookMonthTotal(qAccountBook.type, qAccountBook.price.sum()))
                .from(qAccountBook)
                .groupBy(qAccountBook.type)
                .where(
                        qAccountBook.member.eq(member),
                        qAccountBook.date.goe(start),
                        qAccountBook.date.loe(end),
                        qAccountBook.deletedYn.eq('N'),
                        qAccountBook.fixedExpenditureYn.ne('Y').and(qAccountBook.fixedIncomeYn.ne('Y'))
                )
                .fetch();

        return Optional.ofNullable(response);
    }

    public Optional<List<AccountBookDto.AccountBookMonth>> getAccountBookMonthFixed(int year, int month, Member member) {
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String sDate = year + "-" + temp + "-15";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(sDate, formatter);

        List<AccountBookDto.AccountBookMonth> response = jpaQueryFactory.select(new QAccountBookDto_AccountBookMonth(qAccountBook.accountBookId, qAccountBook.type, qAccountBook.price, qCategory.imgUrl, qCategory.name, qAccountBook.title, qAccountBook.paymentMethod, qAccountBook.monthlyPeriod, qAccountBook.date, qAccountBook.fixedExpenditureYn, qAccountBook.fixedIncomeYn))
                .from(qAccountBook)
                .leftJoin(qCategory).on(qAccountBook.category.eq(qCategory))
                .where(
                        qAccountBook.member.eq(member),
                        qAccountBook.startDate.loe(date),
                        qAccountBook.endDate.goe(date),
                        qAccountBook.deletedYn.eq('N'),
                        qAccountBook.fixedExpenditureYn.eq('Y').or(qAccountBook.fixedIncomeYn.eq('Y'))
                )
                .fetch();

        return Optional.ofNullable(response);
    }

    public Optional<List<AccountBookDto.AccountBookMonth>> getAccountBookMonth(int year, int month, Member member) {
        int[] day = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String startDate = year + "-" + temp + "-01 00:00:00";
        String endDate = year + "-" + temp + "-" + day[month] + " 23:59:59";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        List<AccountBookDto.AccountBookMonth> response = jpaQueryFactory.select(new QAccountBookDto_AccountBookMonth(qAccountBook.accountBookId, qAccountBook.type, qAccountBook.price, qCategory.imgUrl, qCategory.name, qAccountBook.title, qAccountBook.paymentMethod, qAccountBook.monthlyPeriod, qAccountBook.date, qAccountBook.fixedExpenditureYn, qAccountBook.fixedIncomeYn))
                .from(qAccountBook)
                .leftJoin(qCategory).on(qAccountBook.category.eq(qCategory))
                .where(
                        qAccountBook.member.eq(member),
                        qAccountBook.date.goe(start),
                        qAccountBook.date.loe(end),
                        qAccountBook.deletedYn.eq('N'),
                        qAccountBook.fixedExpenditureYn.ne('Y').and(qAccountBook.fixedIncomeYn.ne('Y'))
                )
                .orderBy(qAccountBook.date.desc())
                .fetch();

        return Optional.ofNullable(response);
    }

    public Optional<List<AccountBookDto.AccountBookMonth>> getAccountBookDayFixed(int year, int month, int day, Member member) {
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String sDate = year + "-" + temp + "-15";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(sDate, formatter);

        List<AccountBookDto.AccountBookMonth> response = jpaQueryFactory.select(new QAccountBookDto_AccountBookMonth(qAccountBook.accountBookId, qAccountBook.type, qAccountBook.price, qCategory.imgUrl, qCategory.name, qAccountBook.title, qAccountBook.paymentMethod, qAccountBook.monthlyPeriod, qAccountBook.date, qAccountBook.fixedExpenditureYn, qAccountBook.fixedIncomeYn))
                .from(qAccountBook)
                .leftJoin(qCategory).on(qAccountBook.category.eq(qCategory))
                .where(
                        qAccountBook.member.eq(member),
                        qAccountBook.startDate.loe(date),
                        qAccountBook.endDate.goe(date),
                        qAccountBook.monthlyPeriod.eq(day),
                        qAccountBook.deletedYn.eq('N'),
                        qAccountBook.fixedExpenditureYn.eq('Y').or(qAccountBook.fixedIncomeYn.eq('Y'))
                )
                .fetch();

        return Optional.ofNullable(response);
    }

    public Optional<List<AccountBookDto.AccountBookMonth>> getAccountBookDay(int year, int month, int day, Member member) {
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String dayTemp = String.valueOf(day);
        if (dayTemp.length() == 1) {
            dayTemp = "0" + dayTemp;
        }
        String startDate = year + "-" + temp + "-" + dayTemp + " 00:00:00";
        String endDate = year + "-" + temp + "-" + dayTemp + " 23:59:59";
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        LocalDateTime start = LocalDateTime.parse(startDate, formatter);
        LocalDateTime end = LocalDateTime.parse(endDate, formatter);

        List<AccountBookDto.AccountBookMonth> response = jpaQueryFactory.select(new QAccountBookDto_AccountBookMonth(qAccountBook.accountBookId, qAccountBook.type, qAccountBook.price, qCategory.imgUrl, qCategory.name, qAccountBook.title, qAccountBook.paymentMethod, qAccountBook.monthlyPeriod, qAccountBook.date, qAccountBook.fixedExpenditureYn, qAccountBook.fixedIncomeYn))
                .from(qAccountBook)
                .leftJoin(qCategory).on(qAccountBook.category.eq(qCategory))
                .where(
                        qAccountBook.member.eq(member),
                        qAccountBook.date.goe(start),
                        qAccountBook.date.loe(end),
                        qAccountBook.deletedYn.eq('N'),
                        qAccountBook.fixedExpenditureYn.ne('Y').and(qAccountBook.fixedIncomeYn.ne('Y'))
                )
                .orderBy(qAccountBook.date.desc())
                .fetch();

        return Optional.ofNullable(response);
    }

}
