import { makeTextElement } from "../utils";
import data from "./about.json";

export default function (main) {
  const title = makeTextElement(data.title, "h1");
  const content = [title];

  for (const entry of data.content) {
    content.push(makeTextElement(entry.title, "h2"));
    for (const text of entry.content) {
      content.push(makeTextElement(text, "p"));
    }
  }

  main.textContent = "";
  main.append(...content);
}
