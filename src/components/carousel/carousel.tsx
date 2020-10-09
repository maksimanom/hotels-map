import React, { useRef, useEffect } from "react";

import Slider from "react-slick";
import defaultImage from "../../icons/no-photo.jpg";

import "./carousel-styles.css";

interface CarouselProps {
  markersData: Marker[];
  selectedHotel: string;
}
const Carousel: React.FC<CarouselProps> = ({ markersData, selectedHotel }) => {
  const carouselRef = useRef<any>();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: false,
  };

  useEffect(() => {
    const elementNumber = markersData.findIndex(
      (item: any) => item.id === selectedHotel
    );
    carouselRef?.current?.slickGoTo(elementNumber);
  }, [selectedHotel]);

  if (!markersData || !markersData.length) return null;

  return (
    <div className="carousel">
      <div className="carousel-container">
        <Slider ref={carouselRef} {...settings}>
          {markersData.map((hotel: Marker, index: number) => (
            <div key={index} className="card-wrapper">
              <div className="hotel-card">
                <div className="hotel-info">
                  {hotel.imageSrc ? (
                    <img
                      src={hotel.imageSrc}
                      alt="hotel-photo"
                      className="hotel-image"
                    />
                  ) : (
                    <div className="hotel-image">NO PHOTO AVAILABLE</div>
                  )}
                  <div className="hotel-description">
                    <div>
                      <h3>{hotel.title}</h3>
                      <p>{hotel.distance}m</p>
                    </div>
                    <div>
                      <p>{hotel.price || "no price info"}</p>
                      <p>Designs may vary</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="book-link-wrapper">
                <a className="book-link">Book</a>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default Carousel;
