package com.example.libraryapp.book;


import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface BookRepository extends JpaRepository<Book, Long> {
    List<Book> findAllByGenre(String genre);

    List<Book> findAllByTitle(String title);
    List<Book> findAllByOnloan(boolean b);
}
