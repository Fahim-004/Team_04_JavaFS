package com.pat.backend_pat.config;

import com.pat.backend_pat.dto.ErrorResponse;
import com.pat.backend_pat.dto.ValidationErrorDetail;
import com.pat.backend_pat.exception.AccessDeniedException;
import com.pat.backend_pat.exception.ResourceNotFoundException;
import com.pat.backend_pat.exception.ValidationException;
import jakarta.persistence.EntityNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.OffsetDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationExceptions(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleValidationExceptions", ex);

        List<ValidationErrorDetail> details = ex.getBindingResult()
                .getFieldErrors()
                .stream()
                .map(error -> new ValidationErrorDetail(error.getField(), error.getDefaultMessage()))
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildResponse(
                        "Validation failed",
                        "VALIDATION_FAILED",
                        HttpStatus.BAD_REQUEST,
                        request.getRequestURI(),
                        details));
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<ErrorResponse> handleValidationException(
            ValidationException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleValidationException", ex);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildResponse(
                        ex.getMessage(),
                        "VALIDATION_FAILED",
                        HttpStatus.BAD_REQUEST,
                        request.getRequestURI(),
                        null));
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ErrorResponse> handleIllegalArgumentException(
            IllegalArgumentException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleIllegalArgumentException", ex);

        return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                .body(buildResponse(
                        ex.getMessage(),
                        "INVALID_INPUT",
                        HttpStatus.BAD_REQUEST,
                        request.getRequestURI(),
                        null));
    }

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFoundException(
            ResourceNotFoundException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleResourceNotFoundException", ex);

        String code = resolveNotFoundCode(ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(buildResponse(
                        ex.getMessage(),
                        code,
                        HttpStatus.NOT_FOUND,
                        request.getRequestURI(),
                        null));
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleEntityNotFoundException(
            EntityNotFoundException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleEntityNotFoundException", ex);

        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(buildResponse(
                        ex.getMessage() != null ? ex.getMessage() : "Resource not found",
                        resolveNotFoundCode(ex.getMessage()),
                        HttpStatus.NOT_FOUND,
                        request.getRequestURI(),
                        null));
    }

    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDeniedException(
            AccessDeniedException ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleAccessDeniedException", ex);

        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(buildResponse(
                        ex.getMessage(),
                        "ACCESS_DENIED",
                        HttpStatus.FORBIDDEN,
                        request.getRequestURI(),
                        null));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleException(
            Exception ex,
            HttpServletRequest request) {
        logError("GlobalExceptionHandler#handleException", ex);

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(buildResponse(
                        "Internal server error",
                        "INTERNAL_ERROR",
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        request.getRequestURI(),
                        null));
    }

    private ErrorResponse buildResponse(
            String error,
            String code,
            HttpStatus status,
            String path,
            List<ValidationErrorDetail> details) {
        ErrorResponse response = new ErrorResponse();
        response.setError(error);
        response.setCode(code);
        response.setStatus(status.value());
        response.setTimestamp(OffsetDateTime.now().format(DateTimeFormatter.ISO_OFFSET_DATE_TIME));
        response.setPath(path);
        response.setDetails(details);
        return response;
    }

    private String resolveNotFoundCode(String message) {
        if (message != null && message.toLowerCase(Locale.ROOT).contains("user not found")) {
            return "USER_NOT_FOUND";
        }
        return "RESOURCE_NOT_FOUND";
    }

    private void logError(String context, Exception ex) {
        logger.error("Error occurred in [{}]: {}", context, ex.getMessage(), ex);
    }
}