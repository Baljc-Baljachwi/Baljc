package com.baljc.api.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileService {
    String uploadImage(MultipartFile multipartFile, String folderPath);
    void deleteImage(String url);
}
