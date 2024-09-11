import "../assets/cards.css";

export default function CardContainer({ cards, onCardClick }) {
  return (
    <div id="card-container">
      {cards.map((card) => (
        <Card key={card.id} card={card} onClick={() => onCardClick(card.id)} />
      ))}
    </div>
  );
}

function Card({ card, onClick }) {
  return (
    <div onClick={onClick} className="card">
      <div className="img">
        <img src={card.image} alt={card.name} />
      </div>

      <div className="text">
        <p>{card.name}</p>
      </div>
    </div>
  );
}
