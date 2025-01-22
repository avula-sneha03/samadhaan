package com.security.demo.model;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Data
@Entity
public class Question {

   
    @Id
    @GeneratedValue
    private int id;
    private String content;
    
}
