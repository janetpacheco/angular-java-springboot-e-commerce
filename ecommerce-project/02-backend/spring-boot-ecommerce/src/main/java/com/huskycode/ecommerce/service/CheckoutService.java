package com.huskycode.ecommerce.service;

import com.huskycode.ecommerce.dto.Purchase;
import com.huskycode.ecommerce.dto.PurchaseResponse;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
}
