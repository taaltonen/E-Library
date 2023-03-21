package com.example.libraryapp.libraryUser;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

@ContextConfiguration(classes = {LibraryUserRepository.class})
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.example.libraryapp.libraryUser"})
@DataJpaTest(properties = {"spring.main.allow-bean-definition-overriding=true"})
class LibraryUserRepositoryTest {
    @Autowired
    private LibraryUserRepository libraryUserRepository;

    @Test
    void testFindByEmail() {
        LibraryUser libraryUser = new LibraryUser();
        libraryUser.setEmail("jane.doe@example.org");
        libraryUser.setPassword("iloveyou");
        libraryUser.setRole(LibraryUserRole.USER);
        LocalDateTime atStartOfDayResult = LocalDate.of(1970, 1, 1).atStartOfDay();
        libraryUser.setTimestamp(atStartOfDayResult.atZone(ZoneId.of("UTC")).toInstant());
        libraryUser.setUsername("janedoe");

        libraryUserRepository.save(libraryUser);
        assertFalse(libraryUserRepository.findByEmail("foo").isPresent());
        assertTrue(libraryUserRepository.findByEmail("jane.doe@example.org").isPresent());
    }

    @Test
    void testFindByUsername() {

        LibraryUser libraryUser1 = new LibraryUser();
        libraryUser1.setEmail("jane.doe@example.org");
        libraryUser1.setPassword("iloveyou");
        libraryUser1.setRole(LibraryUserRole.USER);
        LocalDateTime atStartOfDayResult1 = LocalDate.of(1970, 1, 1).atStartOfDay();
        libraryUser1.setTimestamp(atStartOfDayResult1.atZone(ZoneId.of("UTC")).toInstant());
        libraryUser1.setUsername("janedoe");
        libraryUserRepository.save(libraryUser1);
        assertFalse(libraryUserRepository.findByUsername("foo").isPresent());
        assertTrue(libraryUserRepository.findByUsername("janedoe").isPresent());
    }


}

