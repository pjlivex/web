package com.campusvibe.entity; import jakarta.persistence.*;
@Entity public class Result { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @ManyToOne(optional=false) public Event event; @ManyToOne(optional=false) public User participant; public Integer position; public Double score; @Column(length=1000) public String comments; public boolean published=false; }
