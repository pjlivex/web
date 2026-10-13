package com.campusvibe.entity;
import jakarta.persistence.*; @Entity public class Category { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false,unique=true) public String name; public String description; public Category(){} public Category(String n,String d){name=n;description=d;} }
