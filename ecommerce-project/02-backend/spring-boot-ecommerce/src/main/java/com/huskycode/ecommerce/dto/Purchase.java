package com.huskycode.ecommerce.dto;

import com.huskycode.ecommerce.entity.Address;
import com.huskycode.ecommerce.entity.Customer;
import com.huskycode.ecommerce.entity.Order;
import com.huskycode.ecommerce.entity.OrderItem;
import lombok.Data;

import java.util.Set;

@Data
public class Purchase {
    private Customer customer;
    private Address shippingAddress;
    private Address billingAddress;
    private Order order;
    private Set<OrderItem> orderItems;


}
