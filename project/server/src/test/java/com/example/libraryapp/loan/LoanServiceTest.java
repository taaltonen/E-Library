package com.example.libraryapp.loan;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class LoanServiceTest {
    @Autowired
    private LoanService loanService;


    @Test
    void testGetLoans() {
        LoanService loanService = this.loanService;

        List<Loan> actualLoans = loanService.getLoans();

        Assertions.assertEquals(1, actualLoans.size());
        Assertions.assertEquals(actualLoans.get(0).getBook_id(), 1L);
        Assertions.assertEquals(actualLoans.get(0).getUser_id(), 1L);

    }


    @Test
    void testCreateLoan() {

        LoanService loanService = this.loanService;
        Loan loan = new Loan(2L, 2L, "Narnia");


        loanService.createLoan(loan);

        List<Loan> actualLoans = loanService.getLoans();

        Assertions.assertEquals(2, actualLoans.size());
    }


    @Test
    void testGetLoanById() {
        LoanService loanService = this.loanService;
        Long loan_id = 1L;


        Loan actualLoanById = loanService.getLoanById(loan_id).orElseThrow();

        Assertions.assertEquals(actualLoanById.getUser_id(), 1L);
        Assertions.assertEquals(actualLoanById.getBook_id(), 1L);

    }


    @Test
    void testFindLoansByUserId() {

        LoanService loanService = this.loanService;
        Long user_id = 1L;


        List<Loan> actualFindLoansByUserIdResult = loanService.findLoansByUserId(user_id);

        Assertions.assertEquals(1, actualFindLoansByUserIdResult.size());
    }


    @Test
    void testExtendLoan() {
        LoanService loanService = this.loanService;
        Long loan_id = 1L;

        Loan loan = loanService.getLoanById(1L).orElseThrow();
        Assertions.assertEquals(loan.getEndDate(), loan.getStartDate().plusMonths(1));


        loanService.extendLoan(loan_id);

        Loan updatedLoan = loanService.getLoanById(1L).orElseThrow();
        Assertions.assertEquals(loan.getEndDate().plusMonths(1), updatedLoan.getEndDate());


    }

    @Test
    void testDeleteLoan() {
        LoanService loanService = this.loanService;
        Long loan_id = 2L;

        List<Loan> loans = loanService.getLoans();
        Assertions.assertEquals(2, loans.size());

        loanService.deleteLoan(loan_id);

        List<Loan> updatedLoans = loanService.getLoans();
        Assertions.assertEquals(1, updatedLoans.size());

    }
}

