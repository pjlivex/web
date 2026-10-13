package com.campusvibe.repository; import com.campusvibe.entity.Event; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface EventRepository extends JpaRepository<Event,Long>{List<Event> findByNameContainingIgnoreCase(String name);}
