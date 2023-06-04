var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("index", { title: "Arcane", myTodos: "My todos" });
});

// Saving users
const Users = [];

router.post("/todo", (req, res, next) => {
  let { name, todos } = req.body;

  let data = {
    name: name,
    todos: [todos],
  };

  //const user = Users.find(element => element.name === name)
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

router.post("/user/:id", (req, res) => {
  const search_name = req.body.search_name;
  const foundUserReq = Users.find((element) => element.name === search_name);
  if (foundUserReq) {
    //console.log(foundUserReq)
    res.json(foundUserReq);
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
