package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Category;
import com.baljc.db.repository.AccountBookRepository;
import com.baljc.db.repository.AccountBookRepositorySupport;
import com.baljc.db.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Transactional
@Service
public class AccountBookServiceImpl implements AccountBookService {

    private final MemberService memberService;
//    private final AccountBookRepository accountBookRepository;
    private final CategoryRepository categoryRepository;
//    private final AccountBookRepositorySupport accountBookRepositorySupport;

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
        LocalDate date = LocalDate.parse(accountBookRequest.getDate(), DateTimeFormatter.ISO_DATE);
        LocalTime time = LocalTime.parse(accountBookRequest.getTime(), DateTimeFormatter.ISO_LOCAL_TIME);
        LocalDateTime localDateTime = LocalDateTime.of(date, time);

        Category category = categoryRepository.getById(accountBookRequest.getCategoryId());

        accountBookRepository.save(AccountBook.builder()
                .category(category)
                .type(accountBookRequest.getType().charAt(0))
                .title(accountBookRequest.getTitle())
                .price(accountBookRequest.getPrice())
                .date(localDateTime)
                .fixedExpenditureYn(accountBookRequest.getFixedExpenditureYn())
                .fixedIncomeYn(accountBookRequest.getFixedIncomeYn())
                .paymentMethod(accountBookRequest.getPaymentMethod().charAt(0))
                .memo(accountBookRequest.getMemo())
                .periodType(accountBookRequest.getPeriodType().charAt(0))
                .monthlyPeriod(accountBookRequest.getMonthlyPeriod())
                .weeklyPeriod(accountBookRequest.getWeeklyPeriod())
                .build());

//        accountBookRepository.save(AccountBook.builder()
//                        .category(category)
//                        .member(memberService.getMemberByAuthentication())
//                        .type(accountBookRequest.getType().charAt(0))
//                        .title(accountBookRequest.getTitle())
//                        .price(accountBookRequest.getPrice())
//                        .date(localDateTime)
//                        .fixedExpenditureYn(accountBookRequest.getFixedExpenditureYn())
//                        .fixedIncomeYn(accountBookRequest.getFixedIncomeYn())
//                        .paymentMethod(accountBookRequest.getPaymentMethod().charAt(0))
//                        .memo(accountBookRequest.getMemo())
//                        .periodType(accountBookRequest.getPeriodType().charAt(0))
//                        .monthlyPeriod(accountBookRequest.getMonthlyPeriod())
//                        .weeklyPeriod(accountBookRequest.getWeeklyPeriod())
//                        .build());
    }

}
