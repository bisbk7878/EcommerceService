package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.math.BigDecimal;
import java.util.List;

/**
 * DATA SEEDER — runs automatically when Spring Boot starts.
 *
 * Implements CommandLineRunner → Spring calls run() after startup.
 * Seeds the H2 database with sample products so you can test immediately.
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() > 0) {
            log.info("Database already seeded, skipping...");
            return;
        }

        log.info("Seeding database with sample products...");

        List<Product> products = List.of(
            // Electronics
            Product.builder()
                .name("iPhone 15 Pro")
                .description("Latest Apple smartphone with titanium design and A17 Pro chip")
                .price(new BigDecimal("999.99"))
                .stockQuantity(50)
                .category("Electronics")
                .imageUrl("https://via.placeholder.com/300x300?text=iPhone+15+Pro")
                .active(true).build(),

            Product.builder()
                .name("Samsung 4K Smart TV 55\"")
                .description("Crystal clear 4K display with smart TV features and voice control")
                .price(new BigDecimal("649.99"))
                .stockQuantity(30)
                .category("Electronics")
                .imageUrl("https://via.placeholder.com/300x300?text=Samsung+TV")
                .active(true).build(),

            Product.builder()
                .name("Sony WH-1000XM5 Headphones")
                .description("Industry-leading noise canceling with premium sound quality")
                .price(new BigDecimal("349.99"))
                .stockQuantity(75)
                .category("Electronics")
                .imageUrl("https://via.placeholder.com/300x300?text=Sony+Headphones")
                .active(true).build(),

            Product.builder()
                .name("MacBook Air M2")
                .description("Supercharged by M2 chip, incredibly thin and light laptop")
                .price(new BigDecimal("1099.99"))
                .stockQuantity(25)
                .category("Electronics")
                .imageUrl("https://via.placeholder.com/300x300?text=MacBook+Air")
                .active(true).build(),

            // Clothing
            Product.builder()
                .name("Nike Air Max 270")
                .description("Classic Nike running shoes with Max Air cushioning")
                .price(new BigDecimal("129.99"))
                .stockQuantity(100)
                .category("Clothing")
                .imageUrl("https://via.placeholder.com/300x300?text=Nike+Air+Max")
                .active(true).build(),

            Product.builder()
                .name("Levi's 501 Original Jeans")
                .description("The original straight fit jeans in premium denim")
                .price(new BigDecimal("69.99"))
                .stockQuantity(150)
                .category("Clothing")
                .imageUrl("https://via.placeholder.com/300x300?text=Levis+Jeans")
                .active(true).build(),

            // Books
            Product.builder()
                .name("Clean Code by Robert Martin")
                .description("A handbook of agile software craftsmanship - must read for developers")
                .price(new BigDecimal("34.99"))
                .stockQuantity(200)
                .category("Books")
                .imageUrl("https://via.placeholder.com/300x300?text=Clean+Code")
                .active(true).build(),

            Product.builder()
                .name("Spring Boot in Action")
                .description("Complete guide to building Spring Boot applications")
                .price(new BigDecimal("44.99"))
                .stockQuantity(120)
                .category("Books")
                .imageUrl("https://via.placeholder.com/300x300?text=Spring+Boot")
                .active(true).build(),

            // Home
            Product.builder()
                .name("Instant Pot Duo 7-in-1")
                .description("Electric pressure cooker, slow cooker, rice cooker and more")
                .price(new BigDecimal("89.99"))
                .stockQuantity(60)
                .category("Home")
                .imageUrl("https://via.placeholder.com/300x300?text=Instant+Pot")
                .active(true).build(),

            Product.builder()
                .name("Dyson V15 Vacuum")
                .description("Most powerful cordless vacuum with laser dust detection")
                .price(new BigDecimal("699.99"))
                .stockQuantity(20)
                .category("Home")
                .imageUrl("https://via.placeholder.com/300x300?text=Dyson+Vacuum")
                .active(true).build()
        );

        productRepository.saveAll(products); // INSERT all products into DB
        log.info("Successfully seeded {} products into the database!", products.size());
    }
}
