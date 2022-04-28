package com.baljc.api.controller;

import com.baljc.api.dto.AccountBookDto;
import com.baljc.api.service.AccountBookService;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import com.baljc.db.entity.Category;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@Slf4j
@RequiredArgsConstructor
@RestController
@RequestMapping("/accountbooks")
public class AccountBookController {

    private final AccountBookService accountBookService;

    @GetMapping("/categories")
    public ResponseEntity<BaseDataResponse<List<AccountBookDto.AccountBookCategoryResponse>>> getAccountBookCategory(@RequestParam(value = "type") String type) {
        List<AccountBookDto.AccountBookCategoryResponse> category = accountBookService.getAccountBookCategory(type);
        return ResponseEntity.status(200).body(new BaseDataResponse<>(1300, "가계부 카테고리 조회 성공", category));
    }

    @PostMapping("")
    public ResponseEntity<BaseResponse> insertAccountBook(@Valid @RequestBody AccountBookDto.AccountBookRequest accountBookRequest) {
        accountBookService.insertAccountBook(accountBookRequest);
        return ResponseEntity.status(200).body(new BaseResponse(1301, "가계부 추가 성공"));
    }

    @GetMapping("/{accountbookId}")
    public ResponseEntity<BaseDataResponse> getAccountBookDetail(@PathVariable String accountbookId) {
        AccountBookDto.AccountBookDetailResponse response = accountBookService.getAccountBookDetail(UUID.fromString(accountbookId));
        return ResponseEntity.status(200).body(new BaseDataResponse<>(1302, "가계부 상세 조회 성공", response));
    }
}
