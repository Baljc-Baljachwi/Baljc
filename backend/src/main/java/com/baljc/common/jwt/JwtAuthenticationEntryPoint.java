package com.baljc.common.jwt;

import com.baljc.common.response.BaseResponse;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        log.debug("commence - request: {}, response: {}", request, response);
        BaseResponse exception = (BaseResponse) request.getAttribute("exception");

        if (exception != null) setResponse(response, exception);
        else setResponse(response, new BaseResponse(9999, "알 수 없는 오류입니다."));
    }

    private void setResponse(HttpServletResponse response, BaseResponse baseResponse) throws IOException {
        response.setContentType("application/json;charset=UTF-8");
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.getWriter().write(new ObjectMapper().writeValueAsString(baseResponse));
    }
}
