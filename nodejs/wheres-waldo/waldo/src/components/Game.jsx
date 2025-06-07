import { useEffect, useState, useRef } from "react";
import { ToastContainer } from "react-toastify";

import styles from "./styles/Game.module.css";
import { fetchData, notify, notifyFatal } from "../utils";

import Selector from "./Selector";
import Map from "./Map";
import Header from "./Header";
import FoundMarker from "./FoundMarker";
import WinScreen from "./WinScreen";
import Loader from "./Loader";

const Game = ({ map, reset }) => {
  const [selectorPos, setSelectorPos] = useState(null);
  const [chars, setChars] = useState([]);
  const startTime = useRef(null);
  const gameElapsed = useRef(0);
  const naturalPosRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [loader, setLoader] = useState(null);

  useEffect(() => {
    fetchData(`map/${map.id}?n=3`)
      .then((data) => {
        if (data.error) {
          notifyFatal(data.error + " Please come back later.");
          setGameOver(true);
        } else {
          setChars(data.chars);
          startTime.current = data.start;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const selectorOnClick = (clickChar) => {
    return async (e) => {
      e.stopPropagation();

      setLoader(selectorPos);
      setSelectorPos(null);
      const charPos = await isSelected(clickChar);
      setLoader(null);

      if (charPos.error) {
        notify(
          `There has been an error verifying ${clickChar.name}. Please try again`,
          "error",
        );
      } else if (charPos.found) {
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
            setGameOver(true);
          }

          return updatedChars;
        });
        notify(`You found ${clickChar.name}!`, "success");
      } else {
        notify(`That's not ${clickChar.name}. Keep looking!`, "warning");
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
      <Header
        characters={chars}
        gameElapsed={gameElapsed}
        gameOver={gameOver}
        startTime={startTime.current}
      />
      {loader && (
        <div className={styles.loader} style={loader}>
          <Loader />
        </div>
      )}
      <div className={styles.mapContainer}>
        {chars
          .filter((char) => char.found || char.loading)
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
      {gameOver && (
        <WinScreen map={map} elapsed={gameElapsed.current} reset={reset} />
      )}
      <ToastContainer style={{ color: "black" }} />
    </div>
  );
};

export default Game;
