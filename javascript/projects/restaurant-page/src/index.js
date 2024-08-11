import "./style.css";
import home from "./home";
import about from "./about";
import menu from "./menu";

const contentDiv = document.getElementById("content");

const homeBtn = document.getElementById("homeBtn");
const menuBtn = document.getElementById("menuBtn");
const aboutBtn = document.getElementById("aboutBtn");

home(contentDiv);
homeBtn.addEventListener("click", () => home(contentDiv));
menuBtn.addEventListener("click", () => menu(contentDiv));
aboutBtn.addEventListener("click", () => about(contentDiv));
