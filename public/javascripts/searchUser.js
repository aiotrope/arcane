"use strict";

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  let searchName = document.querySelector("#search-name");
  const url = `http://localhost:3000/user/${searchName.value}`;
  const deleteUserResponse = document.querySelector("#delete-todo-response");
  var userInfo = document.getElementById("user-info");

  fetch(url)
    .then((res) => {
      res.json().then((data) => {
        //console.log(data);
        let user = data?.result?.name;
        let todos = data?.result?.todos;

        if (user) {
          const userName = document.createElement("p");
          const deleteButton = document.createElement("button");
          deleteButton.setAttribute("id", "delete-user");
          deleteButton.className = `del-${user}`;
          userName.innerHTML = `Name: ${user}`;
          deleteButton.innerHTML = `Delete ${user}`;

          userInfo.appendChild(userName);

          for (var x = 0; x < todos.length; x++) {
            //console.log(element)
            const userTodos = document.createElement("button");
            todos.toString();
            var outputValues = todos[x];

            userTodos.className = "delete-task";
            let taskAttr = `del-${user}-${outputValues}`;
            userTodos.setAttribute("id", taskAttr);
            const taskName = document.createTextNode(outputValues);
            userTodos.appendChild(taskName);
            userInfo.appendChild(userTodos);

            var taskSelector = document.querySelector(".delete-task");
            userTodos.onclick = function () {
              let data = { search_name: user, todo: taskSelector };
              const settings = {
                method: "PUT",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              };

              fetch(`http://localhost:3000/user`, settings)
                .then((res) =>
                  res
                    .json()
                    .then((data) => {
                      const responses = document.createElement("p");
                      responses.innerHTML = data.message;
                      taskSelector.remove();
                      deleteUserResponse.appendChild(responses);

                      setTimeout(() => {
                        responses.remove();
                        window.location.reload();
                      }, 1000);
                      return data;
                    })
                    .catch((e) => console.error(e))
                )
                .catch((e) => console.error(e));
            };
          }

          userInfo.appendChild(deleteButton);

          deleteButton.onclick = function () {
            fetch(`http://localhost:3000/user/${user}`, {
              method: "DELETE",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then((res) => {
                res
                  .json()
                  .then((data) => {
                    const userElement = document.querySelector(`#delete-user`);
                    userElement.remove();
                    userInfo.innerHTML = `<p>${data.result}</p>`;
                    setTimeout(() => {
                      userInfo.remove();
                    }, 3000);
                  })
                  .catch((e) => console.error(e));
              })
              .catch((e) => console.error(e));
          };
        } else {
          userInfo.innerHTML = `<p>User not found</p>`;
          setTimeout(() => {
            userInfo.remove();
          }, 3000);
        }
      });
    })
    .catch((e) => console.error(e));

  searchName.value = "";
});
