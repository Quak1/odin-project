import { useRef, useEffect } from "react";

import modalStyles from "./styles/Modal.module.css";
import styles from "./styles/MapSelector.module.css";
import Loader from "./Loader";
import Info from "./Info";

const MapSelector = ({ maps, setMap }) => {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.showModal();
    modal.current.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }, []);

  const chooseMap = (map) => {
    setMap(map);
    modal.current.close();
  };

  return (
    <dialog className={modalStyles.container} ref={modal}>
      <Info />
      <h1>Welcome!</h1>
      <p>Choose a map:</p>
      {!maps ? (
        <Loader />
      ) : maps.length ? (
        <div className={styles.cardContainer}>
          {maps.map((map) => (
            <MapCard map={map} key={map.id} buttonClick={chooseMap} />
          ))}
        </div>
      ) : (
        <div className={styles.error}>
          <p>There was an error fetching the maps list.</p>
          <p>Please come back later.</p>
        </div>
      )}
    </dialog>
  );
};

const MapCard = ({ map, buttonClick }) => (
  <div className={styles.card}>
    <div className={styles.imageContainer}>
      <img src={map.cardImg || map.url} alt={map.name} />
    </div>
    <button onClick={() => buttonClick(map)}>{map.name}</button>
  </div>
);

export default MapSelector;
