import React, { useRef, useLayoutEffect, useState, useEffect } from "react";

import { API_KEY } from "../constants/API";
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

  const setNewListOfHotels = (map: any) => {
    const center: Center = map.getCenter();
    getListOfHotels(center.lat, center.lng).then((res) => {
      const items = res.data.results.items;
      const hotelsMarkerData: Marker[] = fromDTOHotelMarker(items);
      const currentIdsArray: string[] = markersData.map((item) => item.id);
      const idOfSelectedIsPresent = currentIdsArray.includes(selectedHotel);
      console.log("markersData", markersData);
      console.log("currentIdsArray", currentIdsArray);
      console.log("selectedHotel", selectedHotel);
      console.log("idOfSelectedIsPresent", idOfSelectedIsPresent);
      if (!idOfSelectedIsPresent) setSelectedHotel("");
      setMarkersData(hotelsMarkerData);
    });
    console.log("markersData12321312312", markersData);
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

  useLayoutEffect(() => {
    if (!mapRef.current) return;

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
    setNewListOfHotels(map); // not working when first render.
    map.addEventListener("dragend", () => {
      setNewListOfHotels(map);
    });

    // map.addEventListener("dragend", function (evt: any) {
    //   setNewListOfHotels(map);
    // });

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
    markersData,
    changeSelectedHotelBySlider,
    setSelectedHotel,
    selectedHotel,
  };
};

export default useMap;
