// src/components/Slider/Slider.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

// NUEVO: Permite cualquier contenido (no solo imágenes)
interface SliderProps {
  items: React.ReactNode[];
  slidesPerView?: {
    base: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  withBorderT?: boolean;
  withBorderB?: boolean;
}

const Slider: React.FC<SliderProps> = ({
  items,
  slidesPerView = { base: 1 },
  withBorderT = false,
  withBorderB = false,
}) => {
  if (!items || items.length === 0) return null;

  // Convertir slidesPerView en breakpoints para Swiper
  const breakpoints: Record<number, { slidesPerView: number; spaceBetween: number }> = {
    0: { slidesPerView: slidesPerView.base || 1, spaceBetween: 10 },
    768: { slidesPerView: slidesPerView.md || slidesPerView.base || 1, spaceBetween: 10 },
    1024: { slidesPerView: slidesPerView.lg || slidesPerView.md || slidesPerView.base || 1, spaceBetween: 10 },
    1324: { slidesPerView: slidesPerView.xl || slidesPerView.lg || slidesPerView.base || 1, spaceBetween: 10 },
  };

  return (
    <div
      role="region"
      aria-label="Slider Component"
      aria-live="polite"
      className={`relative w-full overflow-hidden 
        ${withBorderT ? "border-t-5 border-[#0d4754]" : ""} 
        ${withBorderB ? "border-b-5 border-[#0d4754]" : ""}`}
    >
      <div className="slider-gradient"></div>

      <Swiper
        spaceBetween={10}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        breakpoints={breakpoints}
        className="w-full"
      >
        {items.map((item, index) => (
          <SwiperSlide key={index} className="my-2">
            {item}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
