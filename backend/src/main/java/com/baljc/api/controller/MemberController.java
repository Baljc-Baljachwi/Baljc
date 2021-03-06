package com.baljc.api.controller;

import com.baljc.api.dto.BoardDto;
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

@Slf4j
@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping("/login/kakao")
    public ResponseEntity<BaseDataResponse<MemberDto.SigninResponse>> signinMember(
            @RequestParam(value = "code") String code, @RequestParam(value = "token", required = false) String fcmToken
    ) {
        log.debug("signinMember - code: {}", code);
        MemberDto.SigninInfo signinInfo = memberService.authenticateMember(memberService.signinByKakao(code, fcmToken));

        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + signinInfo.getJwt());
        httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, "Bearer " + signinInfo.getRefreshToken());

        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new BaseDataResponse<>(1000,
                "소셜로그인에 성공하였습니다.", new MemberDto.SigninResponse(signinInfo.getMemberId(),
                signinInfo.getSurveyedYn(), signinInfo.getRegionYn())));
    }

    @GetMapping
    public ResponseEntity<BaseDataResponse<MemberDto.Response>> getMember() {
        return ResponseEntity.status(HttpStatus.OK).body(new BaseDataResponse<>(1001,
                "회원정보 조회에 성공하였습니다.", memberService.getMemberInfoByAuthentication()));
    }

    @PutMapping
    public ResponseEntity<BaseResponse> modifyMember(
            @Valid @RequestPart(value = "memberInfo") MemberDto.RegisterRequest registerRequest,
            @RequestPart(value = "profileImage", required = false) MultipartFile multipartFile
    ) {
        log.debug("modifyMember - {}", multipartFile.isEmpty());
        memberService.updateMember(registerRequest, multipartFile);
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1002, "회원정보 변경이 완료되었습니다."));
    }

    @DeleteMapping
    public ResponseEntity<BaseResponse> removeMember() {
        memberService.deleteMember();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1003, "회원탈퇴가 완료되었습니다."));
    }

    @GetMapping("/logout")
    public ResponseEntity<BaseResponse> signoutMember() {
        memberService.signoutMember();
        return ResponseEntity.status(HttpStatus.OK).body(new BaseResponse(1004, "로그아웃이 완료되었습니다."));
    }

    @PostMapping("/refresh")
    public ResponseEntity<BaseResponse> updateToken(@Valid @RequestBody MemberDto.TokenRequest tokenRequest) {
        MemberDto.SigninInfo signinInfo = memberService.updateToken(tokenRequest.getMemberId(), tokenRequest.getAuthorization(), tokenRequest.getRefreshToken());
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.add(JwtFilter.AUTHORIZATION_HEADER, "Bearer " + signinInfo.getJwt());
        httpHeaders.add(JwtFilter.REFRESH_TOKEN_HEADER, "Bearer " + signinInfo.getRefreshToken());
        return ResponseEntity.status(HttpStatus.OK).headers(httpHeaders).body(new BaseResponse(1005, "토큰이 재발급되었습니다."));
    }
}
