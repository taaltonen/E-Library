package com.example.libraryapp.loan;

import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
@AllArgsConstructor
@Configuration
public class LoanConfig {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Bean
    CommandLineRunner commandLineLoanRunner(LoanRepository repository){
        return args -> {
            Loan loan1 = new Loan(1L, 1L, "Harry Potter");
            repository.saveAll(List.of(loan1));
        };
    }
}