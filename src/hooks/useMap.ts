import React, { useRef, useLayoutEffect } from "react";
import {
  BASE_URL,
  API_KEY,
  APP_ID,
  DISCOVER_EXPLORE,
  DISCOVER_SEARCH,
  PATH,
} from "../constants/API";

const useMap = () => {
  const mapRef = useRef<any>(null);

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
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 49.4411, lng: 32.0644 },
      zoom: 17,
      pixelRatio: window.devicePixelRatio || 1,
    });

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef]); // This will run this hook every time this ref is updated

  return {
    mapRef,
  };
};

export default useMap;
