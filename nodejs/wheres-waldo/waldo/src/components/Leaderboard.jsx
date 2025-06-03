import { useEffect, useRef, useState } from "react";
import { fetchData, formatDate, formatMillis, postData } from "../utils";

import styles from "./styles/Leaderboard.module.css";

const Leaderboard = ({ mapId }) => {
  const [topScores, setTopScores] = useState(null);
  const timeSubmitted = useRef(false);

  useEffect(() => {
    fetchData(`map/${mapId}/top-scores`).then((scores) => {
      console.log(scores);
      setTopScores(scores);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = e.target.username;
    const username = input.value;

    if (!timeSubmitted.current) {
      timeSubmitted.current = true;
      postData(`map/${mapId}/score`, { username })
        .then(() => fetchData(`map/${mapId}/top-scores`))
        .then((scores) => setTopScores(scores))
        .then(() => (input.disabled = true));
    } else {
      console.log("you did that alreaady");
    }

    input.value = "";
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <p>Enter your name to record your score.</p>
        <div>
          <div className={styles.input}>
            <input id="username" type="text" name="username" placeholder="" />
            <label htmlFor="username">Name</label>
          </div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {!topScores ? (
        "Loading leaderboard..."
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Time</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {topScores.map((score, i) => (
              <tr key={score.id} className={styles.row}>
                <td>{i + 1}</td>
                <td>{score.username}</td>
                <td>{formatMillis(score.score)}</td>
                <td>{formatDate(score.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Leaderboard;
