package com.ecommerce.repository;

import com.ecommerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    // All items in a cart session
    List<CartItem> findBySessionId(String sessionId);

    // Find specific product in a session (to increment qty instead of duplicate)
    Optional<CartItem> findBySessionIdAndProductId(String sessionId, Long productId);

    // Clear cart after order is placed
    void deleteBySessionId(String sessionId);

    // Count items in session
    int countBySessionId(String sessionId);
}
