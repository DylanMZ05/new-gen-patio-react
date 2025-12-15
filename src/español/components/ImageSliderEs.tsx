import React, { useEffect, useRef, useState } from "react";

interface ImageSliderProps {
  images: string[];
  alt: string;
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const sliderRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const totalSlides = images.length + 1; // +1 por el clon

  useEffect(() => {
    if (images.length <= 1) return;

    startAutoSlide();
    return () => stopAutoSlide();
  }, [images.length]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
      setIsTransitioning(true);
    }, 4000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const handleTransitionEnd = () => {
    if (currentIndex === images.length) {
      setIsTransitioning(false);
      setCurrentIndex(0);
    }
  };

  useEffect(() => {
    if (!isTransitioning && currentIndex === 0) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true);
        });
      });
    }
  }, [currentIndex, isTransitioning]);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <img
        src={images[0]}
        alt={alt}
        className="rounded-lg shadow-md w-full object-cover aspect-[3/2]"
        loading="lazy"
        width={800} // ⬅️ estimado, podés ajustar según el diseño
        height={533}
      />
    );
  }

  return (
    <div className="relative w-full overflow-hidden aspect-[3/2] rounded-lg shadow-md">
      <div
        ref={sliderRef}
        className={`flex h-full ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
        onTransitionEnd={handleTransitionEnd}
        style={{
          width: `${totalSlides * 100}%`,
          transform: `translateX(-${(currentIndex * 100) / totalSlides}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${alt} - Slide ${index + 1}`}
            className="w-full h-full object-cover flex-shrink-0"
            style={{ width: `${100 / totalSlides}%` }}
            loading="lazy"
            width={800}
            height={533}
          />
        ))}

        {/* Clon de la primera imagen para loop */}
        <img
          src={images[0]}
          alt={`${alt} - Slide 1 (clone)`}
          className="w-full h-full object-cover flex-shrink-0"
          style={{ width: `${100 / totalSlides}%` }}
          loading="lazy"
          width={800}
          height={533}
        />
      </div>
    </div>
  );
};

export default ImageSlider;
