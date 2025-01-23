package com.security.demo.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class Home {
    @GetMapping("/home")
    public ResponseEntity<?> homepage() {
        
       return new ResponseEntity<>("welcome",HttpStatus.OK);
    }
    
}
