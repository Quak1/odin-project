import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import TodoList from "./TodoList.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <TodoList />
  </StrictMode>,
);
