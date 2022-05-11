package com.baljc.api.service;

import com.baljc.api.dto.BoardDto;
import com.baljc.api.dto.MyPageDto;
import com.baljc.db.entity.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Slf4j
@Service
@Transactional(readOnly = true)
public class MyPageServiceImpl implements MyPageService {

    private final MemberService memberService;

    public MyPageServiceImpl(MemberService memberService) {
        this.memberService = memberService;
    }

    @Override
    public MyPageDto.NowExpResponse getNowExpenditure(LocalDate date) {
//        log.debug("getNowExpenditure - LocalDateTime.now(): {}", LocalDateTime.now());
        int budget = memberService.getMemberByAuthentication().getBudget();
        MyPageDto.FixedExpResponse response = getFixedExpenditure(date.getYear(), date.getMonthValue());
        int fixedExpenditure = response.getFixedExpenditure();
        int totalExpenditure = response.getTotalExpenditure();
        int remainingBudget = Math.max(0, budget - totalExpenditure);
        int dailyExpenditure = remainingBudget / (date.lengthOfMonth() - date.getDayOfMonth() + 1);
        int estimatedExpenditure = fixedExpenditure +
                ((totalExpenditure - fixedExpenditure) / date.getDayOfMonth()) * date.lengthOfMonth();
        int remainingBudgetPercent = (int)(((double)remainingBudget / budget) * 100);
        return new MyPageDto.NowExpResponse(remainingBudget, dailyExpenditure, estimatedExpenditure,
                budget, 100 - remainingBudgetPercent, remainingBudgetPercent);
    }

    @Override
    public MyPageDto.FixedExpResponse getFixedExpenditure(Integer year, Integer month) {
        int fixedExpenditure = getMonthlySteam(year, month)
                .filter(accountBook -> accountBook.getFixedExpenditureYn() == 'Y')
                .mapToInt(AccountBook::getPrice).sum();

        int totalExpenditure = fixedExpenditure + getMonthlySteam(year, month)
                .filter(accountBook -> accountBook.getFixedExpenditureYn() == 'N')
                .mapToInt(AccountBook::getPrice).sum();

        return new MyPageDto.FixedExpResponse(fixedExpenditure, totalExpenditure);
    }

    @Override
    public List<MyPageDto.FixedExpContentResponse> getFixedExpenditureList(Integer year, Integer month) {
        LocalDate start = LocalDate.of(year, month, 1).withDayOfMonth(1);
        LocalDate mid = start.withDayOfMonth(15);
        String[] dayOfWeeks = {"월", "화", "수", "목", "금", "토", "일"};
        return memberService.getMemberByAuthentication()
                .getAccountBookList()
                .stream()
                .filter(accountBook -> {
                    if (accountBook.getDeletedYn() != 'N' || accountBook.getType() != 'E') return false;
                    if (accountBook.getFixedExpenditureYn() == 'Y') {
                        return mid.compareTo(accountBook.getStartDate()) >= 0
                                && mid.compareTo(accountBook.getEndDate()) <= 0;
                    }
                    return false;
                })
                .sorted(Comparator.comparing(AccountBook::getMonthlyPeriod))
                .map(accountBook -> new MyPageDto.FixedExpContentResponse(
                        accountBook.getAccountBookId(),
                        accountBook.getMonthlyPeriod(),
                        dayOfWeeks[LocalDate.of(year, month, accountBook.getMonthlyPeriod())
                                .getDayOfWeek().getValue() - 1],
                        accountBook.getTitle(),
                        accountBook.getPrice(),
                        accountBook.getCategory().getName(),
                        accountBook.getCategory().getImgUrl(),
                        accountBook.getPaymentMethod()
                        ))
                .collect(Collectors.toList());
    }

    @Override
    public Map<String, Integer> getExpenditureByCategory(Integer year, Integer month) {
        return getMonthlySteam(year, month)
                .collect(Collectors.groupingByConcurrent(accountBook -> accountBook.getCategory().getName(),
                        Collectors.summingInt(AccountBook::getPrice)));
    }

    @Override
    public List<Integer> getDailyExpenditure(Integer year, Integer month) {
        Integer[] dailyExp = new Integer[LocalDate.of(year, month, 1).withDayOfMonth(1).lengthOfMonth()];
        Arrays.fill(dailyExp, 0);
        getMonthlySteam(year, month)
                .forEach(accountBook -> {
                    if (accountBook.getFixedExpenditureYn() == 'Y') {
                        dailyExp[accountBook.getMonthlyPeriod() - 1] += accountBook.getPrice();
                    }else if (accountBook.getFixedExpenditureYn() == 'N') {
                        dailyExp[accountBook.getDate().toLocalDate().getDayOfMonth() - 1] += accountBook.getPrice();
                    }
                });

        return Arrays.stream(dailyExp).collect(Collectors.toList());
    }

    @Override
    public List<BoardDto.BoardListResponse> getMyBoardList() {
        return memberService.getMemberByAuthentication().getBoardList()
                .stream()
                .filter(board -> board.getDeletedYn() == 'N')
                .sorted(Comparator.comparing(Board::getCreatedAt).reversed())
                .map(board -> {
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime dateTime = board.getCreatedAt();
                    long minutes = ChronoUnit.MINUTES.between(dateTime, now);
                    long hours = ChronoUnit.HOURS.between(dateTime, now);
                    long days = ChronoUnit.DAYS.between(dateTime, now);
                    String updatedAt = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    if (minutes < 1) {
                        updatedAt = "방금전";
                    }else if (minutes < 60) {
                        updatedAt = minutes + "분전";
                    }else if (hours < 24) {
                        updatedAt = hours + "시간전";
                    }else if(days < 7) {
                        updatedAt = days + "일전";
                    }

                    return new BoardDto.BoardListResponse(board.getBoardId(),
                            board.getBoardCategory().getName(),
                            board.getContent(),
                            updatedAt,
                            board.getMember().getNickname(),
                            board.getDong(),
                            board.getBoardImgList()
                                    .stream()
                                    .map(BoardImg::getImgUrl)
                                    .collect(Collectors.toList()),
                            board.getHeartList().size(),
                            board.getCommentList().size());
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<BoardDto.BoardListResponse> getScrapBoardList() {
        return memberService.getMemberByAuthentication().getScrapList()
                .stream()
                .map(Scrap::getBoard)
                .filter(board -> board.getDeletedYn() == 'N')
                .sorted(Comparator.comparing(Board::getCreatedAt).reversed())
                .map(board -> {
                    LocalDateTime now = LocalDateTime.now();
                    LocalDateTime dateTime = board.getCreatedAt();
                    long minutes = ChronoUnit.MINUTES.between(dateTime, now);
                    long hours = ChronoUnit.HOURS.between(dateTime, now);
                    long days = ChronoUnit.DAYS.between(dateTime, now);
                    String updatedAt = dateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
                    if (minutes < 1) {
                        updatedAt = "방금전";
                    }else if (minutes < 60) {
                        updatedAt = minutes + "분전";
                    }else if (hours < 24) {
                        updatedAt = hours + "시간전";
                    }else if(days < 7) {
                        updatedAt = days + "일전";
                    }

                    return new BoardDto.BoardListResponse(board.getBoardId(),
                            board.getBoardCategory().getName(),
                            board.getContent(),
                            updatedAt,
                            board.getMember().getNickname(),
                            board.getDong(),
                            board.getBoardImgList()
                                    .stream()
                                    .map(BoardImg::getImgUrl)
                                    .collect(Collectors.toList()),
                            board.getHeartList().size(),
                            board.getCommentList().size());
                })
                .collect(Collectors.toList());
    }

    public Stream<AccountBook> getMonthlySteam(Integer year, Integer month) {
        LocalDate start = LocalDate.of(year, month, 1).withDayOfMonth(1);
        LocalDate mid = start.withDayOfMonth(15);
        LocalDate end = start.withDayOfMonth(start.lengthOfMonth());
        return memberService.getMemberByAuthentication()
                .getAccountBookList()
                .stream()
                .filter(accountBook -> {
                    if (accountBook.getDeletedYn() != 'N' || accountBook.getType() != 'E') return false;
                    if (accountBook.getFixedExpenditureYn() == 'Y') {
                        return mid.compareTo(accountBook.getStartDate()) >= 0
                                && mid.compareTo(accountBook.getEndDate()) <= 0;
                    } else if (accountBook.getFixedExpenditureYn() == 'N') {
                        LocalDate temp = accountBook.getDate().toLocalDate();
                        return temp.compareTo(start) >= 0 && temp.compareTo(end) <= 0;
                    }
                    return false;
                });
    }
}
