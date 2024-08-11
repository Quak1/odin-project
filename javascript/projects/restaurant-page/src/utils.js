function makeCardsContainer(cards) {
  const container = document.createElement("div");
  container.classList.add("container");

  for (const card of cards) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");

    for (const key in card) {
      if (key === "picture") {
        const pic = new Image();
        pic.src = require(`./${card.picture.src}.jpg`);
        pic.alt = card.picture.alt;
        const div = document.createElement("div");
        div.appendChild(pic);
        cardDiv.appendChild(div);
      } else {
        const div = document.createElement("div");
        div.textContent = card[key];
        cardDiv.appendChild(div);
      }
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

function makeCardSection(data, name, header = "h2") {
  const container = document.createElement("div");
  container.id = name;

  const title = makeTextElement(data[name].title, header);
  const cardsContainer = makeCardsContainer(data[name].cards);

  container.appendChild(title);
  container.appendChild(cardsContainer);

  return container;
}

export { makeTextElement, makeCardsContainer, makeCardSection };
