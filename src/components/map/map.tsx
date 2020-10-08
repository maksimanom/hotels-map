import React from "react";
import useMap from "../../hooks/useMap";

const Map = () => {
  const { mapRef, someFunction } = useMap();

  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};
export default Map;
