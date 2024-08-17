import Task from "./Task";

class Project {
  static count = 0;

  constructor({ title, description, tasks }) {
    this.id = Project.count++;
    this.title = title;
    this.description = description;
    this.tasks = tasks ? tasks.map((task) => new Task(task)) : [];
  }

  update({ title, description }) {
    this.title = title;
    this.description = description;
  }

  addTask(task) {
    this.tasks.push(task);
  }

  deleteTask(taskId) {
    const index = this.tasks.findIndex((task) => task.id === taskId);
    if (index === -1) return;
    this.tasks.splice(index, 1);
  }

  getTask(id) {
    return this.tasks.find((task) => task.id === id);
  }
}

export default Project;
