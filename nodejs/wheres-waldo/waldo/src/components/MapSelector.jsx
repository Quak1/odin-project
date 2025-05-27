const MapSelector = ({ maps, setMap }) => {
  console.log("MapSelector", maps);

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Choose a map to play:</p>
      {maps && (
        <div>
          {maps.map((map) => (
            <MapCard map={map} />
          ))}
        </div>
      )}
    </div>
  );
};

const MapCard = ({ map }) => (
  <div key={map.id}>
    <img src={map.url} alt={`${map.name}`} />
    <p>{map.name}</p>
  </div>
);

export default MapSelector;
