import { useEffect, useState } from "react";

import Game from "./components/Game";
import MapSelector from "./components/MapSelector";

import "./styles.module.css";
import { API_URL } from "./config/constants";

function App() {
  const [mapList, setMapList] = useState(null);
  const [map, setMap] = useState(null);

  const reset = () => {
    setMap(null);
  };

  useEffect(() => {
    fetch(`${API_URL}/map`)
      .then((res) => res.json())
      .then((data) => setMapList(data));
  }, []);

  return (
    <>
      {!map && <MapSelector maps={mapList} setMap={setMap} />}
      {map && <Game map={map} reset={reset} />}
    </>
  );
}

export default App;
