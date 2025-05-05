import styles from "./styles/Header.module.css";

const Header = ({ characters }) => {
  return (
    <div className={styles.header}>
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
  );
};

export default Header;
