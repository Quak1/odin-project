import { useEffect, useState } from "react";

import Game from "./components/Game";
import MapSelector from "./components/MapSelector";

import "./styles.module.css";
import { API_URL } from "./config/constants";

function App() {
  const [mapList, setMapList] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/map`)
      .then((res) => res.json())
      .then((data) => setMapList(data));
  }, []);

  return (
    <>
      <MapSelector maps={mapList} setMap={setMap} />
      {map && <Game />}
    </>
  );
}

export default App;
