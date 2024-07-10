package com.library.controller;

import com.library.payload.request.LibraryRequest;
import com.library.payload.response.LibraryResponse;
import com.library.service.LibraryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@Validated
@RequestMapping("/api/library")
public class LibraryController {

    @Autowired
    private LibraryService libraryService;

    @PostMapping
    public ResponseEntity<LibraryResponse> createLibrary(@Valid @RequestBody LibraryRequest libraryRequest) {
        LibraryResponse libraryResponse = libraryService.createLibrary(libraryRequest);
        return ResponseEntity.ok(libraryResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LibraryResponse> getLibraryById(@PathVariable Long id) {
        LibraryResponse libraryResponse = libraryService.getLibraryById(id);
        return ResponseEntity.ok(libraryResponse);
    }

    @GetMapping
    public ResponseEntity<List<LibraryResponse>> getAllLibraries() {
        List<LibraryResponse> libraries = libraryService.getAllLibraries();
        return ResponseEntity.ok(libraries);
    }

    @PutMapping("/{id}")
    public ResponseEntity<LibraryResponse> updateLibrary(@PathVariable Long id, @RequestBody LibraryRequest libraryRequest) {
        LibraryResponse libraryResponse = libraryService.updateLibrary(id, libraryRequest);
        return ResponseEntity.ok(libraryResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLibrary(@PathVariable Long id) {
        libraryService.deleteLibrary(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/city/{cityId}")
    public ResponseEntity<List<LibraryResponse>> getLibrariesByCityId(@PathVariable Long cityId) {
        List<LibraryResponse> libraries = libraryService.getLibrariesByCityId(cityId);
        return ResponseEntity.ok(libraries);
    }
}
