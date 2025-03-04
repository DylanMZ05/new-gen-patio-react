import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css"; // Asegúrate de incluir estilos personalizados si es necesario

interface ImageSliderProps {
  images: string[];
  withBorderT?: boolean; // Se asegura de que sea opcional
  withBorderB?: boolean; // Se asegura de que sea opcional
}


const Slider: React.FC<ImageSliderProps> = ({ images, withBorderT = false, withBorderB = false }) => {
  return (
    <div className={`relative w-full overflow-hidden 
      ${withBorderT ? "border-t-5 border-[#0d4754]" : ""} 
      ${withBorderB ? "border-b-5 border-[#0d4754]" : ""}`}>
      
      {/* Degradado para mejorar la visibilidad de la paginación */}
      <div className="slider-gradient"></div>

      <Swiper
        spaceBetween={10}
        navigation={true}
        modules={[Navigation, Pagination]}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 5 },
          500: { slidesPerView: 2, spaceBetween: 5 },
          1024: { slidesPerView: 3, spaceBetween: 5 },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex items-center justify-center my-1">
            <img src={src} alt={`Slide ${index}`} className="w-full h-64 object-cover" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
