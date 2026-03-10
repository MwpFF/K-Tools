package com.ecommerce.tools.orderservice.messaging;

import com.ecommerce.tools.dto.OrderEvent;
import com.ecommerce.tools.dto.OrderEventType;
import com.ecommerce.tools.orderservice.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class OrderEventListener {

    private static final Logger log = LoggerFactory.getLogger(OrderEventListener.class);
    private final OrderService orderService;

    public OrderEventListener(OrderService orderService) {
        this.orderService = orderService;
    }

    @KafkaListener(topics = "order-events", groupId = "order-status-group")
    public void handleOrderEvent(OrderEvent event) {
        if (!OrderEventType.STOCK_RESERVED.equals(event.getEventType()) || event.getOrderId() == null) {
            return;
        }
        log.info("Received STOCK_RESERVED for order {}", event.getOrderId());
        orderService.updateStatusToReserved(event.getOrderId());
    }
}
