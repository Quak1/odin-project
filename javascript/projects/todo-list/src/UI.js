import store from "./Store";

function redraw() {
  const data = JSON.parse(localStorage.getItem("data"));

  const taskContainer = document.getElementById("task-container");
  for (const project of data) {
    const container = document.createElement("div");
    const titleDiv = document.createElement("h2");
    titleDiv.textContent = project.title;
    container.appendChild(titleDiv);
    for (const task of project.tasks) {
      const taskDiv = makeTaskDiv(task);
      container.appendChild(taskDiv);
    }
    taskContainer.appendChild(container);
  }
}

function checkBtnHandler(e) {
  const container = e.target.parentElement;
  const taskId = Number(container.dataset.id);
  store.toggleTask(taskId);
  container.classList.toggle("done");
}

function deleteBtnHandler(e) {
  const container = e.target.parentElement;
  const taskId = Number(container.dataset.id);
  store.deleteTask(taskId);
  container.remove();
  console.log("delete", store.store);
}

function editBtnHandler(e) {
  console.log("to edit", store.store);
}

function makeButton(text, handler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", handler);
  return button;
}

function makeTaskDiv(task) {
  const container = document.createElement("div");
  container.classList.add("task");
  container.dataset.id = task.id;

  const title = document.createElement("p");
  title.textContent = task.title;

  const checkBtn = makeButton("check", checkBtnHandler);
  const deleteBtn = makeButton("delete", deleteBtnHandler);
  const editBtn = makeButton("edit", editBtnHandler);

  if (task.done) container.classList.add("done");
  container.append(checkBtn, title, deleteBtn, editBtn);
  return container;
}

export { redraw };
