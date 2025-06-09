import { useEffect, useRef, useState } from "react";

import Loader from "./Loader";
import {
  fetchData,
  formatDate,
  formatMillis,
  notify,
  notifyFatal,
  postData,
} from "../utils";

import styles from "./styles/Leaderboard.module.css";

const Leaderboard = ({ mapId }) => {
  const [topScores, setTopScores] = useState(null);
  const timeSubmitted = useRef(false);

  useEffect(() => {
    fetchData(`map/${mapId}/top-scores`).then((scores) => {
      setTopScores(scores);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = e.target.username;
    const username = input.value;

    if (!timeSubmitted.current) {
      if (!username) return;

      notify("Submitting your score.", "info");
      postData(`map/${mapId}/score`, { username })
        .then((data) => {
          if (data.error) throw new Error(data.error);

          notify("Score submitted. Updating leaderboard.", "success");
          timeSubmitted.current = true;
          setTopScores(null);
          return fetchData(`map/${mapId}/top-scores`);
        })
        .then((scores) => {
          setTopScores(scores);
          input.disabled = true;
        })
        .catch((err) => {
          notifyFatal(err.message, "error");
        });
    } else {
      notify("You can't submit your score twice.", "error");
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
        <Loader />
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
