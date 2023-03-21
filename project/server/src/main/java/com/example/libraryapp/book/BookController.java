package com.example.libraryapp.book;

import java.util.List;
import java.util.Optional;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "api/v1/book")
@CrossOrigin(origins = "http://localhost:3000")
@SecurityRequirement(name = "library-api")
public class BookController {


    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }


    @PreAuthorize("permitAll()")
    @GetMapping
    public List<Book> getBooks() {
        return bookService.getBooks();
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.addNewBook(book);
    }

    @PreAuthorize("permitAll()")
    @GetMapping("/{bookId}")
    public Optional<Book> getBookById(@PathVariable Long bookId){
        return bookService.findBookById(bookId);
    }

    @PreAuthorize("hasAuthority('ADMIN')")
    @DeleteMapping(path = "{bookId}")
    public void deleteBook(@PathVariable("bookId") Long bookId) {
        bookService.deleteBook(bookId);
    }
    @PreAuthorize("permitAll()")
    @GetMapping(path="/byGenre/{genre}")
    public List<Book> getByGenre(@PathVariable("genre") String genre){
        return bookService.getBooksByGenre(genre);
    }
    @PreAuthorize("permitAll()")
    @GetMapping(path="/search/{title}")
    public List<Book> searchByTitle(@PathVariable("title") String title){
        return bookService.getBooksByTitle(title);
    }
    @Secured("permitAll")
    @GetMapping(path="/available")
    public List<Book> getAvailable(){
        return bookService.getAvailableBooks();
    }
}
