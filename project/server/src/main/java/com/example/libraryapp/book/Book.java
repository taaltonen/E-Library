package com.example.libraryapp.book;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;


@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table
public class Book {

    @Id
    @SequenceGenerator(name = "book_sequence", sequenceName = "book_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "book_sequence")

    private Long id;
    private String title;
    private String author;
    private Integer yr;
    private String description;
    private String genre;

    private Boolean onloan = false;

    public Book(String title, String author, Integer yr, String description, String genre) {
        this.title = title;
        this.author = author;
        this.yr = yr;
        this.description = description;
        this.genre = genre;
    }


}
