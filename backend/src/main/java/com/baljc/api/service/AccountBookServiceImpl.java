package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Category;
import com.baljc.db.repository.AccountBookRepository;
import com.baljc.db.repository.AccountBookRepositorySupport;
import com.baljc.db.repository.CategoryRepository;
import com.baljc.exception.NotExistedAccountBookException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.Array;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class AccountBookServiceImpl implements AccountBookService {

    private final MemberService memberService;
    private final AccountBookRepository accountBookRepository;
    private final CategoryRepository categoryRepository;
    private final AccountBookRepositorySupport accountBookRepositorySupport;

    @Override
    public List<AccountBookDto.AccountBookCategoryResponse> getAccountBookCategory(String type) {
        List<Category> list = categoryRepository.findByType(type.charAt(0)).orElseThrow(() -> new NullPointerException("카테고리가 존재하지 않습니다."));
        List<AccountBookDto.AccountBookCategoryResponse> accountBookCategoryResponse = list.stream().map(category -> new AccountBookDto.AccountBookCategoryResponse(category.getCategoryId(),
                        Character.toString(category.getType()),
                        category.getName(),
                        category.getImgUrl())).collect(Collectors.toList());

        return accountBookCategoryResponse;
    }

    @Override
    public void insertAccountBook(AccountBookDto.AccountBookRequest accountBookRequest) {
        //날짜랑 시간 합쳐서 하나로 만들기
        LocalDateTime localDateTime = null;
        if (accountBookRequest.getDate() != null && accountBookRequest.getTime() != null) {
//            LocalDate date = LocalDate.parse(accountBookRequest.getDate(), DateTimeFormatter.ISO_DATE);
//            LocalTime time = LocalTime.parse(accountBookRequest.getTime(), DateTimeFormatter.ISO_LOCAL_TIME);
            localDateTime = LocalDateTime.of(accountBookRequest.getDate(), accountBookRequest.getTime());
        }

        Category category = categoryRepository.getById(accountBookRequest.getCategoryId());

        accountBookRepository.save(AccountBook.builder()
                .category(category)
                .member(memberService.getMemberByAuthentication())
                .type(accountBookRequest.getType().charAt(0))
                .title(accountBookRequest.getTitle())
                .price(accountBookRequest.getPrice())
                .date(localDateTime)
                .fixedExpenditureYn(accountBookRequest.getFixedExpenditureYn().charAt(0))
                .fixedIncomeYn(accountBookRequest.getFixedIncomeYn().charAt(0))
                .paymentMethod(accountBookRequest.getPaymentMethod().charAt(0))
                .memo(accountBookRequest.getMemo())
                .monthlyPeriod(accountBookRequest.getMonthlyPeriod())
                .startDate(accountBookRequest.getStartDate())
                .endDate(accountBookRequest.getEndDate())
                .deletedYn('N')
                .build());
    }

    @Override
    public AccountBookDto.AccountBookDetailResponse getAccountBookDetail(UUID accountbookId) {
        return accountBookRepositorySupport.getAccountBookDetail(accountbookId).orElseThrow(() -> new NotExistedAccountBookException("해당 가계부가 존재하지 않습니다."));
    }

    @Override
    public AccountBookDto.AccountBookList getAcoountBookList(int year, int month) {
        HashMap<String, Integer> monthTotalMap = new HashMap<>();
        monthTotalMap.put("E", 0);
        monthTotalMap.put("I", 0);

        TreeMap<Integer, List<AccountBookDto.AccountBookMonth>> accountbookMonth = new TreeMap<>(Collections.reverseOrder());

        List<AccountBookDto.AccountBookMonthTotal> totalList = accountBookRepositorySupport.getAccountBookMonthTotal(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 전체 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonthTotal accountBookMonthTotal : totalList) {
            monthTotalMap.put(Character.toString(accountBookMonthTotal.getType()), accountBookMonthTotal.getPrice());
        }

        List<AccountBookDto.AccountBookMonth> fixedList = accountBookRepositorySupport.getAccountBookMonthFixed(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 고정 지출, 고정 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookMonthFixed : fixedList) {
            monthTotalMap.put(Character.toString(accountBookMonthFixed.getType()),
                    monthTotalMap.get(Character.toString(accountBookMonthFixed.getType())) + accountBookMonthFixed.getPrice());

            //요일
            String dayOfWeek = getDayOfWeek(year, month, accountBookMonthFixed.getMonthlyPeriod());
            accountBookMonthFixed.setDayOfWeek(dayOfWeek);

            List<AccountBookDto.AccountBookMonth> temp = new ArrayList<>();
            if (accountbookMonth.containsKey(accountBookMonthFixed.getMonthlyPeriod())) {
                temp = accountbookMonth.get(accountBookMonthFixed.getMonthlyPeriod());
            }
            temp.add(accountBookMonthFixed);
            accountbookMonth.put(accountBookMonthFixed.getMonthlyPeriod(), temp);
        }

        List<AccountBookDto.AccountBookMonth> monthList = accountBookRepositorySupport.getAccountBookMonth(year, month, memberService.getMemberByAuthentication()).orElseThrow(() -> new NullPointerException("해당 월의 지출, 수입이 존재하지 않습니다."));
        for (AccountBookDto.AccountBookMonth accountBookMonth : monthList) {
            List<AccountBookDto.AccountBookMonth> temp = new ArrayList<>();
            int day = Integer.parseInt(accountBookMonth.getDate().toString().substring(8, 10));
            String dayOfWeek = getDayOfWeek(year, month, day);
            accountBookMonth.setDayOfWeek(dayOfWeek);

            if (accountbookMonth.containsKey(day)) {
                temp = accountbookMonth.get(day);
            }
            temp.add(accountBookMonth);
            accountbookMonth.put(day, temp);
        }

        AccountBookDto.AccountBookList response = new AccountBookDto.AccountBookList(monthTotalMap, accountbookMonth);
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

    @Override
    public void updateAccountBook(UUID accoutbookId, AccountBookDto.AccountBookRequest accountBookRequest) {
        AccountBook accountBook = accountBookRepository.findById(accoutbookId).orElseThrow(() -> new NullPointerException("해당 가계부가 존재하지 않습니다."));;
        Category category = categoryRepository.getById(accountBookRequest.getCategoryId());
        accountBook.updateAccontBook(accountBookRequest, category);
    }

    @Override
    public void deleteAccountBook(UUID accoutbookId) {
        AccountBook accountBook = accountBookRepository.findById(accoutbookId).orElseThrow(() -> new NullPointerException("해당 가계부가 존재하지 않습니다."));;
        accountBook.deleteAccountBook();
    }

}
