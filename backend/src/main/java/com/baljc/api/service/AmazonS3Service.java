package com.baljc.api.service;

import com.amazonaws.services.s3.model.ObjectMetadata;
import com.baljc.api.dto.FileDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.util.List;

public interface AmazonS3Service {
    String upload(MultipartFile multipartFile, String folderPath);
    void uploadFile(InputStream inputStream, ObjectMetadata objectMetadata, String filePath);
    String getFileUrl(String filePath);
    String getFilePath(String url);
    List<FileDto.FileInfo> getFileInfoList(String folderPath);
    void deleteFile(String url);
}
