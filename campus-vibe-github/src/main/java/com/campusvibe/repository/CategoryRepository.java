package com.campusvibe.repository;
import com.campusvibe.entity.Category; import org.springframework.data.jpa.repository.JpaRepository;
public interface CategoryRepository extends JpaRepository<Category,Long> {}
