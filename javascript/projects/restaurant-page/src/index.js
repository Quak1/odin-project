import "./style.css";
import Picture from "./restaurant.jpg";

console.log("Hello, World!");

const pic = new Image();
pic.src = Picture;

const title = document.querySelector("h1");
title.parentNode.insertBefore(pic, title.nextSibling);
