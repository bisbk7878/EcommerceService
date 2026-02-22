package com.ecommerce.service;

import com.ecommerce.model.Product;
import com.ecommerce.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

/**
 * PRODUCT SERVICE
 *
 * This layer contains all the business logic.
 * Controllers call service → Service calls repository → Repository hits DB.
 *
 * @Transactional ensures DB operations either ALL succeed or ALL rollback.
 */
@Service
@RequiredArgsConstructor // Lombok: injects dependencies via constructor
@Slf4j                  // Lombok: gives us a logger
public class ProductService {

    private final ProductRepository productRepository;

    /** Get all active products */
    public List<Product> getAllProducts() {
        log.info("Fetching all active products");
        return productRepository.findByActiveTrue();
    }

    /** Get product by ID — throws if not found */
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    /** Get products by category */
    public List<Product> getProductsByCategory(String category) {
        return productRepository.findByCategoryAndActiveTrue(category);
    }

    /** Search products by name */
    public List<Product> searchProducts(String keyword) {
        return productRepository.findByNameContainingIgnoreCaseAndActiveTrue(keyword);
    }

    /** Get all categories */
    public List<String> getAllCategories() {
        return productRepository.findAllCategories();
    }

    /** CREATE product — saves to DB */
    @Transactional
    public Product createProduct(Product product) {
        log.info("Creating new product: {}", product.getName());
        Product saved = productRepository.save(product); // INSERT into DB
        log.info("Product saved with ID: {}", saved.getId());
        return saved;
    }

    /** UPDATE product */
    @Transactional
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existing = getProductById(id);
        existing.setName(updatedProduct.getName());
        existing.setDescription(updatedProduct.getDescription());
        existing.setPrice(updatedProduct.getPrice());
        existing.setStockQuantity(updatedProduct.getStockQuantity());
        existing.setCategory(updatedProduct.getCategory());
        existing.setImageUrl(updatedProduct.getImageUrl());
        return productRepository.save(existing); // UPDATE in DB
    }

    /** Reduce stock when order is placed */
    @Transactional
    public void reduceStock(Long productId, int quantity) {
        Product product = getProductById(productId);
        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Insufficient stock for: " + product.getName());
        }
        product.setStockQuantity(product.getStockQuantity() - quantity);
        productRepository.save(product);
        log.info("Stock reduced for product {} by {}", product.getName(), quantity);
    }

    /** Soft delete — marks as inactive instead of deleting from DB */
    @Transactional
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        product.setActive(false);
        productRepository.save(product);
        log.info("Product {} marked as inactive", id);
    }
}
