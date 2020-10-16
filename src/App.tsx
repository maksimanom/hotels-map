import React from "react";
import "./app-styles.css";

import Header from "./components/header/header";
import Map from "./components/map/map";
import Carousel from "./components/carousel/carousel";

import useMap from "./hooks/useMap";
import useMarker from "./hooks/useMarker";

const App = () => {
  const { markersData, refetchMarkers } = useMarker();

  const {
    mapRef,
    changeSelectedHotelBySlider,
    selectedHotel,
  } = useMap(markersData, refetchMarkers);

  return (
    <div className="app">
      <Header />
      <Map mapRef={mapRef} />
      <Carousel
        markersData={markersData}
        changeSelectedHotelBySlider={changeSelectedHotelBySlider}
        selectedHotel={selectedHotel}
      />
    </div>
  );
};

export default App;
