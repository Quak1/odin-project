import { useRef } from "react";

import IconClose from "./IconClose";
import IconInfo from "./IconInfo";
import styles from "./styles/Info.module.css";

const pictures = [
  {
    title: "Gotta Catch 'Em All - 649+ Pokemon Poster",
    link: "https://www.deviantart.com/viking011/art/Gotta-Catch-Em-All-649-Pokemon-Poster-208079972",
    artist: "Viking011",
    profile: "https://www.deviantart.com/viking011",
  },
  {
    title: "Pokemon Starter Fusions (Compilation)",
    link: "https://www.deviantart.com/albrt-wlson/art/Pokemon-Starter-Fusions-Compilation-893225361",
    artist: "albrt-wlson",
    profile: "https://www.deviantart.com/albrt-wlson",
  },
  {
    title: "Super Smash Brothers Brawl 2",
    link: "https://www.deviantart.com/neoriceisgood/art/Super-Smash-Brothers-Brawl-2-110721026",
    artist: "Neoriceisgood",
    profile: "https://www.deviantart.com/neoriceisgood",
  },
];

const Info = () => {
  const dialogRef = useRef(null);

  return (
    <div className={styles.infoContainer}>
      <button
        className={styles.button}
        onClick={() => dialogRef.current?.showModal()}
      >
        <IconInfo /> About
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        style={{ textAlign: "left" }}
      >
        <button
          className={styles.button}
          onClick={() => dialogRef.current.close()}
          style={{ backgroundColor: "white" }}
        >
          <IconClose />
        </button>
        <h1>About</h1>
        <ol>
          <li>Find all the targets on the map.</li>
          <li>Click on the image and choose a target from the dropdown.</li>
          <li>Play for a place on the leaderboard.</li>
        </ol>
        <h2>Artwork credits:</h2>
        <ul>
          {pictures.map((pic) => (
            <li key={pic.link}>
              <a href={pic.link}>{pic.title}</a> by{" "}
              <a href={pic.profile}>{pic.artist}</a> on DevianArt
            </li>
          ))}
        </ul>
      </dialog>
    </div>
  );
};

export default Info;
