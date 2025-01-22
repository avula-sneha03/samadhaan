package com.security.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;



@RestController
public class Home {
    @GetMapping("/")
    public String homepage() {
        return "Welcome to home page";
    }
    
}
