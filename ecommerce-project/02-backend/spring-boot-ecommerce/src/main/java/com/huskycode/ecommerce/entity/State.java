package com.huskycode.ecommerce.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="state")
@Data
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="id")
    private int id;

    @Column(name="name")
    private String name;

    @Column(name="country_id")
    private Country country;

}
