package com.security.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.security.demo.model.Answer;

public interface AnswerRepo extends JpaRepository<Answer,Integer> {

    
} 
