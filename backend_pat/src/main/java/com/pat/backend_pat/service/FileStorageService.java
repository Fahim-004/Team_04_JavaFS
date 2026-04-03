package com.pat.backend_pat.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileStorageService {

    /**
     * Simple stub for now: returns the original filename as "path".
     * In Phase 5 we will save the actual file to uploads/ folder.
     */
    public String storeFile(MultipartFile file) {
        if (file == null || file.isEmpty()) {
            throw new RuntimeException("File is empty or null");
        }
        // For now we just return the original name as the "path" stored in DB
        // TODO Phase 5: save to disk and return full path like "uploads/student_5_cv.pdf"
        return file.getOriginalFilename();
    }
}