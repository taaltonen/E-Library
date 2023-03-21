package com.example.libraryapp.registration;

import com.example.libraryapp.libraryUser.LibraryUser;
import com.example.libraryapp.libraryUser.LibraryUserRole;
import com.example.libraryapp.libraryUser.LibraryUserService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Service
@AllArgsConstructor
public class RegistrationService {

    private final LibraryUserService libraryUserService;
    private final EmailValidator emailValidator;
    public String register(RegistrationRequest request) {

        boolean validEmail = emailValidator.test(request.getEmail());
        if(!validEmail){
            throw new IllegalStateException("Invalid email");
        }

        return libraryUserService.signUpUser(new LibraryUser(
                request.getUsername(),
                request.getEmail(),
                request.getPassword(),
                LibraryUserRole.USER,
                Instant.now()
        ));
    }
}
