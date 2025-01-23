package com.security.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.security.demo.Repo.QuestionRepo;
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class QuestionController {

    @Autowired
    private QuestionRepo repo;
    @GetMapping("/allquestions")
    public ResponseEntity<?>  getallquestions(){
        System.out.println(repo.findAll());
        return new ResponseEntity<>(repo.findAll(),HttpStatus.OK);
    }
    
}
