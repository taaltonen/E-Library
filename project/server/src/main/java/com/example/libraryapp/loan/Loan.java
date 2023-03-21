package com.example.libraryapp.loan;

import javax.persistence.*;

import com.example.libraryapp.book.Book;
import com.example.libraryapp.libraryUser.LibraryUser;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;


@AllArgsConstructor
@Entity
@Getter
@Setter
@Table
@NoArgsConstructor
public class Loan {
    @Id
    @SequenceGenerator(name = "loan_sequence", sequenceName = "loan_sequence", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "loan_sequence")
    private Long id;

    private Long book_id;

    private Long user_id;

    private String book_title;
    private LocalDate startDate;

    private LocalDate endDate;
    
    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public Loan(Long book_id, Long user_id, String book_title){
        this.book_id = book_id;
        this.user_id = user_id;
        this.book_title = book_title;
        this.startDate = LocalDate.now();
        this.endDate = LocalDate.now().plusMonths(1);
    }
    
}
