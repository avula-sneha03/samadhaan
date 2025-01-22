package com.security.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.security.demo.service.MyUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    
    @Autowired
    private MyUserDetailsService myUserDetailsService;

    @Autowired
    private JwtFilter jwtFilter;
    @Bean
    public SecurityFilterChain securityfilterchain(HttpSecurity http) throws Exception
    {
        //disable csrf
        http.csrf(a -> a.disable());
        //tell that now we need to authorize all request
        http.authorizeHttpRequests(a -> a.requestMatchers("/register","/login").permitAll().anyRequest().authenticated());
        //enable deafult form login
       // http.formLogin(Customizer.withDefaults());
        //enable thunderclient ,postman to login through them(rest ones)
        http.httpBasic(Customizer.withDefaults()); 
        //make session stateless (hr request pe na session) but this will lead to login form again n again as onece i login i get new session hence cant login
        http.sessionManagement(a->a.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        //in filter chain use jwtFilter before usernamepasswdauthfilter
        http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
/* 
    making it here so that noww we use our custom UserDetailsService rather than default one
    @Bean
    public UserDetailsService userdetailsService()
    {
        UserDetails user = User.withDefaultPasswordEncoder()
     .username("lalit")
     .password("sharma1")
     .roles("USER")
     .build();
        return new InMemoryUserDetailsManager(user);
    }
        */

     @Bean
     public AuthenticationProvider authenticationProvider()
     {
        //since AuthenticatuonProvider is a interface so cant have its object and daoautenticationprovider extends it
       DaoAuthenticationProvider myProvider= new DaoAuthenticationProvider();
       myProvider.setPasswordEncoder(new BCryptPasswordEncoder(11));
       myProvider.setUserDetailsService(myUserDetailsService);
       return myProvider; 
     }

     @Bean
     public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
      return config.getAuthenticationManager();
     }
}
