import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Slider.css";

interface ImageSliderProps {
  images: string[];
  withBorderT?: boolean;
  withBorderB?: boolean;
}

const Slider: React.FC<ImageSliderProps> = ({
  images,
  withBorderT = false,
  withBorderB = false,
}) => {
  if (images.length === 0) return null;

  return (
    <div
      role="region"
      aria-label="Project Gallery"
      aria-live="polite"
      className={`relative w-full overflow-hidden 
        ${withBorderT ? "border-t-5 border-[#0d4754]" : ""} 
        ${withBorderB ? "border-b-5 border-[#0d4754]" : ""}`}
    >
      <div className="slider-gradient"></div>

      <Swiper
        spaceBetween={10}
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="w-full"
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 5 },
          400: { slidesPerView: 2, spaceBetween: 5 },
          600: { slidesPerView: 4, spaceBetween: 5 },
          1024: { slidesPerView: 6, spaceBetween: 5 },
          1324: { slidesPerView: 8, spaceBetween: 5 },
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="flex items-center justify-center my-1"
          >
            <img
              src={src}
              alt={`Custom aluminum pergola project ${index + 1} by New Gen Patio`}
              className="w-full aspect-square object-cover rounded-lg shadow-lg"
              loading="lazy"
              width={300}
              height={300}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
