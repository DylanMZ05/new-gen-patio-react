import "../../styles/googleCards.css";
import React, { useRef, useEffect, useState } from "react";

const images: string[] = Array.from(
  { length: 71 },
  (_, i) => `assets/images/opinions/${String(i + 1).padStart(2, '0')}.webp`
);

const Clients: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [animationDuration, setAnimationDuration] = useState("20s"); // Ajustable dinámicamente

  useEffect(() => {
    if (marqueeRef.current) {
      const totalWidth = marqueeRef.current.scrollWidth / 2; // Ancho total de imágenes
      const speed = 50; // 🔥 Aumentamos la velocidad (px/s) para que sea más rápido
      const duration = totalWidth / speed;

      setAnimationDuration(`${duration}s`);
    }
  }, []);

  return (
    <section
      id="reviews"
      aria-labelledby="clients-heading"
      className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden bg-gray-100"
    >
      <h2 id="clients-heading" className="font-semibold text-4xl text-center">
        Our Clients
      </h2>
      <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full"></div>

      <div className="marquee-reviews-container max-w-[1080px]" ref={marqueeRef}>
        <a href="https://www.google.com/search?q=new+gen+patio+reviews"
          target="_blank"
          className="marquee-reviews cursor-pointer"
          style={{ animationDuration: animationDuration }}
        >
          {[...images, ...images].map((image, index) => (
            <div key={index} className="review-card">
              <img src={image} alt={`Customer review ${index + 1}`} />
            </div>
          ))}
        </a>
      </div>

      <a
        href="https://www.google.com/search?q=new+gen+patio+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-black text-xl font-semibold px-5 pt-1 pb-2 rounded-full mt-5 inline-block 
          transition-all hover:bg-black/90 hover:scale-105 focus:ring-2 focus:ring-white focus:outline-none"
      >
        View all reviews
      </a>
    </section>
  );
};

export default Clients;