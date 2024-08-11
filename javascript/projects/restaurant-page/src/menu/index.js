import "./style.css";
import data from "./menu.json";
import { makeCardSection } from "../utils";

export default function (main) {
  const content = makeCardSection(data, "menu", "h1");

  main.textContent = "";
  main.append(content);
}
