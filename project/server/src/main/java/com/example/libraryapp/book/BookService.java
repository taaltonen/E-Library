package com.example.libraryapp.book;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookService(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    public List<Book> getBooks() {
        return bookRepository.findAll();

    }

    public Book addNewBook(Book book) {
       return bookRepository.save(book);
    }
    public Optional<Book> findBookById(Long bookId) {
        boolean exists = bookRepository.existsById(bookId);
        if (!exists) {
            throw new IllegalStateException("Book with id " + bookId + "doesn't exist!");
        }
        return bookRepository.findById(bookId);
    }
    public void deleteBook(Long bookId) {
        boolean exists = bookRepository.existsById(bookId);
        if (!exists) {
            throw new IllegalStateException("Book with id " + bookId + "doesn't exist!");
        }
        bookRepository.deleteById(bookId);
    }


    public List<Book> getBooksByGenre(String genre) {
        return bookRepository.findAllByGenre(genre);
    }

    public List<Book> getBooksByTitle(String title) {
        return bookRepository.findAllByTitle(title);
    }

    public List<Book> getAvailableBooks() {
        return bookRepository.findAllByOnloan(false);
    }
}
