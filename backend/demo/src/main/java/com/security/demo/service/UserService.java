package com.security.demo.service;

import java.util.List;

import org.aspectj.apache.bcel.generic.RET;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.security.demo.Repo.UserRepo;
import com.security.demo.model.Question;
import com.security.demo.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtService jwtService;

    private BCryptPasswordEncoder encoder=new BCryptPasswordEncoder(11);

    public ResponseEntity<User> save(User x)
    {
        x.setPassword(encoder.encode(x.getPassword()));
        if(repo.findByUsername(x.getUsername())==null)
        {
            System.out.println("inisde if");
            repo.save(x);
       return new ResponseEntity<>(x,HttpStatus.CREATED);
        }
       else
       {
        System.out.println("inside else");
        return new ResponseEntity<>(null,HttpStatus.CONFLICT);
       }
    }

    public ResponseEntity<?> validate(User x) {
       Authentication a=authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(x.getUsername(), x.getPassword()));
       if(a.isAuthenticated())
       return new ResponseEntity<>(jwtService.generateToken(x.getUsername()),HttpStatus.OK);
       return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> addquestion(Question q, String token) {
        // Extract username from the token
        String username = jwtService.extractUsername(token);
        
        // Find the user by username
        User user = repo.findByUsername(username);
        
        // Assuming the user should always be found if the token is valid
        if (user == null) {
            // Log this situation for debugging purposes
            System.err.println("User  not found for username: " + username);
            return new ResponseEntity<>("User  not found", HttpStatus.NOT_FOUND);
        }
    
        // Create a new Question object
       ;
        
        // Add the question to the user's list of questions
        List<Question> questions = user.getQuestions();
        questions.add(q); // Add the new question to the list
    
        // Save the user to persist the changes
        repo.save(user); // This will also save the new question due to cascading
    
        return new ResponseEntity<>("Question added successfully", HttpStatus.OK);
    }

    public ResponseEntity<?> myquestions(String substring) {
        String username=jwtService.extractUsername(substring);
        User user= repo.findByUsername(username);
        if (user == null) {
            // Log this situation for debugging purposes
            System.err.println("User  not found for username: " + username);
            return new ResponseEntity<>("User  not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getQuestions(),HttpStatus.OK);
    }
    
}
