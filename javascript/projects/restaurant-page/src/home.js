import homeData from "./home.json";
import Picture from "./restaurant.jpg";

function makeCardsContainer(cards) {
  const container = document.createElement("div");
  container.classList.add("container");

  for (const card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    for (const entry of Object.values(card)) {
      const div = document.createElement("div");
      div.textContent = entry;
      cardDiv.appendChild(div);
    }

    container.appendChild(cardDiv);
  }

  return container;
}

function makeTextElement(text, tag) {
  const element = document.createElement(tag);
  element.textContent = text;
  return element;
}

function makeCardSection(data, name) {
  const container = document.createElement("div");
  container.id = name;

  const title = makeTextElement(data[name].title, "h2");
  const cardsContainer = makeCardsContainer(data[name].cards);

  container.appendChild(title);
  container.appendChild(cardsContainer);

  return container;
}

export default function () {
  const welcomeDiv = document.createElement("div");
  welcomeDiv.id = "welcome";
  const titleDiv = makeTextElement(homeData.welcome.title, "h1");
  const textDiv = makeTextElement(homeData.welcome.content, "div");
  const pic = new Image();
  pic.src = Picture;
  welcomeDiv.append(titleDiv, pic, textDiv);

  const whyUsDiv = makeCardSection(homeData, "why-us");
  const reviewsDiv = makeCardSection(homeData, "reviews");

  return [welcomeDiv, whyUsDiv, reviewsDiv];
}
