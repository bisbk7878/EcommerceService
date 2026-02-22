package com.ecommerce.controller;

import com.ecommerce.model.CartItem;
import com.ecommerce.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

/**
 * CART REST CONTROLLER
 *
 * All endpoints use sessionId (from browser localStorage) to identify the cart.
 *
 * Endpoints:
 *   POST   /api/cart/add                         → Add item to cart (hits DB)
 *   GET    /api/cart/{sessionId}                 → Get all cart items
 *   PUT    /api/cart/{sessionId}/item/{productId}→ Update quantity
 *   DELETE /api/cart/{sessionId}/item/{productId}→ Remove single item
 *   DELETE /api/cart/{sessionId}                 → Clear entire cart
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class CartController {

    private final CartService cartService;

    /**
     * ADD to cart — called every time user clicks "Add to Cart"
     *
     * Body: { sessionId, productId, quantity }
     */
    @PostMapping("/add")
    public ResponseEntity<?> addToCart(@RequestBody AddToCartRequest request) {
        try {
            CartItem item = cartService.addToCart(
                request.getSessionId(),
                request.getProductId(),
                request.getQuantity()
            );
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * GET cart — loads all items when cart page is opened
     */
    @GetMapping("/{sessionId}")
    public ResponseEntity<List<CartItem>> getCart(@PathVariable String sessionId) {
        return ResponseEntity.ok(cartService.getCart(sessionId));
    }

    /**
     * UPDATE quantity
     */
    @PutMapping("/{sessionId}/item/{productId}")
    public ResponseEntity<?> updateQty(
            @PathVariable String sessionId,
            @PathVariable Long productId,
            @RequestParam int quantity) {
        try {
            CartItem updated = cartService.updateQuantity(sessionId, productId, quantity);
            return updated != null ? ResponseEntity.ok(updated) : ResponseEntity.ok(Map.of("removed", true));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    /**
     * REMOVE single item
     */
    @DeleteMapping("/{sessionId}/item/{productId}")
    public ResponseEntity<String> removeItem(
            @PathVariable String sessionId,
            @PathVariable Long productId) {
        cartService.removeFromCart(sessionId, productId);
        return ResponseEntity.ok("Item removed");
    }

    /**
     * CLEAR entire cart
     */
    @DeleteMapping("/{sessionId}")
    public ResponseEntity<String> clearCart(@PathVariable String sessionId) {
        cartService.clearCart(sessionId);
        return ResponseEntity.ok("Cart cleared");
    }

    // ─── Request DTO ────────────────────────────────────────────────────────
    @lombok.Data
    public static class AddToCartRequest {
        private String sessionId;
        private Long productId;
        private Integer quantity = 1;
    }
}
