import styles from "./styles/FoundMarker.module.css";

const FoundMarker = ({ char, map }) => {
  const left = (char.x / map.w) * 100;
  const top = (char.y / map.h) * 100;
  const width = (char.w / map.w) * 100;
  const height = (char.h / map.h) * 100;

  return (
    <div
      className={styles.marker}
      style={{
        left: `${left}%`,
        top: `${top}%`,
        width: `${width}%`,
        height: `${height}%`,
      }}
    ></div>
  );
};

export default FoundMarker;
