import Timer from "./Timer";
import Loader from "./Loader";
import Info from "./Info";
import styles from "./styles/Header.module.css";

const Header = ({ characters, startTime, gameOver, gameElapsed }) => {
  return (
    <>
      <Info />
      <div className={styles.header}>
        <Timer
          startTime={startTime}
          gameOver={gameOver}
          gameElapsed={gameElapsed}
        />
        <div className={styles.container}>
          {!characters.length ? (
            <Loader />
          ) : (
            characters.map((char) => (
              <div key={char.id} className={styles.entry}>
                <div className={styles.wrapper}>
                  <img
                    src={char.image || null}
                    alt={char.name}
                    className={char.found ? styles.grayscale : ""}
                  />
                  {char.found && <div className={styles.cross} />}
                </div>
                <p>{char.name}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
