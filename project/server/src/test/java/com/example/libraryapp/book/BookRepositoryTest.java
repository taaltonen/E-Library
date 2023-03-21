package com.example.libraryapp.book;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ContextConfiguration;

import static org.junit.jupiter.api.Assertions.assertEquals;

@ContextConfiguration(classes = {BookRepository.class})
@EnableAutoConfiguration
@EntityScan(basePackages = {"com.example.libraryapp.book"})
@DataJpaTest(properties = {"spring.main.allow-bean-definition-overriding=true"})
class BookRepositoryTest {
    @Autowired
    private BookRepository bookRepository;

    /**
     * Method under test: {@link BookRepository#findAllByGenre(String)}
     */
    @Test
    void testFindAllByGenre() {

        BookRepository bookRepository = this.bookRepository;
        String string = "poetry";
        Book book1 = new Book("book", "Eero", 1999, "great book", "poetry");
        bookRepository.save(book1);

        List<Book> actualFindAllByGenreResult = bookRepository.findAllByGenre(string);
        assertEquals(1, actualFindAllByGenreResult.size());
        assertEquals(actualFindAllByGenreResult.get(0).getAuthor(), book1.getAuthor());
    }

    @Test
    void testFindAllByTitle() {
        BookRepository bookRepository = this.bookRepository;
        String string = "book";

        Book book1 = new Book("book", "Eero", 1999, "great book", "poetry");
        bookRepository.save(book1);

        List<Book> actualFindAllByTitleResult = bookRepository.findAllByTitle(string);
        assertEquals(1, actualFindAllByTitleResult.size());

        List<Book> actualFindAllByTitleResult2 = bookRepository.findAllByTitle("fiction");
        assertEquals(0, actualFindAllByTitleResult2.size());

    }
}

