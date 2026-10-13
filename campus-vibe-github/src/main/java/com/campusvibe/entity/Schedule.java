package com.campusvibe.entity; import jakarta.persistence.*; import java.time.*;
@Entity public class Schedule { @Id @GeneratedValue(strategy=GenerationType.IDENTITY) public Long id; @OneToOne(optional=false) public Event event; public LocalDate date; public LocalTime startTime,endTime; @ManyToOne public Venue venue; @ManyToOne public User coordinator; }
