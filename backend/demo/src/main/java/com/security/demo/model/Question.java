package com.security.demo.model;

import java.util.List;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Data
@Entity
public class Question {

   
    @Id
    @GeneratedValue
    private int id;
    private String content;

    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "fk_questionid",referencedColumnName = "id")
    private List<Answer>answers;
    
}
