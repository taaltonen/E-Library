package com.example.libraryapp.book;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class BookServiceTest {

    @MockBean
    private BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    @Test
    void testGetBooks() {
        ArrayList<Book> bookList = new ArrayList<>();
        when(bookRepository.findAll()).thenReturn(bookList);
        List<Book> actualBooks = bookService.getBooks();
        assertSame(bookList, actualBooks);
        assertTrue(actualBooks.isEmpty());
        verify(bookRepository).findAll();
    }


    @Test
    void testAddNewBook() {
        Book book = new Book();
        book.setAuthor("JaneDoe");
        book.setDescription("The characteristics of someone or something");
        book.setGenre("Genre");
        book.setId(123L);
        book.setOnloan(true);
        book.setTitle("Dr");
        book.setYr(1);
        when(bookRepository.save((Book) any())).thenReturn(book);

        Book book1 = new Book();
        book1.setAuthor("JaneDoe");
        book1.setDescription("The characteristics of someone or something");
        book1.setGenre("Genre");
        book1.setId(123L);
        book1.setOnloan(true);
        book1.setTitle("Dr");
        book1.setYr(1);
        assertSame(book, bookService.addNewBook(book1));
        verify(bookRepository).save((Book) any());
    }


    @Test
    void testFindBookById() {
        Book book = new Book();
        book.setAuthor("JaneDoe");
        book.setDescription("The characteristics of someone or something");
        book.setGenre("Genre");
        book.setId(123L);
        book.setOnloan(true);
        book.setTitle("Dr");
        book.setYr(1);
        Optional<Book> ofResult = Optional.of(book);
        when(bookRepository.findById((Long) any())).thenReturn(ofResult);
        when(bookRepository.existsById((Long) any())).thenReturn(true);
        Optional<Book> actualFindBookByIdResult = bookService.findBookById(123L);
        assertSame(ofResult, actualFindBookByIdResult);
        assertTrue(actualFindBookByIdResult.isPresent());
        verify(bookRepository).existsById((Long) any());
        verify(bookRepository).findById((Long) any());
    }


    @Test
    void testDeleteBook() {
        doNothing().when(bookRepository).deleteById((Long) any());
        when(bookRepository.existsById((Long) any())).thenReturn(true);
        bookService.deleteBook(123L);
        verify(bookRepository).existsById((Long) any());
        verify(bookRepository).deleteById((Long) any());
    }

    @Test
    void testGetBooksByGenre() {
        ArrayList<Book> bookList = new ArrayList<>();
        when(bookRepository.findAllByGenre((String) any())).thenReturn(bookList);
        List<Book> actualBooksByGenre = bookService.getBooksByGenre("Genre");
        assertSame(bookList, actualBooksByGenre);
        assertTrue(actualBooksByGenre.isEmpty());
        verify(bookRepository).findAllByGenre((String) any());
    }

    @Test
    void testGetBooksByTitle() {
        ArrayList<Book> bookList = new ArrayList<>();
        when(bookRepository.findAllByTitle((String) any())).thenReturn(bookList);
        List<Book> actualBooksByTitle = bookService.getBooksByTitle("Dr");
        assertSame(bookList, actualBooksByTitle);
        assertTrue(actualBooksByTitle.isEmpty());
        verify(bookRepository).findAllByTitle((String) any());
    }

}

