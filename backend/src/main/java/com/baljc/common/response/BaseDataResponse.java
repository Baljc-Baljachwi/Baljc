package com.baljc.common.response;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class BaseDataResponse<T> {
    private Integer code;
    private String message;
    private T data;
}