import ScoreBoard from "./ScoreBoard";
import RenewIcon from "./RenewIcon";
import "../assets/header.css";

export default function Header({
  title = "Amiibo Memory Game",
  score,
  changeAmiibos,
}) {
  return (
    <header>
      <h1>{title}</h1>
      <ScoreBoard score={score} />
      <button onClick={changeAmiibos}>
        <RenewIcon />
      </button>
    </header>
  );
}
