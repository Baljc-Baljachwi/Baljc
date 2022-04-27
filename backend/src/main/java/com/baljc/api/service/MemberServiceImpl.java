package com.baljc.api.service;

import com.baljc.api.dto.MemberDto;
import com.baljc.common.jwt.TokenProvider;
import com.baljc.common.util.SecurityUtil;
import com.baljc.db.entity.Member;
import com.baljc.db.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final FileService fileService;
    private final String profileImagePath;

    public MemberServiceImpl(MemberRepository memberRepository,
                             TokenProvider tokenProvider,
                             AuthenticationManagerBuilder authenticationManagerBuilder,
                             FileService fileService,
                             @Value("${cloud.aws.s3.folder.profileImage}") String profileImagePath
    ) {
        this.memberRepository = memberRepository;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.fileService = fileService;
        this.profileImagePath = profileImagePath;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void insertMember(MemberDto.RegisterRequest registerRequest) {

    }

    @Override
    public Member getMemberByAuthentication() {
        return memberRepository.findById(
                        Long.valueOf(SecurityUtil.getCurrentUsername()
                                .orElseThrow(() -> new ArithmeticException("토큰으로 조회되는 회원이 존재하지 않습니다."))))
                .orElseThrow(() -> new ArithmeticException("토큰으로 조회되는 회원이 존재하지 않습니다."));
    }

    @Override
    public MemberDto.Response getMemberInfoByAuthentication() {
//        Member member = getMemberByAuthentication();
//        return new MemberDto.Response(member.getNickname(), member.getProfileUrl(), String.valueOf(member.getSalaryType()),
//                member.getSalary(), member.getWorkingHours(), member.getBudget());
        return null;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateMember(MemberDto.RegisterRequest registerRequest, MultipartFile multipartFile) {

    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteMember() {

    }
}
