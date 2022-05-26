package com.baljc.api.controller;

import com.baljc.common.response.BaseResponse;
import com.baljc.exception.*;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.support.DefaultMessageSourceResolvable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.stream.Collectors;

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

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse> MethodArgumentNotValidExceptionHandler(MethodArgumentNotValidException e) {
        String allErrors = e.getBindingResult()
                .getAllErrors()
                .stream()
                .map(DefaultMessageSourceResolvable::getDefaultMessage)
                .collect(Collectors.joining(" / "));
        log.error("MethodArgumentNotValidException - {}", allErrors);
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(2009, allErrors));
    }

    @ExceptionHandler(UnauthenticatedMemberException.class)
    public ResponseEntity<BaseResponse> UnauthenticatedMemberExceptionHandler(UnauthenticatedMemberException e) {
        log.error("UnauthenticatedMemberException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(3000, e.getMessage()));
    }

    @ExceptionHandler(NotExistedAccountBookException.class)
    public ResponseEntity<BaseResponse> NotExistedAccountBookExceptionHandler(NotExistedAccountBookException e) {
        log.error("NotExistedAccountBookException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3300, e.getMessage()));
    }

    @ExceptionHandler(HeartAlreadyExistException.class)
    public ResponseEntity<BaseResponse> HeartAlreadyExistExceptionHandler(HeartAlreadyExistException e) {
        log.error("HeartAlreadyExistException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3700, e.getMessage()));
    }

    @ExceptionHandler(ScrapAlreadyExistException.class)
    public ResponseEntity<BaseResponse> ScrapAlreadyExistExceptionHandler(ScrapAlreadyExistException e) {
        log.error("ScrapAlreadyExistException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3701, e.getMessage()));
    }

    @ExceptionHandler(NotExistedMemberException.class)
    public ResponseEntity<BaseResponse> NotExistedMemberExceptionHandler(NotExistedMemberException e) {
        log.error("NotExistedMemberException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3800, e.getMessage()));
    }

    @ExceptionHandler(NotExistedRoomException.class)
    public ResponseEntity<BaseResponse> NotExistedRoomExceptionHandler(NotExistedRoomException e) {
        log.error("NotExistedRoomException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3801, e.getMessage()));
    }

    @ExceptionHandler(NotExpiredTokenException.class)
    public ResponseEntity<BaseResponse> NotExpiredTokenExceptionHandler(NotExpiredTokenException e) {
        log.error("NotExpiredTokenException - {}", e.getMessage());
        // 400
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new BaseResponse(3001, e.getMessage()));
    }

    @ExceptionHandler(NotValidRefreshTokenException.class)
    public ResponseEntity<BaseResponse> NotValidRefreshTokenExceptionHandler(NotValidRefreshTokenException e) {
        log.error("NotValidRefreshTokenException - {}", e.getMessage());
        // 401
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new BaseResponse(3002, e.getMessage()));
    }
}
