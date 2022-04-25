package com.baljc.common.response;

public class BaseDataResponse<T> extends BaseResponse {
    private T data;

    public BaseDataResponse(Integer code, String message, T data) {
        super(code, message);
        this.data = data;
    }
}
