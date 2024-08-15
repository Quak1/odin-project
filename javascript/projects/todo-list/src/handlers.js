import store from "./Store";

let hidden = false;

function checkTaskBtnHandler(e) {
  const container = e.target.parentElement;
  const taskId = Number(container.parentElement.dataset.id);
  store.toggleTask(taskId);
  container.classList.toggle("done");
  if (hidden) container.parentNode.classList.add("hidden");
}

function deleteTask(taskContainer) {
  const id = Number(taskContainer.dataset.id);
  store.deleteTask(id);
  taskContainer.remove();
}
function deleteTaskBtnHandler(e) {
  const container = e.target.parentElement.parentElement;
  deleteTask(container);
}

function editTaskBtnHandler(e) {
  console.log("edit task");
}

function taskDetailsBtnHandler(e) {
  if (e.target.nodeName === "BUTTON") return;

  const target = e.target.closest(".task");
  target.nextSibling.classList.toggle("hidden");
}

function checkSubTaskBtnHandler(e) {
  console.log(e);
  const container = e.target.parentElement;
  const subTaskId = Number(container.dataset.id);
  const taskId = Number(e.target.closest(".task-container").dataset.id);
  store.toggleSubTask(taskId, subTaskId);
  container.classList.toggle("done");
}

function deleteSubTaskBtnHandler(e) {
  const container = e.target.parentElement;
  const subTaskId = Number(container.dataset.id);
  const taskId = Number(e.target.closest(".task-container").dataset.id);
  store.deleteSubTask(taskId, subTaskId);
  container.remove();
}

function editSubTaskBtnHandler(e) {
  console.log("edit subtask", store.store);
}

function addSubTaskBtnHandler(e) {
  console.log("add subtask");
}

function toggleHideCompletedTasks() {
  const nodes = document.querySelectorAll(".task.done");
  hidden = !hidden;
  if (hidden) nodes.forEach((node) => node.parentNode.classList.add("hidden"));
  else nodes.forEach((node) => node.parentNode.classList.remove("hidden"));
}

function deleteCompletedTasks() {
  const nodes = document.querySelectorAll(".task.done");
  nodes.forEach((node) => deleteTask(node.parentNode));
}

const taskHandlers = {
  check: checkTaskBtnHandler,
  delete: deleteTaskBtnHandler,
  edit: editTaskBtnHandler,
  toggleDetails: taskDetailsBtnHandler,
  toggleCompleted: toggleHideCompletedTasks,
  deleteCompleted: deleteCompletedTasks,
};

const subTaskHandlers = {
  check: checkSubTaskBtnHandler,
  delete: deleteSubTaskBtnHandler,
  edit: editSubTaskBtnHandler,
  add: addSubTaskBtnHandler,
};

export { taskHandlers, subTaskHandlers };
