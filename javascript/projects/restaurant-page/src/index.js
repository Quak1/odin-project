import "./style.css";
import home from "./home";
import about from "./about";

function replaceContent(div, content) {
  div.textContent = "";
  div.append(...content);
}

const contentDiv = document.getElementById("content");
const homeContent = home();
const aboutContent = about();

replaceContent(contentDiv, aboutContent);
