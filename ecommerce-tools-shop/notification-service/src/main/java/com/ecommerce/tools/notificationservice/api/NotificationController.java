package com.ecommerce.tools.notificationservice.api;

import com.ecommerce.tools.notificationservice.service.NotificationStatsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/notifications")
public class NotificationController {

    private final NotificationStatsService statsService;

    public NotificationController(NotificationStatsService statsService) {
        this.statsService = statsService;
    }

    @GetMapping("/stats")
    public NotificationStatsResponse getStats() {
        return new NotificationStatsResponse(
                statsService.getNotificationsSent(),
                statsService.getReservedNotifications()
        );
    }

    public record NotificationStatsResponse(long notificationsSent, long reservedNotifications) {}
}
