package com.usersystem.usersmanagement.controllers;

import com.usersystem.usersmanagement.dao.UserDao;
import com.usersystem.usersmanagement.models.User;
import com.usersystem.usersmanagement.utils.JWTUtil;
import de.mkammerer.argon2.Argon2;
import de.mkammerer.argon2.Argon2Factory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private JWTUtil jwtUtil;

    @RequestMapping(value = "api/users", method = RequestMethod.GET)
    public List<User> showUsers(@RequestHeader(value = "Authorization") String token) {

        if (!tokenValidate(token)) {
            return null;
        }

        return userDao.list();
    }

    public boolean tokenValidate(String token) {
        String userId = jwtUtil.getKey(token);
        return userId != null;
    }

    @RequestMapping(value = "api/users", method = RequestMethod.POST)

    public void addUser(@RequestBody User user) {
        Argon2 argon2 = Argon2Factory.create(Argon2Factory.Argon2Types.ARGON2id);
        String hash = argon2.hash(1, 1024, 1, user.getPassword());
        user.setPassword(hash);
        userDao.register(user);
    }

    @RequestMapping(value = "api/users/{id}", method = RequestMethod.DELETE)
    public void deleteUser(@RequestHeader(value = "Authorization") String token, @PathVariable Long id) {
        if (!tokenValidate(token)) {
            return;
        }

        userDao.delete(id);
    }
}
