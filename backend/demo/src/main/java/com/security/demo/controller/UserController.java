package com.security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RestController;

import com.security.demo.Repo.UserRepo;
import com.security.demo.model.Answer;
import com.security.demo.model.Question;
import com.security.demo.model.User;
import com.security.demo.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PutMapping;



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
    public ResponseEntity<?> getmyquestions(@RequestHeader("Authorization") String token) {
        return service.myquestions(token.substring(7));
    }

    @PostMapping("/addanswer/{question_id}")
    public ResponseEntity<?> addanswer(@RequestBody Answer answer,@RequestHeader("Authorization") String token,@PathVariable("question_id") int question_id) {
        return service.addAnswer( question_id,answer,token.substring(7));
    }
    
   @PostMapping("/updateanswer/{question_id}")
   public ResponseEntity<?> updateanswer(@RequestBody Answer answer,@RequestHeader("Authorization") String token,@PathVariable("question_id") int question_id) {
    return service.updateAnswer( question_id,answer,token.substring(7));
   }

   @DeleteMapping("/deleteanswer/{question_id}")
   public ResponseEntity<?> deleteanswer(@RequestBody Answer answer,@RequestHeader("Authorization") String token,@PathVariable("question_id") int question_id) {
    return service.deleteAnswer( question_id,answer,token.substring(7));
}
   
    
   

    
    
    
    
    
    
}
