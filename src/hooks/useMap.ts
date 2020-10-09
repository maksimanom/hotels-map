import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

import {
  BASE_URL,
  API_KEY,
  APP_ID,
  DISCOVER_EXPLORE,
  DISCOVER_SEARCH,
  PATH,
} from "../constants/API";
import { getListOfHotels } from "../service/mapSevice";
import { fromDTOHotelMarker } from "../utils/fromDTOHotelMarker";
import { getMarkersGroup } from "../utils/getMarkersGroup";

const useMap = () => {
  const mapRef = useRef<any>(null);
  const mapAPIRef = useRef<any>(null);
  const [markersData, setMarkersData] = useState<Marker[]>([]);
  const [mapMarkersGroup, setMapMarkersGroup] = useState<any>();
  const [selectedHotel, setSelectedHotel] = useState<string>("");

  const selectHotel = (id: string) => {
    setSelectedHotel(id);
  };

  const H = (window as any).H;

  useLayoutEffect(() => {
    if (!mapRef.current) return;

    const platform = new H.service.Platform({
      apikey: API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 49.4411, lng: 32.0644 },
      zoom: 17,
      pixelRatio: window.devicePixelRatio || 1,
    });
    mapAPIRef.current = map;
    map.addEventListener("dragend", function (evt: any) {
      const center: Center = map.getCenter();
      getListOfHotels(center.lat, center.lng).then((res) => {
        const items = res.data.results.items;
        const hotelsMarkerData: Marker[] = fromDTOHotelMarker(items);
        setMarkersData(hotelsMarkerData);
      });
    });

    const ui = H.ui.UI.createDefault(map, defaultLayers);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    return () => {
      map.dispose();
    };
  }, [mapRef]);

  useEffect(() => {
    mapMarkersGroup && mapAPIRef.current.removeObject(mapMarkersGroup);
    const markersGroup = getMarkersGroup(
      markersData,
      selectHotel,
      selectedHotel
    );
    setMapMarkersGroup(markersGroup);
    if (mapAPIRef.current) mapAPIRef.current.addObject(markersGroup);
  }, [markersData, selectedHotel]);

  // useEffect(() => {

  // }, [selectedHotel]);

  console.log("markersGroup", markersData);
  console.log("selectedHotel", selectedHotel);
  return {
    mapRef,
  };
};

export default useMap;
