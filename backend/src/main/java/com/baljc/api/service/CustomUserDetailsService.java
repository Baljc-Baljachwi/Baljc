package com.baljc.api.service;

import com.baljc.db.entity.Member;
import com.baljc.db.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Component("userDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;

    public CustomUserDetailsService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(final String username) throws UsernameNotFoundException {
        log.debug("loadUserByUsername - username: {}", username);
        Member member = memberRepository.findById(Long.parseLong(username))
                .orElseThrow(() -> new UsernameNotFoundException(username + "은(는) 존재하지 않는 회원입니다."));
        return User.builder()
                .username(username)
                .password(member.getKakaoId())
                .roles("member")
                .build();
    }

}
