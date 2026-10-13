package com.campusvibe.exception; import org.springframework.http.*; import org.springframework.web.bind.annotation.*; import java.util.*;
@RestControllerAdvice public class GlobalExceptionHandler { @ExceptionHandler(Exception.class) ResponseEntity<?> handle(Exception e){return ResponseEntity.badRequest().body(Map.of("message",e.getMessage()==null?"Request failed":e.getMessage()));} }
