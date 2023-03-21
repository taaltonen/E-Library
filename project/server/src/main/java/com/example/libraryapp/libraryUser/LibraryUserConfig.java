package com.example.libraryapp.libraryUser;


import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.time.Instant;
import java.util.List;

@AllArgsConstructor
@Configuration
public class LibraryUserConfig  {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    @Bean
    CommandLineRunner commandLineLibraryUserRunner(LibraryUserRepository repository){
        return args -> {
            LibraryUser libraryUser1 = new LibraryUser("eero","eero@tuni.fi", bCryptPasswordEncoder.encode("password1"),LibraryUserRole.USER, Instant.now());
            LibraryUser libraryUser2 = new LibraryUser("jaska", "jaska@tuni.fi",bCryptPasswordEncoder.encode("password2"), LibraryUserRole.ADMIN, Instant.now());
            repository.saveAll(List.of(libraryUser1,libraryUser2));
        };
    }
}