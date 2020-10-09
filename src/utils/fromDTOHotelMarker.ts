import markerDefault from "../icons/marker-default.svg";

export const fromDTOHotelMarker = (markers: any) => {
  const markerToArray = Array.isArray(markers) ? markers : [markers];
  const toObject = markerToArray.map((markerData) => ({
    id: markerData.id,
    lat: markerData.position[0],
    lng: markerData.position[1],
    title: markerData.title,
    address: markerData.vicinity,
    iconSrc: markerDefault,
    distance: markerData.distance,
  }));
  return toObject;
};
