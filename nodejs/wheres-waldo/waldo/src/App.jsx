import { useEffect, useState } from "react";

import Game from "./components/Game";
import MapSelector from "./components/MapSelector";

import "./styles.css";
import { fetchData } from "./utils";

function App() {
  const [mapList, setMapList] = useState(null);
  const [map, setMap] = useState(null);

  const reset = () => {
    setMap(null);
  };

  useEffect(() => {
    fetchData(`map`)
      .then((data) => setMapList(data))
      .catch(() => setMapList([]));
  }, []);

  return (
    <>
      {!map && <MapSelector maps={mapList} setMap={setMap} />}
      {map && <Game map={map} reset={reset} />}
    </>
  );
}

export default App;
