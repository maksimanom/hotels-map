import React, { useRef, useState } from "react";

import { getListOfHotels } from "../service/mapSevice";
import { fromDTOHotelMarker } from "../utils/fromDTOHotelMarker";

const useMarker = () => {
  const [markersData, setMarkersData] = useState<Marker[]>([]);
  const markRef = useRef<Marker[]>([]);

  const refetchMarkers = (map: any) => {
    const center: Center = map.getCenter();
    const { lat, lng } = center;
    getListOfHotels(lat, lng).then(
      ({
        data: {
          results: { items },
        },
      }) => {
        const hotelsMarkerData: Marker[] = fromDTOHotelMarker(items);
        const currentMarkersIdsArray: string[] = markRef.current
          ?.map((item: Marker) => item.id)
          .sort();
        const newMarkersIdsArray: string[] = hotelsMarkerData
          .map((item: Marker) => item.id)
          .sort();
        const isEqualsArrays =
          JSON.stringify(currentMarkersIdsArray) ==
          JSON.stringify(newMarkersIdsArray);
        if (!isEqualsArrays) {
          markRef.current = hotelsMarkerData;
          setMarkersData(hotelsMarkerData);
        }
      }
    );
  };

  return {
    markersData,
    refetchMarkers,
  };
};

export default useMarker;
