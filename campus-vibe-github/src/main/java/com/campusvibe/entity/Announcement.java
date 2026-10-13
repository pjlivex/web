package com.campusvibe.entity; import jakarta.persistence.*; import java.time.*;
@Entity public class Announcement { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; public String title; @Column(length=3000) public String description; public LocalDateTime date=LocalDateTime.now(); public String priority="NORMAL"; public boolean active=true; }
