import "./style.css";
import data from "./menu.json";
import { makeCardSection } from "../utils";

export default function () {
  const content = makeCardSection(data, "menu", "h1");

  return [content];
}
