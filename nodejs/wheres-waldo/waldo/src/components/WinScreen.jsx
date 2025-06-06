import { useRef, useEffect } from "react";

import modalStyles from "./styles/Modal.module.css";
import { formatMinutes } from "../utils";
import Leaderboard from "./Leaderboard";

const WinScreen = ({ map, elapsed, reset }) => {
  const modal = useRef(null);

  useEffect(() => {
    modal.current.showModal();
    modal.current.addEventListener("cancel", (event) => {
      event.preventDefault();
    });
  }, []);

  return (
    <dialog className={`${modalStyles.container}`} ref={modal}>
      <h1>You win!</h1>
      <p>
        It took you {formatMinutes(elapsed)} minutes to find all targets on the{" "}
        {map.name} map
      </p>
      <hr />
      <Leaderboard mapId={map.id} />
      <button onClick={reset}>Play again</button>
    </dialog>
  );
};

export default WinScreen;
