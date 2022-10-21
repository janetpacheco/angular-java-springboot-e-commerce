package com.huskycode.ecommerce.service;

import com.huskycode.ecommerce.dto.PaymentInfo;
import com.huskycode.ecommerce.dto.Purchase;
import com.huskycode.ecommerce.dto.PurchaseResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

public interface CheckoutService {
    PurchaseResponse placeOrder(Purchase purchase);
    PaymentIntent createPaymentIntent(PaymentInfo paymentInfo) throws StripeException;
}
