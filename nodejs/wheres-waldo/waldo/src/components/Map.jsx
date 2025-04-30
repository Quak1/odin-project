import styles from "./styles/Map.module.css";

const Map = ({ imageUrl, onClick }) => {
  return <img src={imageUrl} onClick={onClick} className={styles.map} />;
};

export default Map;
