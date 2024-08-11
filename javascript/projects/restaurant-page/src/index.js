import "./style.css";
import home from "./home";
import about from "./about";
import menu from "./menu";

function replaceContent(div, content) {
  div.textContent = "";
  div.append(...content);
}

const contentDiv = document.getElementById("content");
const homeContent = home();
const aboutContent = about();
const menuContent = menu();

replaceContent(contentDiv, menuContent);
