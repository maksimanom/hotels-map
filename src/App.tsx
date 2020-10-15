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
    setSelectedHotel,
    selectedHotel,
  } = useMap(markersData, refetchMarkers);

  // const handleDragEnd = (map: any, markersData: Marker[]) => {
  //   onDragEnd(map, markersData);
  // };

  return (
    <div className="app">
      <Header />
      <Map mapRef={mapRef} />
      <Carousel
        markersData={markersData}
        changeSelectedHotelBySlider={changeSelectedHotelBySlider}
        setSelectedHotel={setSelectedHotel}
        selectedHotel={selectedHotel}
      />
    </div>
  );
};

export default App;
