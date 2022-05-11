package com.baljc.api.service;

import lombok.extern.slf4j.Slf4j;
import org.apache.tika.Tika;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Slf4j
@Service
public class FileServiceImpl implements FileService {

    private final AmazonS3Service amazonS3Service;

    public FileServiceImpl(
            AmazonS3Service amazonS3Service
    ) {
        this.amazonS3Service = amazonS3Service;
    }

    @Override
    public String uploadImage(MultipartFile multipartFile, String folderPath) {
        // 이미지 파일의 크기가 10MB를 초과하는 경우
        if (multipartFile.getSize() > 10 * Math.pow(2, 20))
            throw new IllegalArgumentException("파일의 크기가 10MB를 초과합니다.");
        // MIME Type 확인
        Tika tika = new Tika();
        String mimeType;
        try {
            mimeType = tika.detect(multipartFile.getInputStream());
        } catch (IOException e) {
            throw new IllegalArgumentException("파일 변환 중 에러가 발생했습니다.");
        }
        if (!mimeType.startsWith("image") || mimeType.endsWith("gif"))
            throw new IllegalArgumentException("image 타입(jpg/png/bmp/webp)의 파일이 아닙니다.");
        return amazonS3Service.upload(multipartFile, folderPath);
    }

    @Override
    public void deleteImage(String url) {
        amazonS3Service.deleteFile(url);
    }
}
