package com.ecommerce.tools.inventoryservice.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * In-memory stock storage. Key = productCode, Value = available quantity.
 */
@Service
public class StockService {

    private final Map<String, Integer> stock = new ConcurrentHashMap<>();

    public StockService() {
        stock.put("PERF001", 50);   // Bosch Perforator
        stock.put("DRILL001", 30);  // Drill
        stock.put("SAW001", 25);    // Saw
    }

    public int getAvailable(String productCode) {
        return stock.getOrDefault(productCode, 0);
    }

    public boolean reserve(String productCode, int quantity) {
        int available = getAvailable(productCode);
        if (available < quantity) return false;
        stock.put(productCode, available - quantity);
        return true;
    }

    public boolean reserveStock(String productCode, int quantity) {
        return reserve(productCode, quantity);
    }

    public Map<String, Integer> getAllStock() {
        return Map.copyOf(stock);
    }
}
