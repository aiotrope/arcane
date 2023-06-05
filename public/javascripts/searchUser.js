"use strict";

function Search() {
  let searchName = document.querySelector("#search-name");
  const url = `http://localhost:3000/user/${searchName.value}`;
  const deleteUserResponse = document.querySelector("#delete-todo-response");

  axios
    .get(url)
    .then((response) => {
      const user = response?.data?.name;
      const todos = response?.data?.todos;

      if (user) {
        const userInfo = document.querySelector("#user-info");
        const userName = document.createElement("p");
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-user");
        userName.innerHTML = `Name: ${response.data.name}`;
        deleteButton.innerHTML = `Delete ${user}`;

        userInfo.appendChild(userName);

        for (let x = 0; x < todos.length; x++) {
          //console.log(element)
          const userTodos = document.createElement("button");
          todos.toString();
          const outputValues = todos[x];

          userTodos.className = "delete-task";
          let taskAttr = `del-${user}-${outputValues}`;
          userTodos.setAttribute("id", taskAttr);
          const taskName = document.createTextNode(outputValues);
          userTodos.appendChild(taskName);
          userInfo.appendChild(userTodos);

          let taskSelector = document.querySelector(
            `#del-${user}-${outputValues}`
          );
          userTodos.onclick = function () {
            axios
              .put(`http://localhost:3000/user/${user}`, { todo: taskSelector })
              .then((response) => {
                const responses = document.createElement("p");
                responses.innerHTML = response.data;
                taskSelector.remove();
                deleteUserResponse.appendChild(responses);
                setTimeout(() => {
                  responses.remove();
                }, 3000);
              })
              .catch((err) => console.error(err));
          };
        }

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
