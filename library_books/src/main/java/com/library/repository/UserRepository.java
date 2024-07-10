package com.library.repository;

import com.library.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User,Long> {
    Page<User> findByFullNameContaining(String fullName, Pageable pageable);
    boolean existsByPhoneNo(String phoneNo);
    boolean existsByEmail(String email);
}
