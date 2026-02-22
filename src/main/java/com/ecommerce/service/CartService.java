package com.ecommerce.service;

import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;

/**
 * CART SERVICE
 *
 * Manages the shopping cart backed by the CART_ITEMS table.
 *
 * Each cart is identified by a sessionId (UUID from the browser).
 * This allows multiple users to have independent carts without login.
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class CartService {

    private final CartRepository cartRepository;
    private final ProductService productService;

    /**
     * ADD item to cart.
     * If the product already exists in this session's cart → increment quantity.
     * If it's new → insert a new row.
     */
    @Transactional
    public CartItem addToCart(String sessionId, Long productId, int quantity) {
        Product product = productService.getProductById(productId);

        if (product.getStockQuantity() < quantity) {
            throw new RuntimeException("Not enough stock for: " + product.getName());
        }

        // Check if product already in cart for this session
        Optional<CartItem> existing = cartRepository.findBySessionIdAndProductId(sessionId, productId);

        if (existing.isPresent()) {
            // Increment quantity
            CartItem item = existing.get();
            int newQty = item.getQuantity() + quantity;
            if (newQty > product.getStockQuantity()) {
                throw new RuntimeException("Cannot add more than available stock");
            }
            item.setQuantity(newQty);
            CartItem saved = cartRepository.save(item); // UPDATE
            log.info("Updated cart item: session={}, product={}, qty={}", sessionId, product.getName(), newQty);
            return saved;
        } else {
            // Insert new cart item
            CartItem newItem = CartItem.builder()
                    .sessionId(sessionId)
                    .product(product)
                    .quantity(quantity)
                    .build();
            CartItem saved = cartRepository.save(newItem); // INSERT
            log.info("Added to cart: session={}, product={}, qty={}", sessionId, product.getName(), quantity);
            return saved;
        }
    }

    /** GET all items in a cart session */
    public List<CartItem> getCart(String sessionId) {
        return cartRepository.findBySessionId(sessionId);
    }

    /** UPDATE quantity of a specific item */
    @Transactional
    public CartItem updateQuantity(String sessionId, Long productId, int quantity) {
        CartItem item = cartRepository.findBySessionIdAndProductId(sessionId, productId)
                .orElseThrow(() -> new RuntimeException("Item not found in cart"));

        if (quantity <= 0) {
            cartRepository.delete(item);
            log.info("Removed from cart: session={}, product={}", sessionId, productId);
            return null;
        }

        Product product = productService.getProductById(productId);
        if (quantity > product.getStockQuantity()) {
            throw new RuntimeException("Not enough stock");
        }

        item.setQuantity(quantity);
        return cartRepository.save(item); // UPDATE
    }

    /** REMOVE a specific item from cart */
    @Transactional
    public void removeFromCart(String sessionId, Long productId) {
        cartRepository.findBySessionIdAndProductId(sessionId, productId)
                .ifPresent(item -> {
                    cartRepository.delete(item); // DELETE single item
                    log.info("Removed from cart: session={}, product={}", sessionId, productId);
                });
    }

    /** CLEAR entire cart (called after successful order) */
    @Transactional
    public void clearCart(String sessionId) {
        cartRepository.deleteBySessionId(sessionId); // DELETE all for session
        log.info("Cart cleared for session: {}", sessionId);
    }

    /** Count items in cart */
    public int getCartCount(String sessionId) {
        return cartRepository.countBySessionId(sessionId);
    }
}
