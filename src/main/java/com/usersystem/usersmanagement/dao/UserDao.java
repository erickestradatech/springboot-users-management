package com.usersystem.usersmanagement.dao;

import com.usersystem.usersmanagement.models.User;

import java.util.List;

public interface UserDao {
    List<User> list();

    void delete(Long id);

    void register(User user);

    User findUserByCredentials(User user);
}
