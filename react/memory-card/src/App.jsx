import { useEffect, useState } from "react";

import Header from "./components/Header";
import CardContainer from "./components/CardContainer";
import GameOver from "./components/GameOver";
import "./assets/app.css";

import data from "./assets/example.json";

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
    const cards = data.amiibo.map((card) => ({
      id: card.head + "-" + card.tail,
      name: card.name,
      image: card.image,
    }));
    setCards(cards);
    setActiveCards(shuffleArray(cards).slice(0, size));
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

  if (!activeCards) return <div>Loading...</div>;

  return (
    <>
      <Header changeAmiibos={changeAmiibos} score={score} />
      <CardContainer cards={activeCards} onCardClick={onCardClick} />
      {isGameOver && (
        <GameOver score={score} size={size} handleNewGame={handleNewGame} />
      )}
    </>
  );
}

export default App;
