"use strict";

const express = require("express");
const router = express.Router();

const Users = [];

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Arcane", users: Users });
});

// Saving user
router.post("/todo", (req, res, next) => {
  let { name, todos } = req.body;

  let data = {
    name: name,
    todos: [todos],
  };

  const foundUser = Users.findIndex((element) => element.name === name);
  if (foundUser !== -1) {
    Users[foundUser].todos.push(req.body.todos);
    //console.log([...Users]);
    res.json({ result: "Todo added" });
  } else {
    Users.push(data);

    //console.log([...Users]);
    res.json({ result: "User added" });
  }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const foundUserParams = Users.find((element) => element.name === id);
  if (foundUserParams) {
    //console.log(foundUserParams)
    res.json({ result: foundUserParams });
  } else {
    res.json({ result: "User not found" });
  }
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const foundUser = Users.find((element) => element.name === id);
  if (foundUser) {
    const index = Users.indexOf(foundUser);
    Users.splice(index, 1);
    //console.log([...Users]);
    const checkUser = Users.find((element) => element.name === id);
    if (!checkUser) res.json({ result: "User deleted" });
  } else {
    res.json({ result: "User not found" });
  }
});

router.put("/user", (req, res) => {
  const { search_name, todo } = req.body;
  const foundUser = Users.find((element) => element.name === search_name);
  if (foundUser) {
    //console.log(foundUser.todos)
    const userTodos = foundUser.todos;
    const index = userTodos.indexOf(todo);
    userTodos.splice(index, 1);
    //console.log([...userTodos]);
    console.log(foundUser)
    res.json({ message: "Task deleted", result: foundUser});
  } else {
    res.json({ message: "User not found" });
  }
});

module.exports = router;
