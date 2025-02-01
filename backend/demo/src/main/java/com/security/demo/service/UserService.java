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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import com.security.demo.Repo.QuestionRepo;
import com.security.demo.Repo.UserRepo;
import com.security.demo.model.Answer;
import com.security.demo.model.Question;
import com.security.demo.model.User;

@Service
public class UserService {

    @Autowired
    private UserRepo repo;
    @Autowired
    private QuestionRepo qrepo;
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
        String username = jwtService.extractUserName(token);
        
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
        String username=jwtService.extractUserName(substring);
        User user= repo.findByUsername(username);
        if (user == null) {
            // Log this situation for debugging purposes
            System.err.println("User  not found for username: " + username);
            return new ResponseEntity<>("User  not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(user.getQuestions(),HttpStatus.OK);
    }

    public ResponseEntity<?> addAnswer(int question_id, Answer answer, String token) {
        // Retrieve the question by ID
        Question q = qrepo.findById(question_id).orElse(null);
        if (q == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
        
        // Add the answer to the question's list of answers
        List<Answer> answers = q.getAnswers();
        answers.add(answer);
        qrepo.save(q);
    
        // Extract the username from the token
        String username = jwtService.extractUserName(token);
    
        // Find the user by username
        User user = repo.findByUsername(username);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        }
        if(user.getQuestions().contains(q)==true)
        {
            return new ResponseEntity<>("Hello you cant answer your own question",HttpStatus.CONFLICT);
        }
    
        // Add the answer to the user's list of answers
        List<Answer> userAnswers = user.getAnswers();
        userAnswers.add(answer);
        repo.save(user); // Save the updated user entity
    
        // Return a success response
        return new ResponseEntity<>("Answer added successfully", HttpStatus.OK);
    }




    public ResponseEntity<?> updateAnswer(int questionId, Answer updatedAnswer, String token) {
        // Find the question
        Question question = qrepo.findById(questionId).orElse(null);
        if (question == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
    
        // Extract username from token
        String username = jwtService.extractUserName(token);
        User user = repo.findByUsername(username);
    
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.UNAUTHORIZED);
        }
    
        // Check if the answer exists in the question's answer list
        boolean isUpdated = false;
        for (Answer answer : question.getAnswers()) {
            if (answer.getId() == updatedAnswer.getId()) {
                answer.setContent(updatedAnswer.getContent());
                isUpdated = true;
                break;
            }
        }
    
        // Check if the answer exists in the user's answer list
        for (Answer answer : user.getAnswers()) {
            if (answer.getId() == updatedAnswer.getId()) {
                answer.setContent(updatedAnswer.getContent());
                break;
            }
        }
    
        if (!isUpdated) {
            return new ResponseEntity<>("Answer not found in the question", HttpStatus.NOT_FOUND);
        }
    
        // Save changes to the database
        qrepo.save(question);
        repo.save(user);
    
        return new ResponseEntity<>("Answer updated", HttpStatus.OK);
    }




    public ResponseEntity<?> deleteAnswer(int questionId, Answer answerToDelete, String token) {
       
        Question question = qrepo.findById(questionId).orElse(null);
        if (question == null) {
            return new ResponseEntity<>("Question not found", HttpStatus.NOT_FOUND);
        }
    
        // Extract username from token
        String username = jwtService.extractUserName(token);
        User user = repo.findByUsername(username);
    
        if (user == null) {
            return new ResponseEntity<>("User  not found", HttpStatus.UNAUTHORIZED);
        }
    
        // Check if the answer exists in the question's answer list
        boolean isDeleted = question.getAnswers().removeIf(answer -> answer.getId() == answerToDelete.getId());
    
        // Optionally, check if the answer exists in the user's answer list
        // This part is optional based on your requirements
        user.getAnswers().removeIf(answer -> answer.getId() == answerToDelete.getId());
    
        if (!isDeleted) {
            return new ResponseEntity<>("Answer not found in the question", HttpStatus.NOT_FOUND);
        }
    
        // Save changes to the database
        qrepo.save(question);
        repo.save(user); // Save user if you modified the user's answer list
    
        return new ResponseEntity<>("Answer deleted", HttpStatus.OK);
}

public ResponseEntity<?> updateQuestion(int question_id, Question x, String token) {
    // Find the question by ID
    Question q = qrepo.findById(question_id).orElse(null);
    
    if (q == null) {
        return new ResponseEntity<>("Question does not exist", HttpStatus.NOT_FOUND);
    }
    
    // Extract username from the token
    String username = jwtService.extractUserName(token);
    
    // Find the user by username
    User user = repo.findByUsername(username);
    
    if (user == null) {
        return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
    }

    // Ensure the question belongs to the user
    if (!user.getQuestions().contains(q)) {
        return new ResponseEntity<>("You are not authorized to update this question", HttpStatus.UNAUTHORIZED);
    }
    
    // Update question content
    q.setContent(x.getContent());

    // Save the updated question
    qrepo.save(q);

    repo.save(user);
    
    return new ResponseEntity<>("Question updated successfully", HttpStatus.OK);
}

public ResponseEntity<?> deleteQuestion(int question_id, String token) {
    // Find the question by ID
    Question question = qrepo.findById(question_id).orElse(null);
    if (question == null) {
        return new ResponseEntity<>("Question does not exist", HttpStatus.NOT_FOUND);
    }

    // Extract username from the token
    String username = jwtService.extractUserName(token);
    User user = repo.findByUsername(username);
    if (user == null) {
        return new ResponseEntity<>("User  not found", HttpStatus.UNAUTHORIZED);
    }

    // Check if the question belongs to the user
    List<Question> userQuestions = user.getQuestions();
    boolean isRemoved = userQuestions.removeIf(item -> item.getId() == question_id);

    if (!isRemoved) {
        return new ResponseEntity<>("Question does not belong to the user", HttpStatus.FORBIDDEN);
    }

    // Save the user to trigger cascading delete
    repo.save(user);
    qrepo.delete(question);

    return new ResponseEntity<>("Question deleted successfully", HttpStatus.OK);
}

    
    
    

    
    
}
