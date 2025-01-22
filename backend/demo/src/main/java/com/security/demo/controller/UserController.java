package com.security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import com.security.demo.Repo.UserRepo;
import com.security.demo.model.Question;
import com.security.demo.model.User;
import com.security.demo.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class UserController {

    @Autowired
    private UserService service;

    

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User x) {

        return service.save(x);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User x) {
       return service.validate(x);
       
    }

    @PostMapping("/addquestion")
    public ResponseEntity<?> add(@RequestBody Question x , @RequestHeader("Authorization") String token) {
        return service.addquestion(x,token.substring(7));
        
    }

    @GetMapping("/myquestions")
    public ResponseEntity<?> getMethodName(@RequestHeader("Authorization") String token) {
        return service.myquestions(token.substring(7));
    }
    
    
    
    
    
}
