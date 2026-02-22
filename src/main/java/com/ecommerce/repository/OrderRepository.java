package com.ecommerce.repository;

import com.ecommerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {

    // All orders for a specific customer
    List<Order> findByCustomerIdOrderByCreatedAtDesc(Long customerId);

    // Orders by status
    List<Order> findByStatusOrderByCreatedAtDesc(Order.OrderStatus status);

    // Recent orders (all customers) for admin view
    @Query("SELECT o FROM Order o ORDER BY o.createdAt DESC")
    List<Order> findAllOrderByCreatedAtDesc();
}
