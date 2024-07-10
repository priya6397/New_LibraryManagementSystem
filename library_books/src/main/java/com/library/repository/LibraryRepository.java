package com.library.repository;

import com.library.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library,Long> {
    List<Library> findByCityId(Long cityId);
    List<Library>  findAllByOrderByNameAsc();
    boolean existsByName(String name);
}
