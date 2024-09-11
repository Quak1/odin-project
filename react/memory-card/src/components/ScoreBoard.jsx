import { useState } from "react";

export default function ScoreBoard({ score }) {
  const [maxScore, setMaxScore] = useState(0);
  if (score > maxScore) setMaxScore(score);

  return (
    <div id="score-board">
      Score: {score} | Max score: {maxScore}
    </div>
  );
}
