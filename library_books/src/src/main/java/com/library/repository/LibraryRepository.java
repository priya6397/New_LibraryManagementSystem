package com.library.repository;

import com.library.model.City;
import com.library.model.Library;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LibraryRepository extends JpaRepository<Library,Long> {
    List<Library> findByCityId(Long cityId);
    List<Library>  findAllByIsActiveOrderByCreatedAtDesc(boolean isActive);
    boolean existsByName(String name);

    boolean existsByCity(City city);
}
