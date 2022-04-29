package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Category;

import java.util.List;
import java.util.UUID;

public interface AccountBookService {

    List<AccountBookDto.AccountBookCategoryResponse> getAccountBookCategory(String type);
    void insertAccountBook(AccountBookDto.AccountBookRequest accountBookRequest);
    AccountBookDto.AccountBookDetailResponse getAccountBookDetail(UUID accountbookId);
    void getAcoountBookList(int year, int month);
    void updateAccountBook(UUID accoutbookId, AccountBookDto.AccountBookRequest accountBookRequest);
    void deleteAccountBook(UUID accoutbookId);
}
