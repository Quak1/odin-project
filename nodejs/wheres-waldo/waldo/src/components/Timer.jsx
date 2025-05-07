import styles from "./styles/Timer.module.css";

const Timer = ({ elapsed }) => {
  const minutes = Math.floor(elapsed / 60 / 1000);
  const seconds = Math.floor(elapsed / 1000) % 60;

  return (
    <div className={styles.timer}>
      {formatTime(minutes)}:{formatTime(seconds)}
    </div>
  );
};

const formatTime = (t) => (t < 10 ? `0${t}` : t);

export default Timer;
