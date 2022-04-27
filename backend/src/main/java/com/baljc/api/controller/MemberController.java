package com.baljc.api.controller;

import com.baljc.api.dto.MemberDto;
import com.baljc.api.service.MemberService;
import com.baljc.common.jwt.JwtFilter;
import com.baljc.common.response.BaseDataResponse;
import com.baljc.common.response.BaseResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<BaseDataResponse<Map<String, Boolean>>> signinMember(@RequestParam(value = "code") String code) {
        MemberDto.SigninInfo signinInfo = memberService.authenticateMember(code);

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + signinInfo.getJwt());
        Map<String, Boolean> map = new HashMap<>();
        map.put("surveyedYn", signinInfo.getSurveyedYn());

        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new BaseDataResponse<>(1000,
                "소셜로그인에 성공하였습니다.", map));
    }

    @GetMapping
    public ResponseEntity<BaseDataResponse<MemberDto.Response>> getMember() {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1001,
                "회원정보 조회에 성공하였습니다.", memberService.getMemberInfoByAuthentication()));
    }

    @PutMapping
    public ResponseEntity<BaseResponse> modifyMember(@Valid @RequestPart(value = "memberInfo") MemberDto.RegisterRequest registerRequest,
                                               @RequestPart(value = "profileImage", required = false) MultipartFile multipartFile) {
//        log.debug("modifyMember - {}", multipartFile.isEmpty());
//        memberService.updateMember(registerRequest, multipartFile);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1002, "회원정보 변경이 완료되었습니다."));
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> deleteMember() {

        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1003, "회원탈퇴가 완료되었습니다."));
    }
}
