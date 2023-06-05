"use strict";

function Search() {
  let searchName = document.querySelector("#search-name");
  const url = `http://localhost:3000/user/${searchName.value}`;
  const userInfo = document.querySelector("#user-info");

  axios
    .get(url)
    .then((response) => {
      const user = response?.data?.name;
      if (user) {
        const userName = document.createElement("p");
        const userTodos = document.createElement("p");
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("id", "delete-user");
        userName.innerHTML = `Name: ${response.data.name}`;
        userTodos.innerHTML = `Todos: [${response.data.todos}]`;
        deleteButton.innerHTML = `Delete ${user}`;

        userInfo.appendChild(userName);
        userInfo.appendChild(userTodos);
        userInfo.appendChild(deleteButton);
        deleteButton.onclick = function () {
          axios.delete(`http://localhost:3000/user/${user}`);
          const userElement = document.querySelector("#delete-user");
          userElement.remove();
          userInfo.innerHTML = `<p>User deleted</p>`;
          setTimeout(() => {
            userInfo.remove();
          }, 4000);
        };
      } else {
        userInfo.innerHTML = `<p>User not found</p>`;
      }
    })
    .catch((err) => console.error(err));

  searchName.value = "";
}
