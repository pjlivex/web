package com.campusvibe.repository; import com.campusvibe.entity.*; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface RegistrationRepository extends JpaRepository<Registration,Long>{boolean existsByStudentIdAndEventId(Long s,Long e); List<Registration> findByStudentId(Long id); long countByStatus(RegistrationStatus s);}
