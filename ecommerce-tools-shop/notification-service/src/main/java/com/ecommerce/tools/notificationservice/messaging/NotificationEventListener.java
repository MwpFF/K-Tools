package com.ecommerce.tools.notificationservice.messaging;

import com.ecommerce.tools.dto.OrderEvent;
import com.ecommerce.tools.dto.OrderEventType;
import com.ecommerce.tools.notificationservice.service.NotificationStatsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

@Component
public class NotificationEventListener {

    private static final Logger log = LoggerFactory.getLogger(NotificationEventListener.class);

    private final NotificationStatsService statsService;

    public NotificationEventListener(NotificationStatsService statsService) {
        this.statsService = statsService;
    }

    @KafkaListener(topics = "order-events", groupId = "notification-group")
    public void handleOrderEvent(OrderEvent event) {
        if (OrderEventType.ORDER_CREATED.equals(event.getEventType())) {
            String productCode = event.getProductCode();
            int quantity = event.getQuantity() != null ? event.getQuantity() : 0;
            java.math.BigDecimal total = event.getTotalPrice();
            String totalStr = total != null ? String.format("%,d₽", total.intValue()) : "N/A";
            log.info("Notification sent: {} x{} = {}", productCode, quantity, totalStr);
            statsService.recordNotification();
        } else if (OrderEventType.STOCK_RESERVED.equals(event.getEventType())) {
            log.info("Notification: Order {} reserved - {} x{}", event.getOrderId(), event.getProductCode(), event.getQuantity());
            statsService.recordReservedNotification();
        }
    }
}
