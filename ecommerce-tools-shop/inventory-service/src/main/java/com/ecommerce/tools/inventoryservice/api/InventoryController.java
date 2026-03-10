package com.ecommerce.tools.inventoryservice.api;

import com.ecommerce.tools.inventoryservice.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/inventory")
public class InventoryController {

    private final StockService stockService;

    public InventoryController(StockService stockService) {
        this.stockService = stockService;
    }

    @GetMapping("/{productCode}")
    public InventoryResponse getStock(@PathVariable String productCode) {
        int available = stockService.getAvailable(productCode);
        return new InventoryResponse(productCode, available);
    }

    @GetMapping
    public Map<String, Integer> getAllStock() {
        return stockService.getAllStock();
    }

    public record InventoryResponse(String productCode, int availableQuantity) {}
}
