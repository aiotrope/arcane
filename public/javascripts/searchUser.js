"use strict";

function Search() {
  let searchName = document.querySelector("#search-name");
  const url = `http://localhost:3000/user/${searchName.value}`;
  const userInfo = document.querySelector("#user-info");

  axios
    .get(url)
    .then((response) => {
      const user = response?.data?.name;
      const todos = response?.data?.todos;

      if (user) {
        const userName = document.createElement("p");
        for (let x = 0; x < todos.length; x++) {
          //console.log(element)
          todos.toString();
          var outputValues = todos[x];
          const userTodos = document.createElement("button");
          var newContent = document.createTextNode(outputValues);
          userTodos.appendChild(newContent);
          //const userInfoDiv = document.getElementById("user-info");
         userInfo.appendChild(userTodos)
        }
        //const userTodos = document.createElement("button");
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-user");
        userName.innerHTML = `Name: ${response.data.name}`;
        //userTodos.innerHTML = `${todos}`;
        deleteButton.innerHTML = `Delete ${user}`;

        userInfo.appendChild(userName);
        //userInfo.appendChild(userTodos);
        userInfo.appendChild(deleteButton);
        deleteButton.onclick = function () {
          axios.delete(`http://localhost:3000/user/${user}`);
          const userElement = document.querySelector("#delete-user");
          userElement.remove();
          userInfo.innerHTML = `<p>User deleted</p>`;
          setTimeout(() => {
            userInfo.remove();
          }, 3000);
        };
      } else {
        userInfo.innerHTML = `<p>User not found</p>`;
        setTimeout(() => {
          userInfo.remove();
        }, 3000);
      }
    })
    .catch((err) => console.error(err));

  searchName.value = "";
}
