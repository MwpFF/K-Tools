package com.ecommerce.tools.dto;

/**
 * Order event types for Kafka.
 */
public final class OrderEventType {
    public static final String ORDER_CREATED = "ORDER_CREATED";
    public static final String STOCK_RESERVED = "STOCK_RESERVED";

    private OrderEventType() {
    }
}
