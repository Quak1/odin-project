import View from "./View";
import store from "./Store";

class Handle {
  static taskDoneBtn(e) {
    const container = e.target.parentElement.parentElement;
    if (View.hideCompleted) container.classList.add("hidden");
    container.firstChild.classList.toggle("done");

    const taskId = Number(container.dataset.id);
    store.toggleTask(taskId);
  }

  static #deleteTaskByNode(taskContainer) {
    const id = Number(taskContainer.dataset.id);
    store.deleteTask(id);
    taskContainer.remove();
  }

  static taskNewBtn(e) {
    View.showTaskAddModal();
  }
  static taskDeleteBtn(e) {
    const container = e.target.parentElement.parentElement;
    Handle.#deleteTaskByNode(container);
  }

  static taskEditBtn(e) {
    const taskId = View.getTaskIdByNode(e.target);
    const task = store.getTask(taskId);
    View.showTaskEditModal(task);
    View.redrawCurrent();
  }

  static taskToggleDetailsClick(e) {
    if (e.target.nodeName === "BUTTON") return;
    View.toggleTaskDetails(e.target);
  }

  static subtaskToggleDoneBtn(e) {
    const { taskId, subtaskId } = View.getSubtaskIdByNode(e.target);
    store.toggleSubtask(taskId, subtaskId);

    View.toggleSubtaskDone(e.target);
  }

  static subtaskDeleteBtn(e) {
    const { taskId, subtaskId } = View.getSubtaskIdByNode(e.target);
    store.deleteSubtask(taskId, subtaskId);

    View.deleteSubtaskContainer(e.target);
  }

  static subtaskEditBtn(e) {
    const { taskId, subtaskId } = View.getSubtaskIdByNode(e.target);

    const subtask = store
      .getTask(taskId)
      .checklist.find((subtask) => subtask.id === subtaskId);
    console.log({ subtaskId, taskId, subtask });
    View.showSubtaskEditModal(taskId, subtask);
  }

  static subtaskAddBtn(e) {
    const taskId = View.getTaskIdByNode(e.target);
    View.showSubtaskAddModal(taskId);
  }

  static tasksToggleHideCompletBtn() {
    View.toggleHideCompleteTasks();
  }

  static tasksDeleteCompleteBtn() {
    store.deleteDoneTasks();
    View.deleteDoneTaskContainers();
  }

  static taskEditSubmitForm(e) {
    e.preventDefault();

    const title = View.editTask.title.value;
    const description = View.editTask.description.value;
    const priority = View.editTask.priority.value;
    const dueDate = View.editTask.dueDate.value;
    const id = Number(View.editTask.modal.dataset.id);

    store.updateTask(id, { title, description, priority, dueDate });

    View.redrawCurrent();
    View.editTask.modal.close();
  }

  static taskAddSubmitForm(e) {
    e.preventDefault();

    const title = View.editTask.title.value;
    const description = View.editTask.description.value;
    const priority = View.editTask.priority.value;
    const dueDate = View.editTask.dueDate.value;

    store.addTask(View.activeProject, {
      title,
      description,
      priority,
      dueDate,
    });

    View.redrawCurrent();
    View.editTask.modal.close();
  }

  static subtaskEditSubmitForm(e) {
    e.preventDefault();

    const content = View.editSubtask.content.value;
    const taskId = Number(View.editSubtask.modal.dataset.taskId);
    const subtaskId = Number(View.editSubtask.modal.dataset.subtaskId);

    store.editSubtask(taskId, subtaskId, content);

    View.redrawCurrent();
    View.editSubtask.modal.close();
  }

  static subtaskAddSubmitForm(e) {
    e.preventDefault();

    const content = View.editSubtask.content.value;
    const taskId = Number(View.editSubtask.modal.dataset.taskId);
    console.log(content);

    store.createSubtask(taskId, content);

    View.redrawCurrent();
    View.editSubtask.modal.close();
  }

  static projectSelectBtn(id) {
    const project = store.getProject(id);
    return function (e) {
      View.showProject(project);
      View.closeModal();
    };
  }

  static projectShowAllBtn() {
    View.showAllProjects(store.store);
    View.closeModal();
  }

  static projectListBtn() {
    const projects = store.getAllProjectNames();
    View.showProjectListModal(projects);
  }

  static projectAddBtn() {
    View.showProjectAddModal();
    View.closeModal();
  }

  static projectEditBtn(e) {
    const projectId = Number(e.target.dataset.id);
    const project = store.getProject(projectId);
    View.showProjectEditModal(project);
    View.closeModal();
  }

  static projectEditSubmitForm(e) {
    e.preventDefault();

    const title = View.editProject.title.value;
    const description = View.editProject.description.value;
    const id = Number(View.editProject.modal.dataset.id);

    store.updateProject(id, { title, description });

    View.redrawCurrent();
    View.editProject.modal.close();
  }

  static projectAddSubmitForm(e) {
    e.preventDefault();

    const title = View.editProject.title.value;
    const description = View.editProject.description.value;

    const project = store.addProject({ title, description });

    View.showProject(project);
    View.editProject.modal.close();
  }

  static projectDeleteBtn(e) {
    View.showProjectDeleteConfirmation();
    View.editProject.modal.close();
  }

  static projectDeleteConfirmBtn(e) {
    const projectId = Number(e.target.value);
    store.deleteProject(projectId);

    View.showAllProjects(store.store);
    View.closeModal();
  }

  static taskSortByDueDateBtn(e) {
    let options = ["", "increasing", "decreasing"];
    let state = 0;
    return function () {
      state = (state + 1) % 3;
      View.sortState = options[state];
      View.redrawCurrent();
    };
  }
}

export default Handle;
