import { useRef, useEffect } from "react";

import modalStyles from "./styles/Modal.module.css";
import styles from "./styles/MapSelector.module.css";

const MapSelector = ({ maps, setMap }) => {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.showModal();
  }, []);

  const chooseMap = (map) => {
    setMap(map);
    modal.current.close();
  };

  return (
    <dialog className={modalStyles.container} ref={modal}>
      <h1>Welcome!</h1>
      <p>Choose a map:</p>
      {maps && (
        <div className={styles.cardContainer}>
          {maps.map((map) => (
            <MapCard map={map} key={map.id} buttonClick={chooseMap} />
          ))}
        </div>
      )}
    </dialog>
  );
};

const MapCard = ({ map, buttonClick }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img src={map.url} alt={map.name} />
    </div>
    <button onClick={() => buttonClick(map)}>{map.name}</button>
  </div>
);

export default MapSelector;
