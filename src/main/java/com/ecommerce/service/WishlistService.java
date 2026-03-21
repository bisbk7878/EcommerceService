package com.ecommerce.service;

import com.ecommerce.model.Wishlist;
import com.ecommerce.repository.WishlistRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * WISHLIST SERVICE — Business logic for favorite items
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class WishlistService {

    private final WishlistRepository wishlistRepository;

    /**
     * Get all wishlist items for a user
     */
    public List<Wishlist> getWishlist(String sessionId) {
        log.info("Getting wishlist for session: {}", sessionId);
        return wishlistRepository.findBySessionId(sessionId);
    }

    /**
     * Get product IDs only (for frontend filtering)
     */
    public List<Long> getWishlistProductIds(String sessionId) {
        return wishlistRepository.findBySessionId(sessionId)
            .stream()
            .map(Wishlist::getProductId)
            .toList();
    }

    /**
     * Add product to wishlist
     */
    public Wishlist addToWishlist(String sessionId, Long productId) {
        log.info("Adding product {} to wishlist for session: {}", productId, sessionId);

        // Check if already exists
        if (wishlistRepository.findBySessionIdAndProductId(sessionId, productId).isPresent()) {
            log.warn("Product {} already in wishlist for session: {}", productId, sessionId);
            return wishlistRepository.findBySessionIdAndProductId(sessionId, productId).get();
        }

        Wishlist item = Wishlist.builder()
            .sessionId(sessionId)
            .productId(productId)
            .build();

        return wishlistRepository.save(item);
    }

    /**
     * Remove product from wishlist
     */
    public void removeFromWishlist(String sessionId, Long productId) {
        log.info("Removing product {} from wishlist for session: {}", productId, sessionId);
        wishlistRepository.deleteBySessionIdAndProductId(sessionId, productId);
    }

    /**
     * Toggle - add if not exists, remove if exists
     */
    public boolean toggleWishlist(String sessionId, Long productId) {
        if (wishlistRepository.findBySessionIdAndProductId(sessionId, productId).isPresent()) {
            removeFromWishlist(sessionId, productId);
            return false;
        } else {
            addToWishlist(sessionId, productId);
            return true;
        }
    }

    /**
     * Clear entire wishlist
     */
    public void clearWishlist(String sessionId) {
        log.info("Clearing wishlist for session: {}", sessionId);
        wishlistRepository.deleteBySessionId(sessionId);
    }

    /**
     * Check if product is in wishlist
     */
    public boolean isInWishlist(String sessionId, Long productId) {
        return wishlistRepository.findBySessionIdAndProductId(sessionId, productId).isPresent();
    }

    /**
     * Get wishlist count
     */
    public long getWishlistCount(String sessionId) {
        return wishlistRepository.countBySessionId(sessionId);
    }
}
