import React from "react";

import Header from "./components/header/header";
import Map from "./components/map/map";
import Carousel from "./components/carousel/carousel";

import useMap from "./hooks/useMap";

function App() {
  const { mapRef, markersData, selectedHotel } = useMap();

  return (
    <>
      <Header />
      <Map mapRef={mapRef} />
      <Carousel markersData={markersData} selectedHotel={selectedHotel} />
    </>
  );
}

export default App;
