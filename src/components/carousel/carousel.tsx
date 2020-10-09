import React, { useRef } from "react";

import Slider from "react-slick";

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

  console.warn(markersData);

  return (
    <div className="carousel">
      <div className="carousel-container">
        <Slider ref={carouselRef} {...settings}>
          {markersData.map((hotel: any, index: number) => (
            <div key={index} className="hotel-card">
              <div className="hotel-info">
                <img src="" alt="" />
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
          ))}
        </Slider>
      </div>
    </div>
  );
};
export default Carousel;
