package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.CalendarDto;
import com.baljc.api.dto.TodoDto;
import com.baljc.db.repository.AccountBookRepository;
import com.baljc.db.repository.AccountBookRepositorySupport;
import com.baljc.db.repository.TodoRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class CalendarServiceImpl implements CalendarService {

    private final MemberService memberService;
    private final AccountBookRepository accountBookRepository;
    private final AccountBookRepositorySupport accountBookRepositorySupport;
    private final TodoRepositorySupport todoRepositorySupport;

    @Override
    public CalendarDto.CalendarByMonthResponse getCalendarByMonth(int year, int month) {
        //월 전체 지출, 수입
        HashMap<String, Integer> monthTotalMap = new HashMap<>();
        monthTotalMap.put("E", 0);
        monthTotalMap.put("I", 0);

        TreeMap<String, HashMap<String, Integer>> calendarMonth = new TreeMap<>();

        List<AccountBookDto.AccountBookMonthTotal> totalList = accountBookRepositorySupport.getAccountBookMonthTotal(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 전체 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonthTotal accountBookMonthTotal : totalList) {
            monthTotalMap.put(Character.toString(accountBookMonthTotal.getType()), accountBookMonthTotal.getPrice());
        }

        List<AccountBookDto.AccountBookMonth> fixedList = accountBookRepositorySupport.getAccountBookMonthFixed(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 고정 지출, 고정 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookMonthFixed : fixedList) {
            monthTotalMap.put(Character.toString(accountBookMonthFixed.getType()),
                    monthTotalMap.get(Character.toString(accountBookMonthFixed.getType())) + accountBookMonthFixed.getPrice());

            HashMap<String, Integer> map = new HashMap<>();
            if (calendarMonth.containsKey(year + "-" + month + "-" + accountBookMonthFixed.getMonthlyPeriod())) {
                map = calendarMonth.get(year + "-" + month + "-" + accountBookMonthFixed.getMonthlyPeriod());
            }

            if (accountBookMonthFixed.getType() == 'E') {
                map.put("E", map.getOrDefault("E", 0) + accountBookMonthFixed.getPrice());
            } else {
                map.put("I", map.getOrDefault("I", 0) + accountBookMonthFixed.getPrice());
            }

            calendarMonth.put(year + "-" + month + "-" + accountBookMonthFixed.getMonthlyPeriod(), map);
        }

        List<AccountBookDto.AccountBookMonth> monthList = accountBookRepositorySupport.getAccountBookMonth(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookMonth : monthList) {
            List<AccountBookDto.AccountBookMonth> temp = new ArrayList<>();
            int day = Integer.parseInt(accountBookMonth.getDate().toString().substring(8, 10));

            HashMap<String, Integer> map = new HashMap<>();
            if (calendarMonth.containsKey(year + "-" + month + "-" + day)) {
                map = calendarMonth.get(year + "-" + month + "-" + day);
            }

            if (accountBookMonth.getType() == 'E') {
                map.put("E", map.getOrDefault("E", 0) + accountBookMonth.getPrice());
            } else {
                map.put("I", map.getOrDefault("I", 0) + accountBookMonth.getPrice());
            }

            calendarMonth.put(year + "-" + month + "-" + day, map);
        }

        //발도장
        HashMap<String, Long> todoMap = new HashMap<>();
        List<TodoDto.TodoMonth> todoAllList = todoRepositorySupport.getTodoMonthTotal(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 할 일이 존재하지 않습니다."));
        for (TodoDto.TodoMonth todoAll : todoAllList) {
            todoMap.put(todoAll.getDate().toString(), todoAll.getCount());
        }

        List<TodoDto.TodoMonth> todoCompletedList = todoRepositorySupport.getTodoMonthCompleted(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 할 일 중 한 일이 존재하지 않습니다."));
        for (TodoDto.TodoMonth todoCompleted : todoCompletedList) {
            if (todoMap.get(todoCompleted.getDate().toString()) == todoCompleted.getCount()) {
                HashMap<String, Integer> map = new HashMap<>();
                if (calendarMonth.containsKey(todoCompleted.getDate().toString())) {
                    map = calendarMonth.get(todoCompleted.getDate().toString());
                }
                map.put("A", 1);
                calendarMonth.put(todoCompleted.getDate().toString(), map);
            }
        }

        CalendarDto.CalendarByMonthResponse response = new CalendarDto.CalendarByMonthResponse(monthTotalMap, calendarMonth);
        return response;
    }
}
