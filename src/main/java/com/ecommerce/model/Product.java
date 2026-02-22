package com.ecommerce.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * PRODUCT Entity — maps to the PRODUCT table in H2 database.
 * Every field here becomes a column in the DB.
 */
@Entity
@Table(name = "products")
@Data                   // Lombok: generates getters, setters, toString
@NoArgsConstructor      // Lombok: generates no-arg constructor (required by JPA)
@AllArgsConstructor     // Lombok: generates all-args constructor
@Builder                // Lombok: enables builder pattern
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-increment PK
    private Long id;

    @NotBlank(message = "Product name is required")
    @Column(nullable = false)
    private String name;

    @Column(length = 1000)
    private String description;

    @NotNull(message = "Price is required")
    @DecimalMin(value = "0.01", message = "Price must be greater than 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @Min(value = 0, message = "Stock cannot be negative")
    @Column(nullable = false)
    private Integer stockQuantity;

    private String imageUrl;

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private Boolean active = true;

    @Column(updatable = false)
    private LocalDateTime createdAt;

    @PrePersist // Called automatically before inserting into DB
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
