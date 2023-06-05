"use strict";

const saveForm = document.querySelector("#saveForm");
const saveUserResponse = document.querySelector("#save-user-response");
saveForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const inputName = document.querySelector("#input-name");
  const inputTask = document.querySelector("#input-task");
  const url = "http://localhost:3000/todo";

  axios
    .post(url, { name: inputName.value, todos: inputTask.value })
    .then((response) => {
      //alert(response.data);
      const responses = document.createElement("p");
      responses.innerHTML = response.data;
      saveUserResponse.appendChild(responses);
      setTimeout(() => {
        responses.remove();
      }, 3000);
    })
    .catch((err) => console.error(err));

  inputName.value = "";
  inputTask.value = "";
});
