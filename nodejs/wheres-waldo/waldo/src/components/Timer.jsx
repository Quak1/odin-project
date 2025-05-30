import styles from "./styles/Timer.module.css";
import { formatMinutes } from "../utils";

const Timer = ({ elapsed }) => {
  return <div className={styles.timer}>{formatMinutes(elapsed)}</div>;
};

export default Timer;
