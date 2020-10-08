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

const useMap = () => {
  const mapRef = useRef<any>(null);
  const mapAPIRef = useRef<any>(null);
  const [markersData, setMarkersData] = useState<Marker[]>([]);

  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  const H = (window as any).H;

  useLayoutEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
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

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      map.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  useEffect(() => {
    const markersArray = markersData.map((markerData: any) => {
      const htmlElem: any = document.createElement("img");
      htmlElem.src = markerData.iconSrc;
      // activeHotel === markerData.id ? markerActiveIcon : markerData.iconSrc;
      // htmlElem.innerHTML(`<img src=${markerData.iconSrc} />`);
      const icon = new H.map.DomIcon(htmlElem, {
        onAttach: function (clonedElement: any, domIcon: any, domMarker: any) {
          clonedElement.addEventListener("click", () => {
            console.warn("LOLOLOLOLOLOL");
            // setActiveHotel(markerData.id);
            // clonedElement.src = markerActiveIcon;
            // setSelectedMarker(markerData.id);
          });
        },
        // the function is called every time marker leaves the viewport
        // onDetach: function(clonedElement:any, domIcon:any, domMarker:any) {
        //   clonedElement.removeEventListener('mouseover', console.log("mouseOVER") );
        // }
      });
      const marker = new H.map.DomMarker(
        {
          lat: markerData.lat,
          lng: markerData.lng,
        },
        {
          icon,
        }
      );
      return marker;
    });
    const markersGroup = new H.map.Group();
    markersGroup.addObjects(markersArray);

    if (mapAPIRef.current) mapAPIRef.current.addObject(markersGroup);
    // setDOMmarkers(markersGroup);
  }, [markersData]);

  console.log("markersGroup", markersData);
  return {
    mapRef,
    someFunction: () => alert()
  };
};

export default useMap;
