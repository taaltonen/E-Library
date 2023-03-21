package com.example.libraryapp.loan;

import com.example.libraryapp.book.BookRepository;
import com.example.libraryapp.libraryUser.LibraryUserRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
@ContextConfiguration(classes = {LoanRepository.class})
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.example.libraryapp.loan"})
@DataJpaTest(properties = {"spring.main.allow-bean-definition-overriding=true"})
class LoanRepositoryTest {
    @Autowired
    private LoanRepository loanRepository;

    @Test
    void findAllByUserId() {
        Loan loan = new Loan(2L, 2L, "Harry Potter");
        Loan loan1 = new Loan(1L, 2L, "Risto Räppääjä");
        loanRepository.save(loan);
        List<Loan> loans = loanRepository.findAllByUserId(2L);
        Assertions.assertEquals(1, loans.size());
        loanRepository.save(loan1);
        loans = loanRepository.findAllByUserId(2L);
        Assertions.assertEquals(2, loans.size());
    }
}