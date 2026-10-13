package com.campusvibe.entity; import jakarta.persistence.*; import java.time.*;
@Entity public class Notification { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne(optional=false) public User user; public String title; @Column(length=2000) public String message; public boolean readFlag=false; public LocalDateTime createdAt=LocalDateTime.now(); }
