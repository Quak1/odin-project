import { useRef, useEffect } from "react";

import styles from "./styles/WinScreen.module.css";
import modalStyles from "./styles/Modal.module.css";
import { formatMillis } from "../utils";

const MapSelector = ({ map, elapsed, reset }) => {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.showModal();
  }, []);

  return (
    <dialog
      className={`${modalStyles.container} ${styles.container}`}
      ref={modal}
    >
      <h1>You Win!</h1>
      <p>
        It took you {formatMillis(elapsed)} minutes to find all targets on the{" "}
        {map.name} map
      </p>
      <button onClick={reset}>Play again</button>
    </dialog>
  );
};

export default MapSelector;
