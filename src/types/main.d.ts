declare module "react-slick";

interface Marker {
  id: string;
  lat: number;
  lng: number;
  title: string;
  distance: number;
  address: string;
  iconSrc: string;
  price?: number | undefined | null;
}

interface Center {
  lat: number;
  lng: number;
  alt: number;
}
