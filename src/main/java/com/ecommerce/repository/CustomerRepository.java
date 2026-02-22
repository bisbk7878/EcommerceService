package com.ecommerce.repository;

import com.ecommerce.model.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    // Find customer by email (for checkout - avoid duplicate customers)
    Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);
}
