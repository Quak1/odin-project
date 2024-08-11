import { makeTextElement, makeCardSection } from "../utils";
import homeData from "./home.json";
import Picture from "../assets/restaurant.jpg";
import "./style.css";

export default function (main) {
  const welcomeDiv = document.createElement("div");
  welcomeDiv.id = "welcome";
  const titleDiv = makeTextElement(homeData.welcome.title, "h1");
  const textDiv = makeTextElement(homeData.welcome.content, "div");
  const pic = new Image();
  pic.src = Picture;
  welcomeDiv.append(titleDiv, pic, textDiv);

  const whyUsDiv = makeCardSection(homeData, "why-us");
  const reviewsDiv = makeCardSection(homeData, "reviews");

  main.textContent = "";
  main.append(welcomeDiv, whyUsDiv, reviewsDiv);
}
