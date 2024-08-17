class Task {
  static count = 0;

  constructor({
    title,
    description = "",
    priority = 0,
    _priority,
    done = false,
    checklist = [],
    dueDate,
  }) {
    this.id = Task.count++;
    this.title = title;
    this.description = description;
    this.priority = priority ? priority : _priority;
    this.done = done;
    this.checklist = checklist.map((subtask) => new Subtask(subtask));
    this.#setDate(dueDate);
  }

  #setDate(dateString) {
    if (!dateString) {
      this.dueDate = "";
    } else if (dateString.length === 10) {
      // YYYY-MM-DD format
      const [year, month, day] = dateString.split("-");
      this.dueDate = new Date(year, month - 1, day);
    } else {
      this.dueDate = new Date(dateString);
    }
  }
  update({ title, description, priority, dueDate }) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.#setDate(dueDate);
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

  addSubtask(content) {
    this.checklist.push(new Subtask({ content }));
  }

  deleteSubtask(id) {
    const index = this.#getSubtaskIndex(id);
    if (index === -1) return;
    this.checklist.splice(index, 1);
  }

  toggleSubtask(id) {
    const index = this.#getSubtaskIndex(id);
    if (index === -1) return;
    this.checklist[index].done = !this.checklist[index].done;
  }

  editSubtask(id, content) {
    const index = this.#getSubtaskIndex(id);
    if (index === -1) return;
    this.checklist[index].content = content;
  }

  #getSubtaskIndex(id) {
    return this.checklist.findIndex((entry) => entry.id === id);
  }
}

class Subtask {
  static count = 0;

  constructor({ content, done = false }) {
    this.id = Subtask.count++;
    this.content = content;
    this.done = done;
  }
}

export default Task;
