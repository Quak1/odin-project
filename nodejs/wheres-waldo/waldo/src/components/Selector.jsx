import styles from "./styles/Selector.module.css";

const Selector = ({ characters, pos, onClick }) => {
  return (
    <div className={styles.selector} style={pos}>
      {characters.map((char) => (
        <div
          key={char.id}
          className={styles.entry}
          onClick={onClick(char.name)}
        >
          <img alt={char.name[5]} />
          <p>{char.name}</p>
        </div>
      ))}
    </div>
  );
};

export default Selector;
