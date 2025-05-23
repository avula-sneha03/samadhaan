package com.security.demo.config;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.filter.OncePerRequestFilter;

import com.security.demo.service.JwtService;
import com.security.demo.service.MyUserDetailsService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
@CrossOrigin
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtService jwtService;
    @Autowired
    private ApplicationContext context;
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
         String Btoken=request.getHeader("Authorization");
         System.out.println("===============" + request.getHeaderNames());
         System.out.println(Btoken);
         String token=null;
         String username=null;
         if(Btoken!=null && Btoken.startsWith("Bearer "))
         {
            token=Btoken.substring(7);
            username=jwtService.extractUserName(token);
         }
         System.out.println(username);
         if(username!=null && SecurityContextHolder.getContext().getAuthentication()==null){
            UserDetails userDetails=context.getBean(MyUserDetailsService.class).loadUserByUsername(username);
           System.out.println(userDetails+"wvfhebhjwe");
            if(jwtService.validateToken(token,userDetails))
            {
               UsernamePasswordAuthenticationToken x= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
               x.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
               SecurityContextHolder.getContext().setAuthentication(x);
            }

         }
         filterChain.doFilter(request, response);
    }

}
