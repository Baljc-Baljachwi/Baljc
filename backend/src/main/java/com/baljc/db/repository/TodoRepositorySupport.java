package com.baljc.db.repository;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.QAccountBookDto_AccountBookMonth;
import com.baljc.api.dto.QTodoDto_TodoMonth;
import com.baljc.api.dto.TodoDto;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.QTodo;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Repository
public class TodoRepositorySupport {

    private final JPAQueryFactory jpaQueryFactory;
    QTodo qTodo = QTodo.todo;

    public Optional<List<TodoDto.TodoMonth>> getTodoMonthTotal(int year, int month, Member member) {
        int[] day = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String startDate = year + "-" + temp + "-01";
        String endDate = year + "-" + temp + "-" + day[month];
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<TodoDto.TodoMonth> response = jpaQueryFactory.select(new QTodoDto_TodoMonth(qTodo.date, qTodo.todoId.count()))
                .from(qTodo)
                .where(
                        qTodo.member.eq(member),
                        qTodo.date.goe(start),
                        qTodo.date.loe(end),
                        qTodo.deletedYn.eq('N')
                )
                .groupBy(qTodo.date)
                .fetch();

        return Optional.ofNullable(response);
    }

    public Optional<List<TodoDto.TodoMonth>> getTodoMonthCompleted(int year, int month, Member member) {
        int[] day = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String startDate = year + "-" + temp + "-01";
        String endDate = year + "-" + temp + "-" + day[month];
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate start = LocalDate.parse(startDate, formatter);
        LocalDate end = LocalDate.parse(endDate, formatter);

        List<TodoDto.TodoMonth> response = jpaQueryFactory.select(new QTodoDto_TodoMonth(qTodo.date, qTodo.todoId.count()))
                .from(qTodo)
                .where(
                        qTodo.member.eq(member),
                        qTodo.date.goe(start),
                        qTodo.date.loe(end),
                        qTodo.completedYn.eq('Y'),
                        qTodo.deletedYn.eq('N')
                )
                .groupBy(qTodo.date)
                .fetch();

        return Optional.ofNullable(response);
    }
}
