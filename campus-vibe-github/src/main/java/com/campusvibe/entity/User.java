package com.campusvibe.entity;
import jakarta.persistence.*; import java.time.LocalDateTime;
@Entity @Table(name="users") public class User { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String name; @Column(unique=true,nullable=false) public String email; @Column(nullable=false) public String password; @Enumerated(EnumType.STRING) @Column(nullable=false) public Role role; public String studentId,department,year,phone; public LocalDateTime createdAt=LocalDateTime.now(); }
