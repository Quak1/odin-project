import { useState } from "react";

import Selector from "./Selector";
import styles from "./styles/Game.module.css";

const Game = () => {
  const [selectorPos, setSelectorPos] = useState(null);

  const onClick = (e) => {
    if (selectorPos) setSelectorPos(null);
    else setSelectorPos({ top: e.pageY, left: e.pageX });
    console.log(selectorPos);
  };

  const selectorOnClick = (name) => {
    return (e) => {
      e.stopPropagation();
      setSelectorPos(null);
      console.log(name);
    };
  };

  return (
    <div className={styles.game} onClick={onClick}>
      {selectorPos && (
        <Selector
          characters={[
            { name: "Test 1", id: 0 },
            { name: "Test 2", id: 1 },
            { name: "Test 3", id: 2 },
          ]}
          pos={selectorPos}
          onClick={selectorOnClick}
        />
      )}
    </div>
  );
};

export default Game;
