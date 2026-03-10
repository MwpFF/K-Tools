package com.ecommerce.tools.notificationservice.service;

import org.springframework.stereotype.Service;

import java.util.concurrent.atomic.AtomicLong;

@Service
public class NotificationStatsService {

    private final AtomicLong notificationsSent = new AtomicLong(0);
    private final AtomicLong reservedNotifications = new AtomicLong(0);

    public void recordNotification() {
        notificationsSent.incrementAndGet();
    }

    public void recordReservedNotification() {
        reservedNotifications.incrementAndGet();
    }

    public long getNotificationsSent() {
        return notificationsSent.get();
    }

    public long getReservedNotifications() {
        return reservedNotifications.get();
    }
}
