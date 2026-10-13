package com.campusvibe.repository; import com.campusvibe.entity.*; import org.springframework.data.jpa.repository.*; import java.util.*;
public interface UserRepository extends JpaRepository<User,Long>{Optional<User> findByEmail(String email); long countByRole(Role role);}
