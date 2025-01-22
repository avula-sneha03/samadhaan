package com.security.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.security.demo.Repo.UserRepo;
import com.security.demo.model.User;
import com.security.demo.model.UserDetailsClass;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User x = userRepo.findByUsername(username);
        if(x==null)
        {
            throw new UsernameNotFoundException("nOT FOUND");
        }
        else
        {
          return new UserDetailsClass(x); 
        }
    }
    
}
