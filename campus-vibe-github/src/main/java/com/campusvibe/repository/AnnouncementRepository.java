package com.campusvibe.repository;
import com.campusvibe.entity.Announcement; import org.springframework.data.jpa.repository.JpaRepository;
public interface AnnouncementRepository extends JpaRepository<Announcement,Long> {}
