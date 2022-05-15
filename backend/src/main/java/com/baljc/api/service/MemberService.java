package com.baljc.api.service;

import com.baljc.api.dto.MemberDto;
import com.baljc.db.entity.Member;
import org.springframework.web.multipart.MultipartFile;

import java.util.UUID;

public interface MemberService {
//    Member signinByKakao(String code);
    Member signinByKakao(String code, String fcmToken);
    MemberDto.SigninInfo authenticateMember(Member member);
    Member getMemberByAuthentication();
    MemberDto.Response getMemberInfoByAuthentication();
    void updateMember(MemberDto.RegisterRequest registerRequest, MultipartFile multipartFile);
    void deleteMember();
    void signoutMember();
    MemberDto.SigninInfo updateToken(UUID memberId, String authorization, String refreshToken);
}
