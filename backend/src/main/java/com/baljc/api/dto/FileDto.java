package com.baljc.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

public class FileDto {
    @Getter
    @AllArgsConstructor
    public static class FileInfo {
        private String fileName;
        private String filePath;
        private String url;
    }
}
