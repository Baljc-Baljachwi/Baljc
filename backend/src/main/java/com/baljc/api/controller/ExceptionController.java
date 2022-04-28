package com.baljc.api.controller;

import com.baljc.common.response.BaseResponse;
import com.baljc.exception.UnauthenticatedMemberException;
import com.fasterxml.jackson.core.JsonProcessingException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class ExceptionController {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<BaseResponse> NullPointerExceptionHandler(NullPointerException e) {
        log.error("NullPointerException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(2000, e.getMessage()));
    }

    @ExceptionHandler(ArithmeticException.class)
    public ResponseEntity<BaseResponse> ArithmeticExceptionHandler(ArithmeticException e) {
        log.error("ArithmeticException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(2001, e.getMessage()));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<BaseResponse> IllegalArgumentExceptionHandler(IllegalArgumentException e) {
        log.error("IllegalArgumentException - {}", e.getMessage());
        //400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(2002, e.getMessage()));
    }

    @ExceptionHandler(MalformedJwtException.class)
    public ResponseEntity<BaseResponse> MalformedJwtExceptionHandler(MalformedJwtException e) {
        log.error("MalformedJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(2003, e.getMessage()));
    }

    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<BaseResponse> ExpiredJwtExceptionHandler(ExpiredJwtException e) {
        log.error("ExpiredJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(2004, e.getMessage()));
    }

    @ExceptionHandler(UnsupportedJwtException.class)
    public ResponseEntity<BaseResponse> UnsupportedJwtExceptionHandler(UnsupportedJwtException e) {
        log.error("UnsupportedJwtException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(2005, e.getMessage()));
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity<BaseResponse> BadCredentialsExceptionHandler(BadCredentialsException e) {
        log.error("BadCredentialsException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(2006, e.getMessage()));
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<BaseResponse> UsernameNotFoundExceptionHandler(UsernameNotFoundException e) {
        log.error("UsernameNotFoundException - {}", e.getMessage());
        // 404
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new BaseResponse(2007, e.getMessage()));
    }

    @ExceptionHandler(JsonProcessingException.class)
    public ResponseEntity<BaseResponse> JsonProcessingExceptionHandler(JsonProcessingException e) {
        log.error("JsonProcessingException - {}", "JSON 처리 에러");
        //500
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new BaseResponse(2008, e.getMessage()));
    }

    @ExceptionHandler(UnauthenticatedMemberException.class)
    public ResponseEntity<BaseResponse> UnauthenticatedMemberExceptionHandler(UnauthenticatedMemberException e) {
        log.error("UnauthenticatedMemberException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(3000, e.getMessage()));
    }
}
