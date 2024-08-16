import store from "./Store";

class Make {
  static button(text, handler) {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", handler);
    return button;
  }

  static text(text, tag) {
    const element = document.createElement(tag);
    element.textContent = text;
    return element;
  }

  static container(className) {
    const container = document.createElement("div");
    container.classList.add(className);
    return container;
  }

  static taskBasic(text, handleDone, handleDelete, handleEdit) {
    const textElement = Make.text(text, "p");
    const checkBtn = Make.button("check", handleDone);
    const deleteBtn = Make.button("delete", handleDelete);
    const editBtn = Make.button("edit", handleEdit);

    return [checkBtn, textElement, deleteBtn, editBtn];
  }
}

class View {
  static hideCompleted = false;
  static #tasksContainer = document.getElementById("tasks-container");
  static modal = document.querySelector("dialog");
  static editProjectModal = document.getElementById("edit-project-dialog");
  static editProjectTitle = document.getElementById("edit-project-title");
  static editProjectDescription = document.getElementById(
    "edit-project-description",
  );

  static drawProject(project) {
    View.#tasksContainer.textContent = "";
    const tasks = project.tasks.map((task) => View.makeTaskContainer(task));
    View.#tasksContainer.append(...tasks);
  }

  static drawAllProjects() {
    View.#tasksContainer.textContent = "";
    View.changeActiveProjectName("All Projects");
    for (const project of store.store) {
      const container = document.createElement("div");
      const titleDiv = Make.text(project.title, "h2");
      const tasks = project.tasks.map((task) => View.makeTaskContainer(task));
      container.append(titleDiv, ...tasks);
      View.#tasksContainer.appendChild(container);
    }
  }

  // Tasks
  static makeTaskContainer(task) {
    const container = Make.container("task-container");
    if (task.done && View.hideCompleted) container.classList.add("hidden");
    container.dataset.id = task.id;

    const mainDiv = View.makeTaskDiv(task);
    const subDiv = View.makeSubTaskContainer(task.checklist);
    container.append(mainDiv, subDiv);

    return container;
  }

  static makeTaskDiv(task) {
    const container = Make.container("task");
    if (task.done) container.classList.add("done");

    container.dataset.priority = task.priority;

    const basics = Make.taskBasic(
      task.title,
      Handle.doneTaskBtn,
      Handle.deleteTaskBtn,
      Handle.editTaskBtn,
    );

    container.append(...basics);
    container.addEventListener("click", Handle.toggleTaskDetails);

    return container;
  }

  static makeSubTaskContainer(subtasks) {
    const container = Make.container("subtask-container");

    const subTaskDivs = subtasks.map((subtask) => View.makeSubTaskDiv(subtask));
    const addSubtaskBtn = Make.button("add subtask", Handle.addSubTaskBtn);

    container.append(...subTaskDivs, addSubtaskBtn);
    return container;
  }

  static makeSubTaskDiv(subtask) {
    const container = Make.container("subtask");
    container.dataset.id = subtask.id;
    if (subtask.done) container.classList.add("done");

    const basics = Make.taskBasic(
      subtask.content,
      Handle.doneSubTaskBtn,
      Handle.deleteSubTaskBtn,
      Handle.editSubTaskBtn,
    );
    container.append(...basics);

    return container;
  }

  // Projects
  static makeProjectSelectModal(projects) {
    const projectBtns = [];
    for (const project of projects) {
      const projectBtn = Make.button(
        project.title,
        Handle.projectSelect(project.id),
      );
      const editBtn = Make.button("edit", Handle.projectEditBtn);
      editBtn.dataset.id = project.id;

      const container = document.createElement("div");
      container.append(projectBtn, editBtn);

      projectBtns.push(container);
    }

    const title = Make.text("Choose a project", "h2");
    const allButton = Make.button("All projects", Handle.projectShowAllBtn);
    const addProjectBtn = Make.button("add project", Handle.projectAddBtn);

    const container = document.createElement("div");
    container.append(title, allButton, ...projectBtns, addProjectBtn);
    return container;
  }

  static changeActiveProjectName(projectName) {
    document.getElementById("active-project").textContent = projectName;
  }

  static makeProjectEditModal(project) {
    View.editProjectTitle.value = project.title;
    View.editProjectDescription.value = project.description;
    View.editProjectModal.dataset.id = project.id;
    View.editProjectModal.querySelector("button").value = project.id;
    View.editProjectModal.showModal();
  }

  static makeProjectDeleteConfirmContainer() {
    const title = View.editProjectTitle.value;
    const id = View.editProjectModal.querySelector("button").value;

    const text = Make.text(`Do you want to delete project "${title}"?`);
    const cancelBtn = Make.button("cancel", () => View.modal.close());
    const confirmBtn = Make.button("delete", Handle.projectDeleteConfirmBtn);
    confirmBtn.dataset.id = id;

    const container = document.createElement("div");
    container.append(text, confirmBtn, cancelBtn);

    return container;
  }

  static showProjectDeleteConfirmation() {
    View.modal.textContent = "";
    View.modal.append(this.makeProjectDeleteConfirmContainer());
    View.modal.showModal();
  }
}

class Handle {
  static doneTaskBtn(e) {
    const container = e.target.parentElement.parentElement;
    if (View.hideCompleted) container.classList.add("hidden");
    container.firstChild.classList.toggle("done");

    const taskId = Number(container.dataset.id);
    store.toggleTask(taskId);
  }

  static deleteTask(taskContainer) {
    const id = Number(taskContainer.dataset.id);
    store.deleteTask(id);
    taskContainer.remove();
  }

  static deleteTaskBtn(e) {
    const container = e.target.parentElement.parentElement;
    Handle.deleteTask(container);
  }

  static editTaskBtn(e) {
    console.log("edit task");
  }

  static toggleTaskDetails(e) {
    if (e.target.nodeName === "BUTTON") return;

    const target = e.target.closest(".task");
    target.nextSibling.classList.toggle("hidden");
  }

  static doneSubTaskBtn(e) {
    const container = e.target.parentElement;
    const subTaskId = Number(container.dataset.id);
    const taskId = Number(e.target.closest(".task-container").dataset.id);
    store.toggleSubTask(taskId, subTaskId);
    container.classList.toggle("done");
  }

  static deleteSubTaskBtn(e) {
    const container = e.target.parentElement;
    const subTaskId = Number(container.dataset.id);
    const taskId = Number(e.target.closest(".task-container").dataset.id);
    store.deleteSubTask(taskId, subTaskId);
    container.remove();
  }

  static editSubTaskBtn(e) {
    console.log("edit subtask");
  }

  static addSubTaskBtn(e) {
    console.log("add subtask");
  }

  static toggleHideCompletBtn() {
    const nodes = document.querySelectorAll(".task.done");
    View.hideCompleted = !View.hideCompleted;
    if (View.hideCompleted)
      nodes.forEach((node) => node.parentNode.classList.add("hidden"));
    else nodes.forEach((node) => node.parentNode.classList.remove("hidden"));
  }

  static deleteCompleteBtn() {
    const nodes = document.querySelectorAll(".task.done");
    nodes.forEach((node) => deleteTask(node.parentNode));
  }

  static projectSelect(id) {
    const project = store.getProject(id);
    return function (e) {
      View.drawProject(project);
      View.changeActiveProjectName(project.title);
      View.modal.close();
    };
  }

  static projectShowAllBtn() {
    View.drawAllProjects();
    View.modal.close();
  }

  static projectSelectModal() {
    const container = View.makeProjectSelectModal(store.getAllProjectNames());
    View.modal.textContent = "";
    View.modal.append(container);
    View.modal.showModal();
  }

  static projectAddBtn() {
    console.log("add project");
  }

  static projectEditBtn(e) {
    const projectId = Number(e.target.dataset.id);
    const project = store.getProject(projectId);
    View.makeProjectEditModal(project);
    View.modal.close();
  }

  static projectEditSubmit(e) {
    e.preventDefault();

    const title = View.editProjectTitle.value;
    const description = View.editProjectDescription.value;
    const id = Number(View.editProjectModal.dataset.id);

    console.log({ title, description, id });
    store.updateProject(id, { title, description });
    View.drawAllProjects();
    View.editProjectModal.close();
  }

  static projectDeleteBtn(e) {
    View.editProjectModal.close();
    View.showProjectDeleteConfirmation();
  }

  static projectDeleteConfirmBtn(e) {
    const projectId = Number(e.target.value);
    store.deleteProject(projectId);
    View.drawAllProjects();
    View.modal.close();
  }
}

const hideTasksBtn = document.getElementById("hideBtn");
hideTasksBtn.addEventListener("click", Handle.toggleHideCompletBtn);

const cleanTasksBtn = document.getElementById("cleanBtn");
cleanTasksBtn.addEventListener("click", Handle.deleteCompleteBtn);

const activeProject = document.getElementById("active-project");
activeProject.addEventListener("click", Handle.projectSelectModal);

View.editProjectModal.addEventListener("submit", Handle.projectEditSubmit);
const deleteBtn = document.querySelector("#edit-project-dialog button");
deleteBtn.addEventListener("click", Handle.projectDeleteBtn);

export default View;
