import store from "./Store";

function checkTaskBtnHandler(e) {
  const container = e.target.parentElement;
  const taskId = Number(container.parentElement.dataset.id);
  store.toggleTask(taskId);
  container.classList.toggle("done");
}

function deleteTaskBtnHandler(e) {
  const container = e.target.parentElement.parentElement;
  const taskId = Number(container.dataset.id);
  store.deleteTask(taskId);
  container.remove();
}

function editTaskBtnHandler(e) {
  console.log("edit task", store.store);
}

function checkSubTaskBtnHandler(e) {
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

const taskHandlers = {
  check: checkTaskBtnHandler,
  delete: deleteTaskBtnHandler,
  edit: editTaskBtnHandler,
};

const subTaskHandlers = {
  check: checkSubTaskBtnHandler,
  delete: deleteSubTaskBtnHandler,
  edit: editSubTaskBtnHandler,
  add: addSubTaskBtnHandler,
};

export { taskHandlers, subTaskHandlers };
