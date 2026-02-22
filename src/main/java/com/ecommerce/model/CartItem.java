package com.ecommerce.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

/**
 * CART_ITEM Entity — maps to the CART_ITEMS table.
 *
 * Each row = one product in a user's cart session.
 * Identified by sessionId (generated in the browser, stored in localStorage).
 *
 * Flow:
 *   Browser generates sessionId on first visit
 *   → Every "Add to Cart" click → POST /api/cart/add → INSERT into cart_items
 *   → Cart page loads        → GET /api/cart/{sessionId} → SELECT from cart_items
 *   → Checkout completes     → DELETE all cart_items for sessionId
 */
@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Browser session identifier (UUID generated on frontend)
    @Column(nullable = false)
    private String sessionId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    @Column(updatable = false)
    private LocalDateTime addedAt;

    @PrePersist
    protected void onCreate() {
        addedAt = LocalDateTime.now();
    }
}
