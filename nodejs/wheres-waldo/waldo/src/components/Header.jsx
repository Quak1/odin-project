import Timer from "./Timer";
import styles from "./styles/Header.module.css";

const Header = ({ characters, elapsed }) => {
  return (
    <div className={styles.header}>
      <Timer elapsed={elapsed} />
      <div className={styles.container}>
        {characters.map((char) => (
          <div key={char.id} className={styles.entry}>
            <div className={styles.wrapper}>
              <img
                src={char.img}
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
