package com.example.libraryapp.libraryUser;
import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import lombok.AllArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@AllArgsConstructor
@RequestMapping(path = "api/v1/user")
@CrossOrigin(origins = "http://localhost:3000")
@SecurityRequirement(name = "library-api")
public class LibraryUserController {


    private final LibraryUserService libraryUserService;

    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<LibraryUser> getUsers(){
        return libraryUserService.getUsers();
    }

    @PreAuthorize("#userId == principal.id")
    @GetMapping("/{userId}")
    public Optional<LibraryUser> getUserById(@PathVariable Long userId){
        return libraryUserService.findUserById(userId);
    }

    @PreAuthorize("#userId == principal.id")
    @DeleteMapping(path = "/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId) {
        libraryUserService.deleteUser(userId);
    }
    @PreAuthorize("#userId == principal.id")
    @PatchMapping(path = "/{userId}")
    public void changeUserPassword(@PathVariable("userId") Long userId, @RequestBody ChangePassRequest changePassRequest){
        System.out.println(changePassRequest.getPassword());
        libraryUserService.changePassword(userId, changePassRequest.getPassword());
    }
}