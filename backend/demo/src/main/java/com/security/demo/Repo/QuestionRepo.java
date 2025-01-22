package com.security.demo.Repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.security.demo.model.Question;

@Repository
public interface QuestionRepo extends JpaRepository<Question,Integer> {
    
}
