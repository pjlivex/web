package com.campusvibe.entity; import jakarta.persistence.*; import java.time.*;
@Entity public class Feedback { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne public User student; public Integer rating; @Column(length=2000) public String message; public LocalDateTime createdAt=LocalDateTime.now(); }
