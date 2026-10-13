package com.campusvibe.entity;
import jakarta.persistence.*; @Entity public class Venue { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @Column(nullable=false) public String name; public String location; public Integer capacity; public Venue(){} public Venue(String n,String l,int c){name=n;location=l;capacity=c;} }
