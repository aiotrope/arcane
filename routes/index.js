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
    console.log([...Users]);
    res.send("Todo Added");
  } else {
    Users.push(data);

    console.log([...Users]);
    res.send("User added");
  }
});

router.get("/user/:id", (req, res) => {
  const { id } = req.params;
  const foundUserParams = Users.find((element) => element.name === id);
  if (foundUserParams) {
    //console.log(foundUserParams)
    res.json(foundUserParams);
  } else {
    res.send("User not found");
  }
});

router.delete("/user/:id", (req, res) => {
  const { id } = req.params;
  const foundUserParams = Users.find((element) => element.name === id);
  if (foundUserParams) {
    const index = Users.indexOf(foundUserParams);
    Users.splice(index, 1);
    console.log([...Users]);
    const checkUser = Users.find((element) => element.name === id);
    if (!checkUser) res.send("User deleted");
  } else {
    res.send("User not found");
  }
});

module.exports = router;
