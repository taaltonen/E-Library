package com.example.libraryapp.book;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class BookConfig {
    @Bean
    CommandLineRunner commandLineRunner(BookRepository repository) {
        return args -> {
            Book book1 = new Book("book", "Eero", 1999, "great book", "poetry");
            Book book2 = new Book("book2", "Eero", 1999, "great book", "poetry");
            repository.saveAll(List.of(book1, book2));
        };
    }
}