import { useEffect, useState, useRef } from "react";

import styles from "./styles/Game.module.css";
import { API_URL } from "../config/constants";

import Selector from "./Selector";
import Map from "./Map";
import Header from "./Header";
import FoundMarker from "./FoundMarker";

const Game = ({ map }) => {
  const [selectorPos, setSelectorPos] = useState(null);
  const naturalPosRef = useRef(null);
  const [chars, setChars] = useState([]);
  const [timerMillis, setTimerMillis] = useState(0);
  const timerIdRef = useRef(null);

  useEffect(() => {
    fetch(`${API_URL}/map/${map.id}?n=2`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setChars(data.chars);

        if (timerIdRef.current) clearInterval(timerIdRef.current);
        timerIdRef.current = setInterval(() => {
          setTimerMillis(Date.now() - data.start);
        }, 1000);
      });

    return () => {
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
        timerIdRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const allFound = chars.every((char) => char.found);
    if (allFound && timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
  }, [chars]);

  const selectorOnClick = (char) => {
    return async (e) => {
      e.stopPropagation();
      setSelectorPos(null);

      const charId = char.id;
      const charPos = await isSelected(char);
      if (charPos.found)
        setChars(
          chars.map((char) => {
            if (char.id === charId)
              return {
                ...char,
                ...charPos,
              };
            else return char;
          }),
        );
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
    console.log(`(${x}, ${y})`);
  };

  const isSelected = async (char) => {
    const res = await fetch(
      `${API_URL}/map/${map.id}/char/${char.id}/tag?x=${naturalPosRef.current.x}&y=${naturalPosRef.current.y}`,
      { credentials: "include" },
    );
    const found = await res.json();
    return found;
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
    </div>
  );
};

export default Game;
