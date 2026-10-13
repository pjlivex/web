package com.campusvibe.repository;
import com.campusvibe.entity.Schedule; import org.springframework.data.jpa.repository.JpaRepository;
public interface ScheduleRepository extends JpaRepository<Schedule,Long> {}
