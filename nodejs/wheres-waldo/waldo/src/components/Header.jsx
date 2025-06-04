import Timer from "./Timer";
import styles from "./styles/Header.module.css";

const Header = ({ characters, startTime, gameOver, gameElapsed }) => {
  return (
    <div className={styles.header}>
      <Timer
        startTime={startTime}
        gameOver={gameOver}
        gameElapsed={gameElapsed}
      />
      <div className={styles.container}>
        {characters.map((char) => (
          <div key={char.id} className={styles.entry}>
            <div className={styles.wrapper}>
              <img
                src={char.image}
                alt={char.name}
                className={char.found ? styles.grayscale : ""}
              />
              {char.found && <div className={styles.cross} />}
            </div>
            <p>{char.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;
