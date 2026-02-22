package com.ecommerce.controller;

import com.ecommerce.model.Order;
import com.ecommerce.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 * ORDER REST CONTROLLER
 *
 * Available endpoints:
 *   POST /api/orders/checkout       → Place an order (main flow)
 *   GET  /api/orders                → All orders
 *   GET  /api/orders/{id}           → Single order with items
 *   PUT  /api/orders/{id}/status    → Update order status
 */
@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class OrderController {

    private final OrderService orderService;

    /**
     * CHECKOUT endpoint — this is the main data flow:
     * Frontend sends cart → Backend creates Order + OrderItems → Saves to DB
     *
     * POST /api/orders/checkout
     * Body: { customerName, customerEmail, phone, shippingAddress, items: [{productId, quantity}] }
     */
    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@RequestBody OrderService.CheckoutRequest request) {
        try {
            Order order = orderService.checkout(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(order);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrders());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return ResponseEntity.ok(orderService.getOrderById(id));
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Order> updateStatus(
            @PathVariable Long id,
            @RequestParam Order.OrderStatus status) {
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
