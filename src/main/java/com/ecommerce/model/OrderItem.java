package com.ecommerce.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;

/**
 * ORDER_ITEM Entity — maps to the ORDER_ITEMS table.
 * Each row is one product line in an order.
 * e.g. "2x Nike Shoes @ $89.99 each"
 *
 * Relationships:
 *   - ManyToOne with Order
 *   - ManyToOne with Product
 */
@Entity
@Table(name = "order_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Which order this item belongs to
    // @JsonIgnore breaks the circular reference: Order → OrderItem → Order → ...
    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    private Order order;

    // Which product was ordered
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private Integer quantity;

    // Price at time of order (product price may change later)
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal priceAtOrder;

    // Computed subtotal: quantity × priceAtOrder
    public BigDecimal getSubtotal() {
        return priceAtOrder.multiply(BigDecimal.valueOf(quantity));
    }
}