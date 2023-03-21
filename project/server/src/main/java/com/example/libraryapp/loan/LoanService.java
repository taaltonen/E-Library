package com.example.libraryapp.loan;

import com.example.libraryapp.book.Book;
import com.example.libraryapp.book.BookRepository;
import com.example.libraryapp.libraryUser.LibraryUser;
import com.example.libraryapp.libraryUser.LibraryUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;


@Service
public class LoanService {
    private final LoanRepository loanRepository;
    private final BookRepository bookRepository;

    private final LibraryUserRepository libraryUserRepository;

    @Autowired
    public LoanService(LoanRepository loanRepository, BookRepository bookRepository, LibraryUserRepository libraryUserRepository) {
        this.loanRepository = loanRepository;
        this.bookRepository = bookRepository;
        this.libraryUserRepository = libraryUserRepository;
    }
    public List<Loan> getLoans(){
       return loanRepository.findAll();
    }
    public void createLoan(Loan loan){
        loanRepository.save(loan);
        Book book = bookRepository.findById(loan.getBook_id()).orElseThrow();
        book.setOnloan(true);
        bookRepository.save(book);
    }

    public Optional<Loan> getLoanById(Long loan_id){
        return loanRepository.findById(loan_id);
    }

    public List<Loan> findLoansByUserId(Long userId) {
        return loanRepository.findAllByUserId(userId);
    }
    public void extendLoan(Long loan_id) {
        Loan loan = loanRepository.findById(loan_id).orElseThrow();
        loan.setEndDate(loan.getEndDate().plusMonths(1));
        loanRepository.save(loan);
    }

    public void deleteLoan(Long loan_id) {
        Loan loan = loanRepository.findById(loan_id).orElseThrow();
        Book book = bookRepository.findById(loan.getBook_id()).orElseThrow();
        book.setOnloan(false);
        bookRepository.save(book);
        loanRepository.deleteById(loan_id);
    }
}
