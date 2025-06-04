import styles from "./styles/Timer.module.css";

import { formatMinutes } from "../utils";
import useTimer from "../hooks/useTimer";

const Timer = ({ gameElapsed, startTime, gameOver }) => {
  const { elapsed: timerMillis, stop: stopTimer } = useTimer(startTime);

  if (gameOver) stopTimer();

  gameElapsed.current = timerMillis;

  return <div className={styles.timer}>{formatMinutes(timerMillis)}</div>;
};

export default Timer;
