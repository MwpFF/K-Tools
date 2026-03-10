package com.ecommerce.tools.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;
import java.util.Objects;

/**
 * Event published to Kafka topic "order-events".
 */
public class OrderEvent {

    private Long orderId;
    private String eventType;  // ORDER_CREATED, STOCK_RESERVED
    private String productCode;
    private Integer quantity;
    private String productName;
    private BigDecimal totalPrice;

    public OrderEvent() {
    }

    @JsonCreator
    public OrderEvent(@JsonProperty("orderId") Long orderId,
                      @JsonProperty("eventType") String eventType,
                      @JsonProperty("productCode") String productCode,
                      @JsonProperty("quantity") Integer quantity,
                      @JsonProperty("productName") String productName,
                      @JsonProperty("totalPrice") BigDecimal totalPrice) {
        this.orderId = orderId;
        this.eventType = eventType;
        this.productCode = productCode;
        this.quantity = quantity;
        this.productName = productName;
        this.totalPrice = totalPrice;
    }

    public OrderEvent(Long orderId, String eventType, String productCode, Integer quantity) {
        this(orderId, eventType, productCode, quantity, null, null);
    }

    public OrderEvent(Long orderId, String eventType, String productCode, Integer quantity, BigDecimal totalPrice) {
        this(orderId, eventType, productCode, quantity, null, totalPrice);
    }

    public OrderEvent(Long orderId, String eventType, String productCode, Integer quantity, String productName) {
        this(orderId, eventType, productCode, quantity, productName, null);
    }

    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public String getProductCode() {
        return productCode;
    }

    public void setProductCode(String productCode) {
        this.productCode = productCode;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public BigDecimal getTotalPrice() {
        return totalPrice;
    }

    public void setTotalPrice(BigDecimal totalPrice) {
        this.totalPrice = totalPrice;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        OrderEvent that = (OrderEvent) o;
        return Objects.equals(orderId, that.orderId) && Objects.equals(eventType, that.eventType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderId, eventType);
    }
}
