package com.baljc.api.service;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.db.entity.AccountBook;
import com.baljc.db.entity.Category;

import java.util.List;

public interface AccountBookService {

    List<AccountBookDto.AccountBookCategoryResponse> getAccountBookCategory(String type);
    void insertAccountBook(AccountBookDto.AccountBookRequest accountBookRequest);
}
