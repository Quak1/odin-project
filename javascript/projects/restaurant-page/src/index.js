import "./style.css";
import home from "./home";
import about from "./about";
import menu from "./menu";

const contentDiv = document.getElementById("content");

const homeBtn = document.getElementById("homeBtn");
const menuBtn = document.getElementById("menuBtn");
const aboutBtn = document.getElementById("aboutBtn");

function clickHandler(btn, loader) {
  homeBtn.classList.remove("mark");
  menuBtn.classList.remove("mark");
  aboutBtn.classList.remove("mark");
  btn.classList.add("mark");
  loader(contentDiv);
}

homeBtn.addEventListener("click", (e) => clickHandler(e.target, home));
menuBtn.addEventListener("click", (e) => clickHandler(e.target, menu));
aboutBtn.addEventListener("click", (e) => clickHandler(e.target, about));

homeBtn.click();
