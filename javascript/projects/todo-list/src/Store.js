import Project from "./Project";
import Task from "./Task";
import defaultData from "./default.json";

class Store {
  constructor(store) {
    this.store = store.map((project) => new Project(project));
  }

  // PROJECTS
  #getProjectIndex(projectId) {
    const index = this.store.findIndex((project) => project.id === projectId);
    if (index === -1)
      throw new Error(`Project with id:${projectId} doesn't exist`);
    return index;
  }

  getProject(projectId) {
    const index = this.#getProjectIndex(projectId);
    return this.store[index];
  }

  #saveState() {
    localStorage.setItem("data", JSON.stringify(this.store));
  }

  addProject(projectValues) {
    const project = new Project(projectValues);
    this.store.push(project);
    this.#saveState();
    return project;
  }

  deleteProject(id) {
    const index = this.#getProjectIndex(id);
    this.store.splice(index, 1);
    this.#saveState();
  }

  updateProject(id, content) {
    const project = this.getProject(id);
    project.update(content);
    this.#saveState();
  }

  getAllProjectNames() {
    return this.store.map((project) => ({
      title: project.title,
      id: project.id,
    }));
  }

  // TASKS
  getTask(id) {
    for (const project of this.store) {
      const task = project.getTask(id);
      if (task) return task;
    }
    throw new Error(`Task with id:${id} doesn't exist`);
  }

  addTask(projectId, task) {
    // todo handle project id -1
    const project = this.getProject(projectId);
    project.addTask(new Task(task));
    this.#saveState();
  }

  deleteTask(id) {
    this.store.forEach((project) => {
      project.deleteTask(id);
    });
    this.#saveState();
  }

  deleteDoneTasks() {
    this.store.forEach((project) =>
      project.tasks
        .filter((task) => task.done)
        .forEach((task) => this.deleteTask(project.id, task.id)),
    );
  }

  updateTask(id, content) {
    const task = this.getTask(id);
    task.update(content);
    this.#saveState();
  }

  toggleTask(id) {
    const task = this.getTask(id);
    task.toggleDone();
    this.#saveState();
  }

  // SUBTASKS
  createSubtask(id, content) {
    const task = this.getTask(id);
    task.addSubtask(content);
    this.#saveState();
  }

  deleteSubtask(taskId, subtaskId) {
    const task = this.getTask(taskId);
    task.deleteSubtask(subtaskId);
    this.#saveState();
  }

  editSubtask(taskId, subtaskId, content) {
    const task = this.getTask(taskId);
    console.log({ taskId, subtaskId, content });
    task.editSubtask(subtaskId, content);
    this.#saveState();
  }

  toggleSubtask(taskId, subtaskid) {
    const task = this.getTask(taskId);
    task.toggleSubtask(subtaskid);
    this.#saveState();
  }
}

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(defaultData));
}
const store = new Store(JSON.parse(localStorage.getItem("data")));

export default store;
