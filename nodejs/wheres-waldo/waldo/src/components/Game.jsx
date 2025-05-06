import { useEffect, useState } from "react";

import styles from "./styles/Game.module.css";

import Selector from "./Selector";
import Map from "./Map";
import Header from "./Header";

// 1600 x 2300
const mapUrl =
  "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2b67f731-a21c-4ac8-8a91-65beb31ef176/d3fvvj8-baf84b8f-e86d-4ce2-8548-6bb5ba4908b4.jpg/v1/fill/w_1600,h_2300,q_75,strp/gotta_catch__em_all___649__pokemon_poster_by_viking011_d3fvvj8-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzJiNjdmNzMxLWEyMWMtNGFjOC04YTkxLTY1YmViMzFlZjE3NlwvZDNmdnZqOC1iYWY4NGI4Zi1lODZkLTRjZTItODU0OC02YmI1YmE0OTA4YjQuanBnIiwiaGVpZ2h0IjoiPD0yMzAwIiwid2lkdGgiOiI8PTE2MDAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uud2F0ZXJtYXJrIl0sIndtayI6eyJwYXRoIjoiXC93bVwvMmI2N2Y3MzEtYTIxYy00YWM4LThhOTEtNjViZWIzMWVmMTc2XC92aWtpbmcwMTEtNC5wbmciLCJvcGFjaXR5Ijo5NSwicHJvcG9ydGlvbnMiOjAuNDUsImdyYXZpdHkiOiJjZW50ZXIifX0.5wSVOdWFRb51PKlAQJFHLZJA6QEjbw6T6DXNl5riW4g";

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
  { id: 1, name: "Lapras", x: 906, y: 227, w: 84, h: 177 },
  { id: 2, name: "Grotle", x: 224, y: 1, w: 88, h: 75 },
  { id: 3, name: "Bayleef", x: 119, y: 230, w: 78, h: 73 },
];

const Game = () => {
  const [selectorPos, setSelectorPos] = useState(null);
  const [naturalPos, setNaturalPos] = useState(null);
  const [chars, setChars] = useState(initialChars);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerId, setTimerId] = useState(null);

  useEffect(() => {
    const timerStart = Date.now();
    const interval = setInterval(() => {
      setTimerSeconds(Math.floor((Date.now() - timerStart) / 1000));
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
      if (isSelected(char))
        setChars(
          chars.map((char) => {
            if (char.id === charId) return { ...char, found: true };
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

    return (
      naturalPos.x >= charPos.x &&
      naturalPos.x <= charPos.x + charPos.w &&
      naturalPos.y >= charPos.y &&
      naturalPos.y <= charPos.y + charPos.h
    );
  };

  return (
    <div className={styles.game}>
      <Header characters={chars} elapsed={timerSeconds} />
      <Map imageUrl={mapUrl} onClick={mapOnClick} />
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
