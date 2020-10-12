import React, { useRef, useEffect, useCallback } from "react";

import Slider from "react-slick";

import "./carousel-styles.css";

interface CarouselProps {
  markersData: Marker[];
  selectedHotel: string;
  changeSelectedHotelBySlider: Function;
  setSelectedHotel: Function;
}
const Carousel: React.FC<CarouselProps> = ({
  markersData,
  selectedHotel,
  changeSelectedHotelBySlider,
  setSelectedHotel,
}) => {
  const carouselRef = useRef<any>();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    adaptiveHeight: true,
    // afterChange: (currentSlideNumber: number) => {
    //   const element: Marker = markersData[currentSlideNumber];
    //   const { id, lat, lng } = element;
    //   setSelectedHotel(id);
    // },
    onSwipe: (toSide: string) => {
      const currentSlide = carouselRef.current.innerSlider.state.currentSlide;
      const curSlideNum =
        toSide === "left" ? currentSlide + 1 : currentSlide - 1;
      let n: number = curSlideNum;
      if (curSlideNum >= markersData.length) {
        n = 0;
      }
      if (curSlideNum < 0) {
        n = markersData.length - 1;
      }
      const element: Marker = markersData[n];
      const { id, lat, lng } = element;
      console.log(id, lat, lng);
      changeSelectedHotelBySlider(id, lat, lng);
    },
  };

  useEffect(() => {
    const elementNumber = markersData.findIndex(
      (item: any) => item.id === selectedHotel
    );
    carouselRef?.current?.slickGoTo(elementNumber);
  }, [markersData, selectedHotel]);

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
                      <h3 className="hotel-title">{hotel.title}</h3>
                      <p>
                        {hotel.distance}m
                      </p>
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
