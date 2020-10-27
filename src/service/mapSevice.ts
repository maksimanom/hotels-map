import axios from "axios";

import {
  BASE_URL,
  API_KEY,
  DISCOVER_EXPLORE,
  PATH,
} from "../constants/API";

export const getListOfHotels = (
  lat: number = 49.4444,
  lng: number = 32.0596
) => {
  return axios.get(`${BASE_URL}${PATH}${DISCOVER_EXPLORE}`, {
    params: {
      apiKey: API_KEY,
      at: `${lat},${lng}`,
      cat: "accommodation",
    },
  });
};

export const setMapEvents = (map: any) => {
  return "";
};
