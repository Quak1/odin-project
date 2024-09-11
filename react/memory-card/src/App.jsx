import { useEffect, useState } from "react";

import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import GameOver from "./components/GameOver";
import "./assets/app.css";

const size = 12;
const shuffleArray = (array) => {
  return array.slice().sort(() => 0.5 - Math.random());
};

function App() {
  const [cards, setCards] = useState(null);
  const [activeCards, setActiveCards] = useState(null);
  const [clickedCards, setClickedCards] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const score = clickedCards.length;

  useEffect(() => {
    fetch("https://www.amiiboapi.com/api/amiibo/?type=figure")
      .then((res) => res.json())
      .then((data) =>
        data.amiibo.map((card) => ({
          id: card.head + "-" + card.tail,
          name: card.name,
          image: card.image,
        })),
      )
      .then((cards) => {
        setCards(cards);
        setActiveCards(shuffleArray(cards).slice(0, size));
      })
      .catch((e) => {
        console.log(e);
        setCards("fail");
      });
  }, []);

  const shuffleActiveCards = () => {
    setActiveCards(shuffleArray(activeCards));
  };

  const onCardClick = (id) => {
    const inClickedCards = clickedCards.some((cardId) => cardId === id);
    if (inClickedCards) setIsGameOver(true);
    else {
      setClickedCards([...clickedCards, id]);
      if (score === size - 1) setIsGameOver(true);
      else shuffleActiveCards();
    }
  };

  const changeAmiibos = () => {
    setClickedCards([]);
    setActiveCards(shuffleArray(cards).slice(0, size));
  };

  const handleNewGame = () => {
    setIsGameOver(false);
    setClickedCards([]);
    shuffleActiveCards();
  };

  return (
    <>
      <Header changeAmiibos={changeAmiibos} score={score} />
      {cards === "fail" ? (
        <h2>
          There was an error getting the cards information.
          <br />
          The Amiibo API might be down.
        </h2>
      ) : !activeCards ? (
        <div>Loading...</div>
      ) : (
        <CardContainer cards={activeCards} onCardClick={onCardClick} />
      )}
      {isGameOver && (
        <GameOver score={score} size={size} handleNewGame={handleNewGame} />
      )}
    </>
  );
}

export default App;
