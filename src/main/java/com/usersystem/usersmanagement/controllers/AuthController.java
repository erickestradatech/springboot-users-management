package com.usersystem.usersmanagement.controllers;

import com.usersystem.usersmanagement.dao.UserDao;
import com.usersystem.usersmanagement.models.User;
import com.usersystem.usersmanagement.utils.JWTUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/login", method = RequestMethod.POST)
    public String login(@RequestBody User user) {

        User userLoggedIn = userDao.findUserByCredentials(user);
        if (userLoggedIn != null) {
            String tokenJWT = jwtUtil.create(String.valueOf(userLoggedIn.getId()), userLoggedIn.getEmail());

            return tokenJWT;
        } else {
            return "Fail";
        }
    }

}
