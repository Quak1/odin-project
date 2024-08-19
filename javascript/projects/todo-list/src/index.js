import store from "./Store";
import View from "./View";
import "./style.css";

View.showAllProjects(store.store);
//View.showTaskEditModal(store.store[2].tasks[0]);
View.showProjectListModal(store.store);
