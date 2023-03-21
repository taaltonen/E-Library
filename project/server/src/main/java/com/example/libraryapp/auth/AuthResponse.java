package com.example.libraryapp.auth;

public record AuthResponse(Long id, String name, String email, com.example.libraryapp.libraryUser.LibraryUserRole role) {

}
