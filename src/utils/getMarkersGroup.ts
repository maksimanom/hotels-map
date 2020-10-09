import iconActive from "../icons/marker-active.svg";

const H = (window as any).H;

export const getMarkersGroup = (
  markersData: Marker[],
  selectHotel: Function,
  selectedHotel: string
) => {
  const markersArray = markersData.map((markerData: Marker) => {
    const htmlElem: any = document.createElement("img");
    htmlElem.src =
      markerData.id === selectedHotel ? iconActive : markerData.iconSrc;
    const icon = new H.map.DomIcon(htmlElem, {
      onAttach: function (clonedElement: any, domIcon: any, domMarker: any) {
        clonedElement.addEventListener("click", () => {
          selectHotel(markerData.id);
        });
      },
      onDetach: function (clonedElement: any, domIcon: any, domMarker: any) {
        clonedElement.removeEventListener("click", selectHotel);
      },
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
  return markersGroup;
};
