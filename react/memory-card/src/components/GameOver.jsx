import "../assets/modal.css";

export default function GameOver({ score, size, handleNewGame }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        {score < size && <div>Game Over!</div>}
        {score === size && <div>You Win!</div>}
        <button onClick={handleNewGame}>New game</button>
      </div>
    </div>
  );
}
