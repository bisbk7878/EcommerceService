package com.ecommerce.service;

import com.ecommerce.model.*;
import com.ecommerce.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.math.BigDecimal;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class OrderService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final ProductService productService;
    private final CartService cartService;

    @Transactional
    public Order checkout(CheckoutRequest request) {
        log.info("Processing checkout for customer: {}", request.getCustomerEmail());

        Customer customer = customerRepository.findByEmail(request.getCustomerEmail())
                .orElseGet(() -> {
                    Customer newCustomer = Customer.builder()
                            .name(request.getCustomerName())
                            .email(request.getCustomerEmail())
                            .phone(request.getPhone())
                            .address(request.getShippingAddress())
                            .build();
                    return customerRepository.save(newCustomer);
                });

        BigDecimal total = BigDecimal.ZERO;
        for (CheckoutRequest.CartItem item : request.getItems()) {
            Product product = productService.getProductById(item.getProductId());
            if (product.getStockQuantity() < item.getQuantity()) {
                throw new RuntimeException(
                        "Not enough stock for: " + product.getName() +
                                ". Available: " + product.getStockQuantity()
                );
            }
            total = total.add(product.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())));
        }

        Order order = Order.builder()
                .customer(customer)
                .totalAmount(total)
                .status(Order.OrderStatus.CONFIRMED)
                .shippingAddress(request.getShippingAddress())
                .build();

        for (CheckoutRequest.CartItem cartItem : request.getItems()) {
            Product product = productService.getProductById(cartItem.getProductId());
            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(cartItem.getQuantity())
                    .priceAtOrder(product.getPrice())
                    .build();
            order.getItems().add(orderItem);
            productService.reduceStock(product.getId(), cartItem.getQuantity());
        }

        Order savedOrder = orderRepository.save(order);

        // STEP 7: Clear the DB cart for this session after successful order
        if (request.getSessionId() != null && !request.getSessionId().isEmpty()) {
            cartService.clearCart(request.getSessionId());
            log.info("Cart cleared for session: {}", request.getSessionId());
        }

        log.info("Order #{} created successfully with {} items, total: ${}",
                savedOrder.getId(), savedOrder.getItems().size(), savedOrder.getTotalAmount());
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllOrderByCreatedAtDesc();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }

    public List<Order> getOrdersByCustomer(Long customerId) {
        return orderRepository.findByCustomerIdOrderByCreatedAtDesc(customerId);
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, Order.OrderStatus newStatus) {
        Order order = getOrderById(orderId);
        order.setStatus(newStatus);
        return orderRepository.save(order);
    }

    @lombok.Data
    public static class CheckoutRequest {
        private String sessionId;
        private String customerName;
        private String customerEmail;
        private String phone;
        private String shippingAddress;
        private List<CartItem> items;

        @lombok.Data
        public static class CartItem {
            private Long productId;
            private Integer quantity;
        }
    }
}