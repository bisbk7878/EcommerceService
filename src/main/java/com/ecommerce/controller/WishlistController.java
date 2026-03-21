package com.ecommerce.controller;

import com.ecommerce.service.WishlistService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * WISHLIST REST CONTROLLER
 *
 * Endpoints:
 *   GET    /api/wishlist/{sessionId}           → Get all wishlist items
 *   POST   /api/wishlist/{sessionId}/{productId} → Add to wishlist
 *   DELETE /api/wishlist/{sessionId}/{productId} → Remove from wishlist
 *   DELETE /api/wishlist/{sessionId}           → Clear wishlist
 *   GET    /api/wishlist/{sessionId}/count     → Get wishlist count
 */
@RestController
@RequestMapping("/api/wishlist")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WishlistController {

    private final WishlistService wishlistService;

    /**
     * GET wishlist - returns product IDs
     */
    @GetMapping("/{sessionId}")
    public ResponseEntity<List<Long>> getWishlist(@PathVariable String sessionId) {
        return ResponseEntity.ok(wishlistService.getWishlistProductIds(sessionId));
    }

    /**
     * GET wishlist count
     */
    @GetMapping("/{sessionId}/count")
    public ResponseEntity<Map<String, Long>> getWishlistCount(@PathVariable String sessionId) {
        long count = wishlistService.getWishlistCount(sessionId);
        return ResponseEntity.ok(Map.of("count", count));
    }

    /**
     * ADD to wishlist
     */
    @PostMapping("/{sessionId}/{productId}")
    public ResponseEntity<?> addToWishlist(
            @PathVariable String sessionId,
            @PathVariable Long productId) {
        try {
            wishlistService.addToWishlist(sessionId, productId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Added to wishlist"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * REMOVE from wishlist
     */
    @DeleteMapping("/{sessionId}/{productId}")
    public ResponseEntity<?> removeFromWishlist(
            @PathVariable String sessionId,
            @PathVariable Long productId) {
        try {
            wishlistService.removeFromWishlist(sessionId, productId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Removed from wishlist"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * TOGGLE wishlist
     */
    @PutMapping("/{sessionId}/{productId}")
    public ResponseEntity<?> toggleWishlist(
            @PathVariable String sessionId,
            @PathVariable Long productId) {
        try {
            boolean isAdded = wishlistService.toggleWishlist(sessionId, productId);
            return ResponseEntity.ok(Map.of(
                "success", true,
                "isAdded", isAdded,
                "message", isAdded ? "Added to wishlist" : "Removed from wishlist"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * CLEAR entire wishlist
     */
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<?> clearWishlist(@PathVariable String sessionId) {
        try {
            wishlistService.clearWishlist(sessionId);
            return ResponseEntity.ok(Map.of("success", true, "message", "Wishlist cleared"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    /**
     * CHECK if product is in wishlist
     */
    @GetMapping("/{sessionId}/contains/{productId}")
    public ResponseEntity<Map<String, Boolean>> isInWishlist(
            @PathVariable String sessionId,
            @PathVariable Long productId) {
        boolean isInWishlist = wishlistService.isInWishlist(sessionId, productId);
        return ResponseEntity.ok(Map.of("isInWishlist", isInWishlist));
    }
}
