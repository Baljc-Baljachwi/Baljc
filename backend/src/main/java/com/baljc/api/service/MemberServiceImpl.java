package com.baljc.api.service;

import com.baljc.api.dto.MemberDto;
import com.baljc.common.jwt.TokenProvider;
import com.baljc.common.util.SecurityUtil;
import com.baljc.db.entity.Member;
import com.baljc.db.entity.PushAlarm;
import com.baljc.db.repository.MemberRepository;
import com.baljc.db.repository.PushAlarmRepository;
import com.baljc.exception.UnauthenticatedMemberException;
import lombok.extern.slf4j.Slf4j;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PushAlarmRepository pushAlarmRepository;
    private final TokenProvider tokenProvider;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final String clientId;
    private final String redirectUri;
    private final FileService fileService;
    private final String profileImagePath;

    public MemberServiceImpl(MemberRepository memberRepository,
                             PushAlarmRepository pushAlarmRepository,
                             TokenProvider tokenProvider,
                             AuthenticationManagerBuilder authenticationManagerBuilder,
                             @Value("${kakao.clientId}") String clientId,
                             @Value("${kakao.redirectUri}") String redirectUri,
                             FileService fileService,
                             @Value("${cloud.aws.s3.folder.profileImage}") String profileImagePath
    ) {
        this.memberRepository = memberRepository;
        this.pushAlarmRepository = pushAlarmRepository;
        this.tokenProvider = tokenProvider;
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.clientId = clientId;
        this.redirectUri = redirectUri;
        this.fileService = fileService;
        this.profileImagePath = profileImagePath;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Member signinByKakao(String code) {
        // 인가코드 -> 엑세스 토큰
        String accessToken = getAccessTokenByKakao(code);
        log.debug("authenticateMember - accessToken: {}", accessToken);

        // 엑세스 토큰 -> 카카오 사용자 정보
        Map<String, String> kakaoUser = getMemberInfoByKakaoToken(accessToken);

        Member member = memberRepository.findByKakaoId(kakaoUser.get("socialId")).orElse(null);
        if (member == null) {
            member = Member.builder()
                    .kakaoId(kakaoUser.get("socialId"))
                    .email(kakaoUser.get("email"))
                    .build();
            memberRepository.save(member);
            pushAlarmRepository.save(PushAlarm.builder()
                    .member(member)
                    .accountAlarmYn(true)
                    .todoAlarmYn(true)
                    .build());
        }
        return member;
    }

    private String getAccessTokenByKakao(String code) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", clientId);
        params.add("code", code);
        params.add("redirect_uri", redirectUri);

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoTokenReq = new HttpEntity<>(params, headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenReq,
                String.class
        );

        return new JSONObject(response.getBody()).getString("access_token");
    }

    private Map<String, String> getMemberInfoByKakaoToken(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> kakaoProfileReq = new HttpEntity<>(headers);
        ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                kakaoProfileReq,
                String.class
        );

        JSONObject body = new JSONObject(response.getBody());

        String socialId = String.valueOf(body.getLong("id"));
        String email = null;
        if (body.getJSONObject("kakao_account").getBoolean("has_email")) {
            if (!body.getJSONObject("kakao_account").getBoolean("email_needs_agreement")) {
                email = body.getJSONObject("kakao_account").getString("email");
            }
        }

        Map<String, String> map = new HashMap<>();
        map.put("socialId", socialId);
        map.put("email", email);
        return map;
    }

    @Override
    public MemberDto.SigninInfo authenticateMember(Member member) {
        UsernamePasswordAuthenticationToken authenticationToken =
                new UsernamePasswordAuthenticationToken(member.getMemberId(), member.getKakaoId());
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        SecurityContextHolder.getContext().setAuthentication(authentication);
        log.debug("authenticateMember - surveyedYn: {}",  member.getSurveyedYn());
        return new MemberDto.SigninInfo(tokenProvider.createToken(authentication), member.getSurveyedYn());
    }

    @Override
    public Member getMemberByAuthentication() {
        return memberRepository.findById(UUID.fromString(SecurityUtil.getCurrentUsername()
                        .orElseThrow(() -> new ArithmeticException("토큰으로 조회되는 회원이 존재하지 않습니다."))))
                .orElseThrow(() -> new UnauthenticatedMemberException("토큰으로 조회되는 회원이 존재하지 않습니다."));
    }

    @Override
    public MemberDto.Response getMemberInfoByAuthentication() {
        Member member = getMemberByAuthentication();
        if (!member.getSurveyedYn())
            throw new UnauthenticatedMemberException("설문을 시행하지 않은 회원은 정보를 조회할 수 없습니다.");
        return new MemberDto.Response(member.getNickname(), member.getProfileUrl(),
                String.valueOf(member.getSalaryType()), member.getSalary(),
                member.getWorkingHours(), member.getBudget());
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
