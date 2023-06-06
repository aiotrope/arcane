"use strict";

const saveForm = document.querySelector("#saveForm");
const saveUserResponse = document.querySelector("#save-user-response");
saveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector("#input-name");
  const inputTask = document.querySelector("#input-task");
  const url = "http://localhost:3000/todo";
  let data = { name: inputName.value, todos: inputTask.value };
  const settings = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    Cache: "default",
  };

  fetch(url, settings)
    .then((res) => {
      res
        .json()
        .then((data) => {
          //console.log(data);
          const responses = document.createElement("p");
          responses.innerHTML = data.result;
          saveUserResponse.appendChild(responses);
          setTimeout(() => {
            responses.remove();
            window.location.reload();
          }, 3000);
        })
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));

  inputName.value = "";
  inputTask.value = "";
});
