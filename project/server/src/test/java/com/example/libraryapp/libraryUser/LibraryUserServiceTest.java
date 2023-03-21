package com.example.libraryapp.libraryUser;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.expression.spel.ast.NullLiteral;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class LibraryUserServiceTest {
    @Autowired
    private LibraryUserService libraryUserService;

    @Autowired
    BCryptPasswordEncoder bCryptPasswordEncoder;
    /**
     * Method under test: {@link LibraryUserService#signUpUser(LibraryUser)}
     */
    @Test
    void testSignUpUser() {
        // Arrange
        // TODO: Populate arranged inputs
        LibraryUserService libraryUserService = this.libraryUserService;
        LibraryUser libraryUser = new LibraryUser("eerotest","eero.kaarnalehto@tuni.fi", "password1",LibraryUserRole.USER, Instant.now());;

        // Act
        String actualSignUpUserResult = libraryUserService.signUpUser(libraryUser);

        // Assert
        // TODO: Add assertions on result
    }

    /**
     * Method under test: {@link LibraryUserService#getUsers()}
     */
    @Test
    void testGetUsers() {
        LibraryUserService libraryUserService = this.libraryUserService;

        List<LibraryUser> actualUsers = libraryUserService.getUsers();

        Assertions.assertEquals(3, actualUsers.size());
        Assertions.assertEquals(actualUsers.get(2).getUsername(), "eerotest");
        Assertions.assertEquals(actualUsers.get(2).getEmail(), "eero.kaarnalehto@tuni.fi");
    }

    @Test
    void testFindUserById() {
        LibraryUserService libraryUserService = this.libraryUserService;
        Long userId = 3L;

        LibraryUser actualFindUserByIdResult = libraryUserService.findUserById(userId).orElseThrow();

        Assertions.assertEquals(actualFindUserByIdResult.getUsername(), "eerotest");
        Assertions.assertEquals(actualFindUserByIdResult.getEmail(), "eero.kaarnalehto@tuni.fi");
    }

    @Test
    void testGetUserByUsername() {
        LibraryUserService libraryUserService = this.libraryUserService;
        String username = "eero.kaarnalehto@tuni.fi";

        LibraryUser actualUserByUsername = libraryUserService.getUserByUsername(username).orElseThrow();

        Assertions.assertEquals(actualUserByUsername.getUsername(), "eerotest");
    }

    /**
     * Method under test: {@link LibraryUserService#deleteUser(Long)}
     */
    @Test
    void testDeleteUser() {
        // Arrange
        // TODO: Populate arranged inputs
        LibraryUserService libraryUserService = this.libraryUserService;
        Long userId = 4L;

        LibraryUser libraryUser = new LibraryUser("eerotestdel","eero.delete@tuni.fi", "password1",LibraryUserRole.USER, Instant.now());;
        libraryUserService.signUpUser(libraryUser);
        List<LibraryUser> actualUsers = libraryUserService.getUsers();
        Assertions.assertEquals(4, actualUsers.size());

        LibraryUser actualUserByUsername = libraryUserService.getUserByUsername("eero.delete@tuni.fi").orElseThrow();
        Assertions.assertEquals(actualUserByUsername.getUsername(), "eerotestdel");

        libraryUserService.deleteUser(userId);
        actualUsers = libraryUserService.getUsers();
        Assertions.assertEquals(3, actualUsers.size());

    }

    /**
     * Method under test: {@link LibraryUserService#loadUserByUsername(String)}
     */
    @Test
    void testLoadUserByUsername() throws UsernameNotFoundException {
        LibraryUserService libraryUserService = this.libraryUserService;
        String email = "eero.kaarnalehto@tuni.fi";


        LibraryUser actualLoadUserByUsernameResult = libraryUserService.loadUserByUsername(email);

        Assertions.assertEquals(actualLoadUserByUsernameResult.getUsername(), "eerotest");
    }

    /**
     * Method under test: {@link LibraryUserService#changePassword(Long, String)}
     */
    @Test
    void testChangePassword() {
        // Arrange
        // TODO: Populate arranged inputs
        LibraryUserService libraryUserService = this.libraryUserService;
        Long userId = 3L;
        LibraryUser user = libraryUserService.findUserById(3L).orElseThrow();
        String password = "testpasschange";

        libraryUserService.changePassword(userId, password);


        // Assert
        // TODO: Add assertions on result
    }

}

