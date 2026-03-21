package com.ecommerce.repository;

import com.ecommerce.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

/**
 * WISHLIST REPOSITORY — Data access for wishlist items
 */
@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {

    /**
     * Get all wishlist items for a user (sessionId)
     */
    List<Wishlist> findBySessionId(String sessionId);

    /**
     * Check if product is already in wishlist
     */
    Optional<Wishlist> findBySessionIdAndProductId(String sessionId, Long productId);

    /**
     * Remove item from wishlist
     */
    void deleteBySessionIdAndProductId(String sessionId, Long productId);

    /**
     * Clear entire wishlist for a user
     */
    void deleteBySessionId(String sessionId);

    /**
     * Count wishlist items for a user
     */
    long countBySessionId(String sessionId);
}
