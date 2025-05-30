import { useEffect, useState } from "react";

import Game from "./components/Game";
import MapSelector from "./components/MapSelector";

import "./styles.module.css";
import fetchData from "./config/fetchData";

function App() {
  const [mapList, setMapList] = useState(null);
  const [map, setMap] = useState(null);

  const reset = () => {
    setMap(null);
  };

  useEffect(() => {
    fetchData(`map`).then((data) => setMapList(data));
  }, []);

  return (
    <>
      {!map && <MapSelector maps={mapList} setMap={setMap} />}
      {map && <Game map={map} reset={reset} />}
    </>
  );
}

export default App;
