package com.ecommerce;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class EcommerceApplication {

    public static void main(String[] args) {
        SpringApplication.run(EcommerceApplication.class, args);
        System.out.println("\n========================================");
        System.out.println("  E-Commerce App Started Successfully!");
        System.out.println("  Frontend : http://localhost:8080");
        System.out.println("  H2 Console: http://localhost:8080/h2-console");
        System.out.println("  API Base : http://localhost:8080/api");
        System.out.println("========================================\n");
    }
}
