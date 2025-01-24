package com.security.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Answer {

    @Id
    @GeneratedValue
    private int id;
    private String content;
    
}
