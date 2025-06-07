import { useRef, useState, useLayoutEffect } from "react";

import styles from "./styles/Selector.module.css";

const Selector = ({ characters, pos, onClick }) => {
  const selectorRef = useRef(null);
  const [position, setPosition] = useState(pos);

  useLayoutEffect(() => {
    let top = pos.top;
    let left = pos.left;

    const selector = selectorRef.current.getBoundingClientRect();
    if (selector.bottom > window.innerHeight) top -= selector.height;
    if (selector.right > window.innerWidth) left -= selector.width;

    setPosition({ top, left });
  }, []);

  return (
    <div className={styles.selector} style={position} ref={selectorRef}>
      {characters.map(
        (char) =>
          !char.found && (
            <div key={char.id} className={styles.entry} onClick={onClick(char)}>
              <img src={char.image || null} alt={char.name} />
              <p>{char.name}</p>
            </div>
          ),
      )}
    </div>
  );
};

export default Selector;
