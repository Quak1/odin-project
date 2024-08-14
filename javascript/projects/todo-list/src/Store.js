import Project from "./Project";
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

  #getProject(projectId) {
    const index = this.#getProjectIndex(projectId);
    return this.store[index];
  }

  #saveState() {
    localStorage.setItem("data", JSON.stringify(this.store));
  }

  addProject(project) {
    this.store.push(project);
    this.#saveState();
  }

  deleteProject(id) {
    const index = this.#getProjectIndex(id);
    this.store.splice(index, 1);
    this.#saveState();
  }

  updateProject(id, content) {
    const project = this.#getProject(id);
    project.update(content);
    this.#saveState();
  }

  // TASKS
  #getTask(id) {
    for (const project of this.store) {
      const task = project.getTask(id);
      if (task) return task;
    }
    throw new Error(`Task with id:${id} doesn't exist`);
  }

  addTask(projectId, task) {
    const project = this.#getProject(projectId);
    project.addTask(task);
    this.#saveState();
  }

  deleteTask(id) {
    for (const project of this.store) {
      if (project.deleteTask(id)) return true;
    }
    this.#saveState();
  }

  updateTask(id, content) {
    const task = this.#getTask(id);
    task.update(content);
    this.#saveState();
  }

  toggleTask(id) {
    const task = this.#getTask(id);
    task.toggleDone();
    this.#saveState();
  }

  // SUBTASKS
  createSubTask(id, content) {
    const task = this.#getTask(id);
    task.addSubTask(content);
    this.#saveState();
  }

  deleteSubTask(taskId, subTaskId) {
    const task = this.#getTask(taskId);
    task.deleteSubTask(subTaskId);
    this.#saveState();
  }

  editSubTask(taskId, subTaskid, content) {
    const task = this.#getTask(taskId);
    task.editSubTask(subTaskid, content);
    this.#saveState();
  }

  toggleSubTask(taskId, subTaskid) {
    const task = this.#getTask(taskId);
    task.toggleSubTask(subTaskid);
    this.#saveState();
  }
}

if (!localStorage.getItem("data")) {
  localStorage.setItem("data", JSON.stringify(defaultData));
}
const store = new Store(JSON.parse(localStorage.getItem("data")));
export default store;
