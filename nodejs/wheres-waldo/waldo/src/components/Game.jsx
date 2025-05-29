import { useEffect, useState } from "react";

import styles from "./styles/Game.module.css";

import Selector from "./Selector";
import Map from "./Map";
import Header from "./Header";
import FoundMarker from "./FoundMarker";

const initialChars = [
  {
    id: 1,
    name: "Lapras",
    img: "https://img.pokemondb.net/sprites/black-white/normal/lapras.png",
  },
  {
    id: 2,
    name: "Grotle",
    img: "https://img.pokemondb.net/sprites/black-white/normal/grotle.png",
  },
  {
    id: 3,
    name: "Bayleef",
    img: "https://img.pokemondb.net/sprites/black-white/normal/bayleef.png",
  },
];

const positions = [
  { id: 1, name: "Lapras", x1: 906, y1: 227, x2: 990, y2: 404 },
  { id: 2, name: "Grotle", x1: 224, y1: 1, x2: 332, y2: 76 },
  { id: 3, name: "Bayleef", x1: 119, y1: 230, x2: 197, y2: 303 },
];

const Game = ({ map }) => {
  const [selectorPos, setSelectorPos] = useState(null);
  const [naturalPos, setNaturalPos] = useState(null);
  const [chars, setChars] = useState(initialChars);
  const [timerMillis, setTimerMillis] = useState(0);
  const [timerId, setTimerId] = useState(null);

  console.log("Game", map);
  useEffect(() => {
    const timerStart = Date.now();
    const interval = setInterval(() => {
      setTimerMillis(Date.now() - timerStart);
    }, 1000);
    setTimerId(interval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const allFound = chars.every((char) => char.found);
    if (allFound && timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  }, [chars]);

  const selectorOnClick = (char) => {
    return (e) => {
      e.stopPropagation();
      setSelectorPos(null);

      console.log(isSelected(char));

      const charId = char.id;
      const charPos = isSelected(char);
      if (charPos)
        setChars(
          chars.map((char) => {
            if (char.id === charId)
              return {
                ...char,
                found: true,
                x: charPos.x1,
                y: charPos.y1,
                w: charPos.x2 - charPos.x1,
                h: charPos.y2 - charPos.y1,
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

    setNaturalPos({ x, y });
    setSelectorPos({ top: e.pageY, left: e.pageX });
    console.log(`(${x}, ${y})`);
  };

  const isSelected = (char) => {
    const charPos = positions.find((p) => p.id === char.id);

    if (!charPos) return false;

    if (
      naturalPos.x >= charPos.x1 &&
      naturalPos.x <= charPos.x2 &&
      naturalPos.y >= charPos.y1 &&
      naturalPos.y <= charPos.y2
    )
      return charPos;
    else return null;
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
