const express = require("express");
const router = express.Router();
const axios = require("axios");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Arcane" });
});

// Saving users
const Users = [];

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

// fetch single user
router.post("/user", (req, res) => {
  const search_name = req.body.search_name;
  const foundUserReq = Users.find((element) => element.name === search_name);
  if (foundUserReq) {
    //console.log(foundUserReq);
    const url = `http://localhost:3000/user/${search_name}`;

    axios.get(url)
      .then((response) => {
        console.log(response.data);
        const jsonData = response.data;
        res.send(jsonData)
      })
      .catch((error) => {
        console.error(error);
      });
  } else {
    res.send("User not found");
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
    //console.log(foundUserParams)
    res.json(foundUserParams);
  } else {
    res.send("User not found");
  }
});

module.exports = router;
