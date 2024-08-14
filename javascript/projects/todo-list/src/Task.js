class Task {
  static count = 0;

  constructor({
    id,
    title,
    description = "",
    priority = 0,
    _priority,
    done = false,
    checklist = [],
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.priority = priority ? priority : _priority;
    this.done = done;
    this.checklist = checklist.map((subtask) => new SubTask(subtask));
  }

  update({ title, description, priority }) {
    this.title = title;
    this.description = description;
    this.priority = priority;
  }

  toggleDone() {
    this.done = !this.done;
    return this.done;
  }

  get priority() {
    return this._priority;
  }

  set priority(val) {
    if (val < 0 || val > 3)
      throw new Error("Priority value out of range 0 - 3");
    this._priority = val;
  }

  addSubTask(content) {
    this.checklist.push(new SubTask(content));
  }

  deleteSubTask(id) {
    const index = this.#getSubTaskIndex(id);
    if (index === -1) return;
    this.checklist.splice(index, 1);
  }

  toggleSubTask(id) {
    const index = this.#getSubTaskIndex(id);
    if (index === -1) return;
    this.checklist[index].done = !this.checklist[index].done;
  }

  updateSubTask(id, content) {
    const index = this.#getSubTaskIndex(id);
    if (index === -1) return;
    this.checklist[index].content = content;
  }

  #getSubTaskIndex(id) {
    return this.checklist.findIndex((entry) => entry.id === id);
  }
}

class SubTask {
  static count = 0;

  constructor({ id, content, done = false }) {
    this.id = id;
    this.content = content;
    this.done = done;
  }
}

export default Task;
