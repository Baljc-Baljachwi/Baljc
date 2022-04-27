package com.baljc.api.service;

import com.baljc.api.dto.MemberDto;
import com.baljc.db.entity.Member;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {
    MemberDto.SigninInfo authenticateMember(String code);
    Member getMemberByAuthentication();
    MemberDto.Response getMemberInfoByAuthentication();
    void updateMember(MemberDto.RegisterRequest registerRequest, MultipartFile multipartFile);
    void deleteMember();
}
