import "./style.css";
import home from "./home";

const contentDiv = document.getElementById("content");
contentDiv.textContent = "";
contentDiv.append(...home());
