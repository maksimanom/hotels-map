import React, { ReactNode } from "react";

interface MapProps {
  mapRef: any;
}
const Map: React.FC<MapProps> = ({ mapRef }) => {
  return <div className="map" ref={mapRef} style={{ height: "500px" }} />;
};
export default Map;
