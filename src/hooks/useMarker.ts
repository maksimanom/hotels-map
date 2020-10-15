import React, { useState } from "react";

import { getListOfHotels } from "../service/mapSevice";
import { fromDTOHotelMarker } from "../utils/fromDTOHotelMarker";

const useMarker = () => {
  const [markersData, setMarkersData] = useState<Marker[]>([]);

  const refetchMarkers = (map: any, markersData: Marker[]) => {
    const center: Center = map.getCenter();
    const { lat, lng } = center;
    getListOfHotels(lat, lng).then((res) => {
      const items = res.data.results.items;
      const hotelsMarkerData: Marker[] = fromDTOHotelMarker(items);
      // const currentIdsArray = markersData.map((item) => item.id);
      console.warn(markersData);
      console.warn(hotelsMarkerData);
      setMarkersData(hotelsMarkerData);
    });
  };

  return {
    markersData,
    refetchMarkers,
  };
};

export default useMarker;
