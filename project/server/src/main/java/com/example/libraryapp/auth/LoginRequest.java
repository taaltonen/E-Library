package com.example.libraryapp.auth;

import lombok.*;

@Data
@EqualsAndHashCode
@Getter
@Setter
@ToString
public class LoginRequest {
    private final String username;
    private final String password;
}

