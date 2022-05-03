package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.dto.CalendarDto;
import com.baljc.api.dto.RoutineDto;
import com.baljc.api.dto.TodoDto;
import com.baljc.db.repository.AccountBookRepository;
import com.baljc.db.repository.AccountBookRepositorySupport;
import com.baljc.db.repository.TodoRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class CalendarServiceImpl implements CalendarService {

    private final MemberService memberService;
    private final RoutineService routineService;
    private final TodoService todoService;
    private final AccountBookRepository accountBookRepository;
    private final AccountBookRepositorySupport accountBookRepositorySupport;
    private final TodoRepositorySupport todoRepositorySupport;

    @Override
    public CalendarDto.CalendarByMonthResponse getCalendarByMonth(int year, int month) {
        int[] days = {0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        String monthTemp = String.valueOf(month);
        if (monthTemp.length() == 1) {
            monthTemp = "0" + monthTemp;
        }

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
            if (calendarMonth.containsKey(year + "-" + monthTemp + "-" + accountBookMonthFixed.getMonthlyPeriod())) {
                map = calendarMonth.get(year + "-" + monthTemp + "-" + accountBookMonthFixed.getMonthlyPeriod());
            }

            if (accountBookMonthFixed.getType() == 'E') {
                map.put("E", map.getOrDefault("E", 0) + accountBookMonthFixed.getPrice());
            } else {
                map.put("I", map.getOrDefault("I", 0) + accountBookMonthFixed.getPrice());
            }

            calendarMonth.put(year + "-" + monthTemp + "-" + accountBookMonthFixed.getMonthlyPeriod(), map);
        }

        List<AccountBookDto.AccountBookMonth> monthList = accountBookRepositorySupport.getAccountBookMonth(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookMonth : monthList) {
            List<AccountBookDto.AccountBookMonth> temp = new ArrayList<>();
            int day = Integer.parseInt(accountBookMonth.getDate().toString().substring(8, 10));

            HashMap<String, Integer> map = new HashMap<>();
            if (calendarMonth.containsKey(year + "-" + monthTemp + "-" + day)) {
                map = calendarMonth.get(year + "-" + monthTemp + "-" + day);
            }

            if (accountBookMonth.getType() == 'E') {
                map.put("E", map.getOrDefault("E", 0) + accountBookMonth.getPrice());
            } else {
                map.put("I", map.getOrDefault("I", 0) + accountBookMonth.getPrice());
            }

            calendarMonth.put(year + "-" + monthTemp + "-" + day, map);
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

    @Override
    public CalendarDto.CalendarByDayResponse getCalendarByDay(int year, int month, int day) {
        //가계부 단일 항목
        Map<String, Integer> mapInteger = new HashMap<>();
        Map<String, String> mapString = new HashMap<>();
        int budget = memberService.getMemberByAuthentication().getBudget();
        int budgetOfDay = budget / 30;
        int fixedExpenditure = 0;
        int todayExpenditure = 0;
        int cntExpenditure = 0;
        int totalExpenditure = 0;
        int totalIncome = 0;


        //가계부 리스트
        List<AccountBookDto.AccountBookMonth> list = new ArrayList<>();

        List<AccountBookDto.AccountBookMonth> fixedList = accountBookRepositorySupport.getAccountBookDayFixed(year, month, day, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 고정 지출, 고정 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookDayFixed : fixedList) {
            list.add(accountBookDayFixed);
            if (accountBookDayFixed.getType() == 'E') {
                fixedExpenditure += accountBookDayFixed.getPrice();
                cntExpenditure++;
                totalExpenditure += accountBookDayFixed.getPrice();
            } else {
                totalIncome += accountBookDayFixed.getPrice();
            }
        }

        List<AccountBookDto.AccountBookMonth> dayList = accountBookRepositorySupport.getAccountBookDay(year, month, day, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookDay : dayList) {
            list.add(accountBookDay);
            if (accountBookDay.getType() == 'E') {
                todayExpenditure += accountBookDay.getPrice();
                cntExpenditure++;
                totalExpenditure += accountBookDay.getPrice();
            } else {
                totalIncome += accountBookDay.getPrice();
            }
        }

        mapInteger.put("remainingBudget", budgetOfDay - todayExpenditure);
        mapInteger.put("fixedExpenditure", fixedExpenditure);
        mapInteger.put("cntExpenditure", cntExpenditure);
        mapInteger.put("totalExpenditure", totalExpenditure);
        mapInteger.put("totalIncome", totalIncome);

        mapString.put("dayOfWeek", getDayOfWeek(year, month, day));

        if (todayExpenditure >= 40000) {
            if (memberService.getMemberByAuthentication().getSalaryType() == 'M') {
                int price = memberService.getMemberByAuthentication().getSalary() / (memberService.getMemberByAuthentication().getWorkingHours() * 4);
                mapString.put("word", "이 돈을 벌려면 " + (todayExpenditure / price) + "시간 일해야 해요.");
            } else if (memberService.getMemberByAuthentication().getSalaryType() == 'H') {
                int price = memberService.getMemberByAuthentication().getSalary();
                mapString.put("word", "이 돈을 벌려면 " + (todayExpenditure / price) + "시간 일해야 해요.");
            } else {
                mapString.put("word", "이 돈으로 치킨 " + (todayExpenditure / 18000) + "마리를 먹을 수 있었어요.");
            }
        } else if (todayExpenditure >= 18000) {
            mapString.put("word", "이 돈으로 치킨 " + (todayExpenditure / 18000) + "마리를 먹을 수 있었어요.");
        } else if (todayExpenditure >= 4000) {
            mapString.put("word", "이 돈으로 떡볶이 " + (todayExpenditure / 4000) + "인분을 먹을 수 있었어요.");
        }


        //일과 및 할 일 리스트
        String temp = String.valueOf(month);
        if (temp.length() == 1) {
            temp = "0" + temp;
        }
        String dayTemp = String.valueOf(day);
        if (dayTemp.length() == 1) {
            dayTemp = "0" + dayTemp;
        }
        String strDate = year + "-" + temp + "-" + dayTemp;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate date = LocalDate.parse(strDate, formatter);


        CalendarDto.CalendarByDayResponse response = new CalendarDto.CalendarByDayResponse(mapInteger, mapString, list, routineService.getRoutineByRepetition(1 << (6 - (date.getDayOfWeek().getValue() % 7))), todoService.getTodoByDate(date));
        return response;
    }

    private String getDayOfWeek(int year, int month, int day) {
        String dayOfWeekStr = "";
        LocalDate date = LocalDate.of(year, month, day);
        DayOfWeek dayOfWeek = date.getDayOfWeek();
        int dayOfWeekNumber = dayOfWeek.getValue();
        switch (dayOfWeekNumber) {
            case 1:
                dayOfWeekStr = "월";
                break;
            case 2:
                dayOfWeekStr = "화";
                break;
            case 3:
                dayOfWeekStr = "수";
                break;
            case 4:
                dayOfWeekStr = "목";
                break;
            case 5:
                dayOfWeekStr = "금";
                break;
            case 6:
                dayOfWeekStr = "토";
                break;
            case 7:
                dayOfWeekStr = "일";
                break;
        }

        return dayOfWeekStr;
    }
}
