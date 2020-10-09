import React from "react";
import "./app-styles.css";

import Header from "./components/header/header";
import Map from "./components/map/map";
import Carousel from "./components/carousel/carousel";

import useMap from "./hooks/useMap";

function App() {
  const { mapRef, markersData, selectedHotel } = useMap();

  return (
    <div className="app">
      <Header />
      <Map mapRef={mapRef} />
      <Carousel markersData={markersData} selectedHotel={selectedHotel} />
    </div>
  );
}

export default App;
