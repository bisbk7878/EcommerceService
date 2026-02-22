package com.ecommerce.repository;

import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * PRODUCT REPOSITORY
 *
 * By extending JpaRepository, Spring auto-generates all basic DB operations:
 *   - save()        → INSERT or UPDATE
 *   - findById()    → SELECT WHERE id = ?
 *   - findAll()     → SELECT *
 *   - delete()      → DELETE
 *   - count()       → COUNT(*)
 *
 * We add custom methods using Spring's "method name query" convention.
 * Spring reads the method name and writes the SQL for you!
 */
@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Spring generates: SELECT * FROM products WHERE active = true
    List<Product> findByActiveTrue();

    // Spring generates: SELECT * FROM products WHERE category = ? AND active = true
    List<Product> findByCategoryAndActiveTrue(String category);

    // Spring generates: SELECT * FROM products WHERE name LIKE %?% AND active = true
    List<Product> findByNameContainingIgnoreCaseAndActiveTrue(String name);

    // Custom JPQL query for finding low stock products
    @Query("SELECT p FROM Product p WHERE p.stockQuantity < :threshold AND p.active = true")
    List<Product> findLowStockProducts(int threshold);

    // Get all distinct categories
    @Query("SELECT DISTINCT p.category FROM Product p WHERE p.active = true")
    List<String> findAllCategories();
}
