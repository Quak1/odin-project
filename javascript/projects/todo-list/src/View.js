import { differenceInCalendarDays, format } from "date-fns";
import Handle from "./Handle";
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

    const checkBtn = Make.button("", handleDone);
    checkBtn.classList.add("checkBtn");
    const deleteBtn = Make.button("", handleDelete);
    deleteBtn.classList.add("deleteBtn");
    const editBtn = Make.button("", handleEdit);
    editBtn.classList.add("editBtn");

    const rightContainer = Make.container("right");
    const btnContainer = Make.container("taskBtns");
    btnContainer.append(editBtn, deleteBtn);
    rightContainer.append(btnContainer);

    return { text: textElement, checkBtn, rightContainer };
  }
}

class View {
  static activeProject = -1;
  static hideCompleted = false;
  static #tasksContainer = document.getElementById("tasks-container");
  static sortState = "";
  static modal = document.querySelector("dialog");
  static editProject = {
    modal: document.getElementById("edit-project-dialog"),
    title: document.getElementById("edit-project-title"),
    description: document.getElementById("edit-project-description"),
    ghostBtn: document.querySelector("#edit-project-dialog button"),
  };
  static editTask = {
    modal: document.getElementById("edit-task-dialog"),
    title: document.getElementById("edit-task-title"),
    description: document.getElementById("edit-task-description"),
    priority: document.getElementById("edit-task-priority"),
    dueDate: document.getElementById("edit-task-dueDate"),
    ghostBtn: document.querySelector("#edit-task-dialog button"),
  };
  static editSubtask = {
    modal: document.getElementById("edit-subtask-dialog"),
    content: document.getElementById("edit-subtask-content"),
    ghostBtn: document.querySelector("#edit-subtask-dialog button"),
  };
  static actionBtns = {
    sort: document.getElementById("sortBtn"),
    hideTasks: document.getElementById("hideBtn"),
    cleanTasks: document.getElementById("cleanBtn"),
    newTask: document.getElementById("newBtn"),
  };

  static showProject(project) {
    this.changeActiveProject(project);
    this.#tasksContainer.textContent = "";
    const sorted = View.sortTasks(project.tasks);
    console.log(sorted);
    const tasks = sorted.map((task) => this.makeTaskContainer(task));
    this.#tasksContainer.append(...tasks);
  }

  static showAllProjects(projects) {
    this.#tasksContainer.textContent = "";
    this.changeActiveProject({ title: "All Projects", id: 0 });
    for (const project of projects) {
      const container = document.createElement("div");
      const titleDiv = Make.text(project.title, "h2");
      const tasks = View.sortTasks(project.tasks).map((task) =>
        this.makeTaskContainer(task),
      );
      if (project.id === 0) container.append(...tasks);
      else container.append(titleDiv, ...tasks);
      this.#tasksContainer.appendChild(container);
    }
  }

  static redrawCurrent() {
    if (View.activeProject === 0) View.showAllProjects(store.store);
    else {
      const project = store.getProject(View.activeProject);
      View.showProject(project);
    }
  }

  static sortTasks(tasks) {
    if (this.sortState === "") {
      return tasks;
    } else if (this.sortState === "increasing") {
      return tasks.toSorted((a, b) => {
        if (a.dueDate === "" || b.dueDate === "") return b.dueDate - a.dueDate;
        return a.dueDate - b.dueDate;
      });
    } else if (this.sortState === "decreasing") {
      return tasks.toSorted((a, b) => {
        if (a.dueDate === "" || b.dueDate === "") return a.dueDate - b.dueDate;
        return b.dueDate - a.dueDate;
      });
    }
  }

  // Tasks
  static makeTaskContainer(task) {
    const container = Make.container("task-container");
    if (task.done && this.hideCompleted) container.classList.add("hidden");
    container.dataset.id = task.id;

    const mainDiv = this.makeTaskDiv(task);
    const description = Make.text(task.description, "div");
    description.classList.add("description");
    const subDiv = this.makeSubtaskContainer(task.checklist);
    subDiv.classList.add("hidden");
    container.append(mainDiv, description, subDiv);

    return container;
  }

  static makeTaskDiv(task) {
    const container = Make.container("task");
    if (task.done) container.classList.add("done");
    container.dataset.priority = task.priority;

    const { text, checkBtn, rightContainer } = Make.taskBasic(
      task.title,
      Handle.taskDoneBtn,
      Handle.taskDeleteBtn,
      Handle.taskEditBtn,
    );

    let dueDateText = Make.text("", "p");
    if (task.dueDate !== "") {
      const diff = differenceInCalendarDays(task.dueDate, new Date());
      let dueDate;
      if (diff === 0) {
        dueDate = "Today";
      } else if (diff === 1) {
        dueDate = "Tomorrow";
      } else if (diff === -1) {
        dueDate = "Yesterday";
      } else if (diff < -1) {
        dueDate = Math.abs(diff) + " days ago";
      } else if (diff <= 7) {
        dueDate = "next " + format(task.dueDate, "EEEE");
      } else {
        dueDate = format(task.dueDate, "d MMM yyyy");
      }
      dueDateText.textContent = dueDate;
    }

    rightContainer.prepend(dueDateText);

    container.append(checkBtn, text, rightContainer);
    container.addEventListener("click", Handle.taskToggleDetailsClick);

    return container;
  }

  static makeSubtaskContainer(subtasks) {
    const container = Make.container("subtask-container");

    const subtaskDivs = subtasks.map((subtask) => this.makeSubtaskDiv(subtask));
    const addSubtaskBtn = Make.button("add subtask", Handle.subtaskAddBtn);

    container.append(...subtaskDivs, addSubtaskBtn);
    return container;
  }

  static makeSubtaskDiv(subtask) {
    const container = Make.container("subtask");
    container.dataset.id = subtask.id;
    if (subtask.done) container.classList.add("done");

    const { text, checkBtn, rightContainer } = Make.taskBasic(
      subtask.content,
      Handle.subtaskToggleDoneBtn,
      Handle.subtaskDeleteBtn,
      Handle.subtaskEditBtn,
    );

    container.append(checkBtn, text, rightContainer);

    return container;
  }

  static toggleTaskDetails(child) {
    const taskContainer = child.closest(".task-container");
    taskContainer
      .querySelector(".subtask-container")
      .classList.toggle("hidden");
  }

  static toggleSubtaskDone(child) {
    const container = child.closest(".subtask");
    container.classList.toggle("done");
  }

  static getTaskIdByNode(child) {
    const id = child.closest(".task-container").dataset.id;
    return Number(id);
  }

  static getSubtaskIdByNode(child) {
    const taskId = this.getTaskIdByNode(child);
    const subtaskId = Number(child.closest(".subtask").dataset.id);
    return { taskId, subtaskId };
  }

  static deleteSubtaskContainer(child) {
    const container = child.closest(".subtask");
    container.remove();
  }

  static toggleHideCompleteTasks() {
    const nodes = document.querySelectorAll(".task.done");
    this.hideCompleted = !this.hideCompleted;
    if (this.hideCompleted)
      nodes.forEach((node) => node.parentNode.classList.add("hidden"));
    else nodes.forEach((node) => node.parentNode.classList.remove("hidden"));
    this.actionBtns.hideTasks.classList.toggle("off");
  }

  static deleteDoneTaskContainers() {
    const nodes = document.querySelectorAll(".task.done");
    nodes.forEach((node) => node.parentNode.remove());
  }

  // Projects
  static makeProjectSelectModal(projects) {
    const projectBtns = [];
    for (const project of projects) {
      if (project.id === 0) continue;

      const projectBtn = Make.button(
        project.title,
        Handle.projectSelectBtn(project.id),
      );
      const editBtn = Make.button("", Handle.projectEditBtn);
      editBtn.dataset.id = project.id;
      editBtn.classList.add("edit");
      editBtn.title = "edit project";

      const container = document.createElement("div");
      container.classList.add("project");
      container.append(projectBtn, editBtn);

      projectBtns.push(container);
    }

    const title = Make.text("Choose a project", "h2");
    const allButton = Make.button("All projects", Handle.projectShowAllBtn);
    const addProjectBtn = Make.button("add project", Handle.projectAddBtn);
    addProjectBtn.classList.add("add");

    const container = document.createElement("div");
    container.classList.add("projects");
    container.append(title, allButton, ...projectBtns, addProjectBtn);
    return container;
  }

  static changeActiveProject(project) {
    document.getElementById("active-project").textContent = project.title;
    this.activeProject = project.id;
  }

  static makeProjectDeleteConfirmContainer() {
    const title = this.editProject.title.value;
    const id = this.editProject.modal.querySelector("button").value;

    const text = Make.text(`Do you want to delete project "${title}"?`, "p");
    const btnContainer = Make.container("btns");
    const cancelBtn = Make.button("cancel", () => this.modal.close());
    const confirmBtn = Make.button("delete", Handle.projectDeleteConfirmBtn);
    confirmBtn.type = "submit";
    confirmBtn.dataset.id = id;
    btnContainer.append(cancelBtn, confirmBtn);

    const container = document.createElement("div");
    container.append(text, btnContainer);

    return container;
  }

  static showProjectDeleteConfirmation() {
    this.modal.textContent = "";
    this.modal.append(this.makeProjectDeleteConfirmContainer());
    this.modal.showModal();
  }

  // Modals
  static closeModal() {
    this.modal.close();
  }

  static closeEditProjectModal() {
    View.editProject.modal.close();
  }

  static showProjectListModal(projects) {
    const container = this.makeProjectSelectModal(projects);
    this.modal.textContent = "";
    this.modal.append(container);
    this.modal.showModal();
  }

  static #changeEventListener(target, event, oldFunction, newFunction) {
    target.removeEventListener(event, oldFunction);
    target.addEventListener(event, newFunction);
  }

  static showProjectEditModal(project) {
    this.editProject.title.value = project.title;
    this.editProject.description.value = project.description;
    this.editProject.modal.dataset.id = project.id;
    this.editProject.ghostBtn.textContent = "Delete";

    this.#changeEventListener(
      View.editProject.modal,
      "submit",
      Handle.projectAddSubmitForm,
      Handle.projectEditSubmitForm,
    );
    this.#changeEventListener(
      this.editProject.ghostBtn,
      "click",
      View.closeEditProjectModal,
      Handle.projectDeleteBtn,
    );

    this.editProject.modal.showModal();
  }

  static showProjectAddModal() {
    this.editProject.title.value = "";
    this.editProject.description.value = "";
    this.editProject.ghostBtn.textContent = "cancel";

    this.#changeEventListener(
      this.editProject.modal,
      "submit",
      Handle.projectEditSubmitForm,
      Handle.projectAddSubmitForm,
    );
    this.#changeEventListener(
      this.editProject.ghostBtn,
      "click",
      Handle.projectDeleteBtn,
      this.closeEditProjectModal,
    );

    this.editProject.modal.showModal();
  }

  static showTaskEditModal(task) {
    this.editTask.title.value = task.title;
    this.editTask.description.value = task.description;
    this.editTask.priority.value = task.priority;
    this.editTask.dueDate.value = task.dueDate
      ? format(task.dueDate, "yyyy-MM-dd")
      : "";
    this.editTask.modal.dataset.id = task.id;

    this.#changeEventListener(
      this.editTask.modal,
      "submit",
      Handle.taskAddSubmitForm,
      Handle.taskEditSubmitForm,
    );

    this.editTask.modal.showModal();
  }

  static showTaskAddModal() {
    this.editTask.title.value = "";
    this.editTask.description.value = "";
    this.editTask.priority.value = "0";
    this.editTask.dueDate.value = "";

    this.#changeEventListener(
      this.editTask.modal,
      "submit",
      Handle.taskEditSubmitForm,
      Handle.taskAddSubmitForm,
    );

    this.editTask.modal.showModal();
  }

  static showSubtaskEditModal(taskId, subtask) {
    this.editSubtask.content.value = subtask.content;
    this.editSubtask.modal.dataset.subtaskId = subtask.id;
    this.editSubtask.modal.dataset.taskId = taskId;

    this.#changeEventListener(
      this.editSubtask.modal,
      "submit",
      Handle.subtaskAddSubmitForm,
      Handle.subtaskEditSubmitForm,
    );

    this.editSubtask.modal.showModal();
  }

  static showSubtaskAddModal(taskId) {
    this.editSubtask.content.value = "";
    this.editSubtask.modal.dataset.taskId = taskId;

    this.#changeEventListener(
      this.editSubtask.modal,
      "submit",
      Handle.subtaskEditSubmitForm,
      Handle.subtaskAddSubmitForm,
    );

    this.editSubtask.modal.showModal();
  }
}

View.actionBtns.sort.addEventListener("click", Handle.taskSortByDueDateBtn());
View.actionBtns.hideTasks.addEventListener(
  "click",
  Handle.tasksToggleHideCompletBtn,
);
View.actionBtns.cleanTasks.addEventListener(
  "click",
  Handle.tasksDeleteCompleteBtn,
);
View.actionBtns.newTask.addEventListener("click", Handle.taskNewBtn);

const activeProject = document.getElementById("active-project");
activeProject.addEventListener("click", Handle.projectListBtn);

const deleteBtn = document.querySelector("#edit-project-dialog button");
deleteBtn.addEventListener("click", Handle.projectDeleteBtn);

View.editTask.ghostBtn.addEventListener("click", () =>
  View.editTask.modal.close(),
);
View.editSubtask.ghostBtn.addEventListener("click", () =>
  View.editSubtask.modal.close(),
);

export default View;
