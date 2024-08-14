import { taskHandlers, subTaskHandlers } from "./handlers";

function redraw() {
  const data = JSON.parse(localStorage.getItem("data"));

  const tasksContainer = document.getElementById("tasks-container");
  for (const project of data) {
    const container = document.createElement("div");
    const titleDiv = makeTextElement(project.title, "h2");
    const tasks = project.tasks.map((task) => makeTaskContainer(task));

    container.append(titleDiv, ...tasks);
    tasksContainer.appendChild(container);
  }
}

function makeButton(text, handler) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", handler);
  return button;
}

function makeTextElement(text, tag) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function makeTaskContainer(task) {
  const container = document.createElement("div");
  container.classList.add("task-container");
  container.dataset.id = task.id;

  const mainDiv = makeMainTaskDiv(task);
  const subDiv = makeSubTaskContainer(task.checklist);
  container.append(mainDiv, subDiv);

  return container;
}

function makeTaskBasicElements(text, done, handlers) {
  const textElement = makeTextElement(text, "p");
  const checkBtn = makeButton("check", handlers.check);
  const deleteBtn = makeButton("delete", handlers.delete);
  const editBtn = makeButton("edit", handlers.edit);

  return [checkBtn, textElement, deleteBtn, editBtn];
}

function makeMainTaskDiv(task) {
  const container = document.createElement("div");
  container.classList.add("task");
  if (task.done) container.classList.add("done");

  const basics = makeTaskBasicElements(task.title, task.done, taskHandlers);
  container.append(...basics);

  return container;
}

function makeSubTaskDiv(subtask) {
  const container = document.createElement("div");
  container.classList.add("subtask");
  if (subtask.done) container.classList.add("done");
  container.dataset.id = subtask.id;

  const basics = makeTaskBasicElements(
    subtask.content,
    subtask.done,
    subTaskHandlers,
  );
  container.append(...basics);

  return container;
}

function makeSubTaskContainer(subtasks) {
  const container = document.createElement("div");
  container.classList.add("subtask-container");

  const divs = subtasks.map((subtask) => makeSubTaskDiv(subtask));
  const addSubtaskBtn = makeButton("add subtask", subTaskHandlers.add);

  container.append(...divs, addSubtaskBtn);
  return container;
}

export { redraw };
