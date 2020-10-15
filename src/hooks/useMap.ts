import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

import { API_KEY } from "../constants/API";
import { getMarkersGroup } from "../utils/getMarkersGroup";

const useMap = (markersData: Marker[], refetchMarkers: Function) => {
  const mapRef = useRef<any>(null);
  const mapAPIRef = useRef<any>(null);
  const [mapMarkersGroup, setMapMarkersGroup] = useState<any>();
  const [selectedHotel, setSelectedHotel] = useState<string>("");

  const selectHotel = (id: string) => {
    setSelectedHotel(id);
  };

  const changeSelectedHotelBySlider = (
    id: string,
    lat: number,
    lng: number
  ) => {
    setSelectedHotel(id);
    mapAPIRef.current.setCenter({ lat, lng });
  };

  const H = (window as any).H;

  useEffect(() => {
    const platform = new H.service.Platform({
      apikey: API_KEY,
    });
    const defaultLayers = platform.createDefaultLayers();
    const map = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 49.4411, lng: 32.0644 },
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1,
    });
    mapAPIRef.current = map;
    // onDragEnd(map); // not working when first render.
    map.addEventListener("dragend", (e: any) => {
      refetchMarkers(map, markersData);
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

  return {
    mapRef,
    changeSelectedHotelBySlider,
    setSelectedHotel,
    selectedHotel,
    mapAPIRef,
  };
};

export default useMap;
