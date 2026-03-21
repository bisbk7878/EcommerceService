package com.ecommerce.config;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

/**
 * DATA SEEDER — Fetches real products from DummyJSON on startup.
 *
 * DummyJSON (https://dummyjson.com) is a free public API that provides
 * realistic product data with actual images, prices, stock, and categories.
 *
 * Flow on startup:
 *   1. RestTemplate calls GET https://dummyjson.com/products?limit=100
 *   2. Parse JSON → map each product to our Product entity
 *   3. productRepository.saveAll() → bulk INSERT into H2 DB
 *   4. If the API is unreachable → fall back to hardcoded samples
 *
 * You can verify the data in H2 Console: SELECT * FROM PRODUCTS;
 */
@Component
@RequiredArgsConstructor
@Slf4j
public class DataSeeder implements CommandLineRunner {

    private final ProductRepository productRepository;

    private static final String DUMMY_JSON_URL =
        "https://dummyjson.com/products?limit=100&select=title,description,price,stock,category,thumbnail,brand";

    @Override
    public void run(String... args) {
        if (productRepository.count() > 0) {
            log.info("Database already has {} products — skipping seed.", productRepository.count());
            return;
        }

        log.info("Fetching products from DummyJSON API: {}", DUMMY_JSON_URL);

        try {
            RestTemplate restTemplate = new RestTemplate();
            ObjectMapper mapper = new ObjectMapper();

            // HTTP GET → DummyJSON returns JSON string
            String response = restTemplate.getForObject(DUMMY_JSON_URL, String.class);
            JsonNode root = mapper.readTree(response);
            JsonNode productsNode = root.get("products");

            if (productsNode == null || !productsNode.isArray()) {
                throw new RuntimeException("Unexpected response from DummyJSON");
            }

            List<Product> products = new ArrayList<>();

            int index = 0;
            for (JsonNode node : productsNode) {
                String rawCategory = node.path("category").asText("General");
                String category    = formatCategory(rawCategory);
                String brand       = node.path("brand").asText("").trim();
                String title       = node.path("title").asText("Product");
                String description = node.path("description").asText("");
                double priceRaw    = node.path("price").asDouble(9.99);
                int stock          = node.path("stock").asInt(10);
                String imageUrl    = node.path("thumbnail").asText("");

                // Enrich description with brand if available
                String fullDescription = brand.isEmpty()
                    ? description
                    : description + "  |  Brand: " + brand;

                Product product = Product.builder()
                    .name(title)
                    .description(fullDescription)
                    .price(BigDecimal.valueOf(priceRaw).setScale(2, RoundingMode.HALF_UP))
                    .stockQuantity(stock)
                    .category(category)
                    .imageUrl(imageUrl)
                    .active(true)
                    // Add modern UI fields
                    .rating(4.0 + (Math.random() * 1.0))  // Random rating 4.0-5.0
                    .reviewCount(50 + (int)(Math.random() * 450))  // Random reviews 50-500
                    .featured(index < 6)  // Mark first 6 as featured
                    .build();

                products.add(product);
                index++;
            }

            // Bulk INSERT into DB — one transaction, very fast
            productRepository.saveAll(products);

            log.info("Successfully loaded {} real products from DummyJSON into the database!", products.size());
            log.info("Categories found: {}", productRepository.findAllCategories());

        } catch (Exception e) {
            log.error("Could not fetch from DummyJSON ({}). Falling back to built-in samples.", e.getMessage());
            seedFallbackProducts();
        }
    }

    /**
     * Formats DummyJSON category slugs into readable names.
     *
     * Examples:
     *   "smartphones"   → "Smartphones"
     *   "mens-shirts"   → "Mens Shirts"
     *   "skin-care"     → "Skin Care"
     *   "womens-jewellery" → "Womens Jewellery"
     */
    private String formatCategory(String raw) {
        if (raw == null || raw.isBlank()) return "General";
        String[] words = raw.replace("-", " ").split(" ");
        StringBuilder sb = new StringBuilder();
        for (String word : words) {
            if (!word.isEmpty()) {
                sb.append(Character.toUpperCase(word.charAt(0)))
                  .append(word.substring(1).toLowerCase())
                  .append(" ");
            }
        }
        return sb.toString().trim();
    }

    /**
     * FALLBACK products — used only when DummyJSON is unreachable.
     * Ensures the app always starts with some data.
     */
    private void seedFallbackProducts() {
        log.info("Seeding fallback products...");
        List<Product> fallback = List.of(
            Product.builder()
                .name("iPhone 15 Pro").category("Smartphones")
                .description("Latest Apple smartphone with titanium design and A17 Pro chip.  |  Brand: Apple")
                .price(new BigDecimal("999.99")).stockQuantity(50)
                .imageUrl("https://cdn.dummyjson.com/products/images/smartphones/iPhone%2015%20Pro/thumbnail.png")
                .active(true)
                .rating(4.8).reviewCount(342).featured(true)
                .build(),

            Product.builder()
                .name("Samsung Galaxy S23 Ultra").category("Smartphones")
                .description("200MP camera, built-in S Pen, and Snapdragon 8 Gen 2 processor.  |  Brand: Samsung")
                .price(new BigDecimal("1199.99")).stockQuantity(35)
                .imageUrl("https://cdn.dummyjson.com/products/images/smartphones/Samsung%20Galaxy%20S23%20Ultra/thumbnail.png")
                .active(true)
                .rating(4.7).reviewCount(298).featured(true)
                .build(),

            Product.builder()
                .name("MacBook Pro 16-Inch").category("Laptops")
                .description("M3 Pro chip, 22-hour battery, and Liquid Retina XDR display.  |  Brand: Apple")
                .price(new BigDecimal("2499.99")).stockQuantity(20)
                .imageUrl("https://cdn.dummyjson.com/products/images/laptops/Apple%20MacBook%20Pro%2014%20Inch%20Space%20Grey/thumbnail.png")
                .active(true)
                .rating(4.9).reviewCount(156).featured(true)
                .build(),

            Product.builder()
                .name("Sony WH-1000XM5").category("Audio")
                .description("Industry-leading noise cancelling, 30-hour battery life.  |  Brand: Sony")
                .price(new BigDecimal("349.99")).stockQuantity(75)
                .imageUrl("https://cdn.dummyjson.com/products/images/mobile-accessories/Apple%20AirPods%20Max%20Silver/thumbnail.png")
                .active(true)
                .rating(4.6).reviewCount(425).featured(true)
                .build(),

            Product.builder()
                .name("Nike Air Max 270").category("Footwear")
                .description("Lightweight everyday sneaker with Max Air cushioning unit.  |  Brand: Nike")
                .price(new BigDecimal("129.99")).stockQuantity(100)
                .imageUrl("https://cdn.dummyjson.com/products/images/womens-shoes/Knitted%20Slip-Ons/thumbnail.png")
                .active(true)
                .rating(4.5).reviewCount(389).featured(true)
                .build(),

            Product.builder()
                .name("Dyson V15 Detect").category("Home Appliances")
                .description("Most powerful Dyson cordless vacuum with laser dust detection.  |  Brand: Dyson")
                .price(new BigDecimal("699.99")).stockQuantity(25)
                .imageUrl("https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png")
                .active(true)
                .rating(4.7).reviewCount(213).featured(true)
                .build()
        );
        productRepository.saveAll(fallback);
        log.info("Seeded {} fallback products.", fallback.size());
    }
}
