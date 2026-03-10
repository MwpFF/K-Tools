package com.ecommerce.tools.orderservice.service;

import com.ecommerce.tools.dto.OrderEvent;
import com.ecommerce.tools.dto.OrderEventType;
import com.ecommerce.tools.orderservice.api.CreateOrderRequest;
import com.ecommerce.tools.orderservice.api.OrderDto;
import com.ecommerce.tools.orderservice.domain.Order;
import com.ecommerce.tools.orderservice.domain.OrderStatus;
import com.ecommerce.tools.orderservice.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class OrderService {

    private static final String ORDER_EVENTS_TOPIC = "order-events";
    private static final Logger log = LoggerFactory.getLogger(OrderService.class);

    private final OrderRepository orderRepository;
    private final KafkaTemplate<String, OrderEvent> kafkaTemplate;

    public OrderService(OrderRepository orderRepository,
                        KafkaTemplate<String, OrderEvent> kafkaTemplate) {
        this.orderRepository = orderRepository;
        this.kafkaTemplate = kafkaTemplate;
    }

    @Transactional
    public OrderDto createOrder(CreateOrderRequest request) {
        Order order = new Order(request.getProductCode(), request.getQuantity(), request.getUnitPrice());
        Order saved = orderRepository.save(order);

        OrderEvent event = new OrderEvent(
                saved.getId(),
                OrderEventType.ORDER_CREATED,
                request.getProductCode(),
                request.getQuantity(),
                saved.getTotalPrice()
        );
        kafkaTemplate.send(ORDER_EVENTS_TOPIC, saved.getId().toString(), event);
        log.info("Order {} created, event published to {}", saved.getId(), ORDER_EVENTS_TOPIC);

        return OrderDto.from(saved);
    }

    public Optional<OrderDto> getOrder(Long id) {
        return orderRepository.findById(id).map(OrderDto::from);
    }

    public List<OrderDto> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(OrderDto::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void updateStatusToReserved(Long orderId) {
        orderRepository.findById(orderId).ifPresent(order -> {
            order.setStatus(OrderStatus.RESERVED);
            orderRepository.save(order);
            log.info("Order {} status updated to RESERVED", orderId);
        });
    }
}
