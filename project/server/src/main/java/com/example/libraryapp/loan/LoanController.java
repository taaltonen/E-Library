package com.example.libraryapp.loan;


import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "api/v1/loan")
@CrossOrigin(origins = "http://localhost:3000")
@SecurityRequirement(name = "library-api")
public class LoanController {
    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }


    @PreAuthorize("#userId == principal.id")
    @GetMapping("/byUser/{userId}")
    public List<Loan> getLoansByUserId(@PathVariable Long userId){
        return loanService.findLoansByUserId(userId);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping
    public List<Loan> getLoans(){
        return loanService.getLoans();
    }

    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @PostMapping
    public void createNewLoan(@RequestBody Loan loan){
        loanService.createLoan(loan);
    }
    @PreAuthorize("hasAuthority('ADMIN')")
    @GetMapping("/{loan_id}")
    public Optional<Loan> findLoanById(@PathVariable("loan_id") Long loan_id){
        return loanService.getLoanById(loan_id);
    }
    @PreAuthorize("hasAnyAuthority('ADMIN', 'USER')")
    @DeleteMapping("/{loan_id}")
    public void deleteLoanById(@PathVariable Long loan_id){
        loanService.deleteLoan(loan_id);

    }

    @PutMapping(path = "/extend/{loan_id}")
    public void extendLoan(@PathVariable("loan_id") Long loan_id){
        loanService.extendLoan(loan_id);
    }
}
