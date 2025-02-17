import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css"; // Importamos el CSS corregido

interface ImageSliderProps {
  images: string[];
}

const Slider: React.FC<ImageSliderProps> = ({ images }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto p-4">
      {/* Degradado para mejorar la visibilidad de la paginación */}
      <div className="slider-gradient"></div>

      <Swiper
        slidesPerView={3}
        spaceBetween={0}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index}>
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-full h-64 object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;