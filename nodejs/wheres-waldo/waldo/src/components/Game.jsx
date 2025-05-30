import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast, Slide } from "react-toastify";

import styles from "./styles/Game.module.css";
import fetchData from "../config/fetchData";
import useTimer from "../hooks/useTimer";

import Selector from "./Selector";
import Map from "./Map";
import Header from "./Header";
import FoundMarker from "./FoundMarker";

const Game = ({ map, reset }) => {
  const [selectorPos, setSelectorPos] = useState(null);
  const [chars, setChars] = useState([]);
  const startTime = useRef(0);
  const naturalPosRef = useRef(null);
  const { elapsed: timerMillis, stop: stopTimer } = useTimer(startTime.current);

  useEffect(() => {
    fetchData(`map/${map.id}?n=2`).then((data) => {
      setChars(data.chars);
      startTime.current = data.start;
    });
  }, []);

  const notify = (msg, type = "success") => {
    toast(msg, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      transition: Slide,
      className: styles.toast,
      type: type,
    });
  };

  const selectorOnClick = (clickChar) => {
    return async (e) => {
      e.stopPropagation();
      setSelectorPos(null);

      const charPos = await isSelected(clickChar);

      if (charPos.found) {
        setChars((prevChars) => {
          const updatedChars = prevChars.map((char) => {
            if (char.id === clickChar.id)
              return {
                ...char,
                ...charPos,
              };
            else return char;
          });

          const allFound = updatedChars.every((char) => char.found);
          if (allFound) {
            reset();
            stopTimer();
          }

          return updatedChars;
        });
        notify(`You found ${clickChar.name}!`, "success");
      } else {
        notify(`That's not ${clickChar.name}. Keep looking!`, "error");
      }
    };
  };

  const mapOnClick = (e) => {
    if (selectorPos) {
      setSelectorPos(null);
      return;
    }

    const img = e.target;
    const x = Math.round(
      (img.naturalWidth / img.offsetWidth) * e.nativeEvent.offsetX,
    );
    const y = Math.round(
      (img.naturalHeight / img.offsetHeight) * e.nativeEvent.offsetY,
    );

    naturalPosRef.current = { x, y };
    setSelectorPos({ top: e.pageY, left: e.pageX });
  };

  const isSelected = async (char) => {
    return await fetchData(
      `map/${map.id}/char/${char.id}/tag?x=${naturalPosRef.current.x}&y=${naturalPosRef.current.y}`,
      { credentials: "include" },
    );
  };

  return (
    <div className={styles.game}>
      <Header characters={chars} elapsed={timerMillis} />
      <div className={styles.mapContainer}>
        {chars
          .filter((char) => char.found)
          .map((char) => (
            <FoundMarker char={char} map={map} key={char.id} />
          ))}
        <Map imageUrl={map.url} onClick={mapOnClick} />
      </div>
      {selectorPos && (
        <Selector
          characters={chars}
          pos={selectorPos}
          onClick={selectorOnClick}
        />
      )}
      <ToastContainer />
    </div>
  );
};

export default Game;
