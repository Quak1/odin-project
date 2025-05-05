import styles from "./styles/Selector.module.css";

const Selector = ({ characters, pos, onClick }) => {
  return (
    <div className={styles.selector} style={pos}>
      {characters.map(
        (char) =>
          !char.found && (
            <div key={char.id} className={styles.entry} onClick={onClick(char)}>
              <img src={char.img} alt={char.name} />
              <p>{char.name}</p>
            </div>
          ),
      )}
    </div>
  );
};

export default Selector;
