package com.ecommerce.tools.inventoryservice.messaging;

import com.ecommerce.tools.dto.OrderEvent;
import com.ecommerce.tools.dto.OrderEventType;
import com.ecommerce.tools.inventoryservice.service.StockService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

@Component
public class InventoryEventListener {

    private static final Logger log = LoggerFactory.getLogger(InventoryEventListener.class);
    private static final String ORDER_EVENTS_TOPIC = "order-events";

    private final StockService stockService;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public InventoryEventListener(StockService stockService,
                                  KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.stockService = stockService;
        this.kafkaTemplate = kafkaTemplate;
    }

    @KafkaListener(topics = "order-events", groupId = "inventory-group")
    public void handleOrderEvent(OrderEvent event) {
        if (!OrderEventType.ORDER_CREATED.equals(event.getEventType())) {
            return;
        }
        String productCode = event.getProductCode();
        int quantity = event.getQuantity() != null ? event.getQuantity() : 0;
        Long orderId = event.getOrderId();

        boolean reserved = stockService.reserveStock(productCode, quantity);
        if (reserved) {
            log.info("Order {} reserved successfully", orderId);
            OrderEvent reservedEvent = new OrderEvent(orderId, OrderEventType.STOCK_RESERVED,
                    productCode, quantity, event.getProductName());
            kafkaTemplate.send(ORDER_EVENTS_TOPIC, orderId.toString(), reservedEvent);
        } else {
            log.warn("Order {} could not be reserved: insufficient stock for {} x {}", orderId, productCode, quantity);
        }
    }
}
