import "../../styles/googleCards.css";
import React, { useRef, useState, useEffect } from "react";

const images: string[] = [
  "assets/images/opinions/1.jpeg",
  "assets/images/opinions/2.jpeg",
  "assets/images/opinions/3.jpeg",
  "assets/images/opinions/4.jpeg",
  "assets/images/opinions/5.jpeg",
  "assets/images/opinions/6.jpeg",
  "assets/images/opinions/7.jpeg",
  "assets/images/opinions/8.jpeg",
  "assets/images/opinions/9.jpeg",
  "assets/images/opinions/10.jpeg",
  "assets/images/opinions/11.jpeg",
  "assets/images/opinions/12.jpeg",
];

const Clients: React.FC = () => {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Iniciar el arrastre
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!marqueeRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - marqueeRef.current.offsetLeft);
    setScrollLeft(marqueeRef.current.scrollLeft);
    setIsPaused(true); // Pausar animación mientras se arrastra
  };

  // Movimiento del arrastre
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !marqueeRef.current) return;
    e.preventDefault();
    const x = e.pageX - marqueeRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Velocidad de desplazamiento
    marqueeRef.current.scrollLeft = scrollLeft - walk;
  };

  // Soltar el arrastre
  const handleMouseUp = () => {
    setIsDragging(false);
    setIsPaused(false); // Reanudar animación después de soltar
  };

  // Desplazamiento infinito suave con mejor transición
  useEffect(() => {
    const marquee = marqueeRef.current;
    if (!marquee) return;

    let animationFrame: number;
    const speed = 0.5; // Reducción de velocidad para suavidad

    const smoothScroll = () => {
      if (!isPaused) {
        marquee.scrollLeft += speed;
        if (marquee.scrollLeft >= marquee.scrollWidth / 2) {
          marquee.scrollLeft = 0; // Reinicio sin corte brusco
        }
      }
      animationFrame = requestAnimationFrame(smoothScroll);
    };

    animationFrame = requestAnimationFrame(smoothScroll);
    return () => cancelAnimationFrame(animationFrame);
  }, [isPaused]);

  return (
    <section
      id="reviews"
      aria-labelledby="clients-heading"
      className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden"
    >
      <h2 id="clients-heading" className="font-semibold text-4xl text-center">
        Our Clients
      </h2>
      <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full"></div>

      {/* Contenedor de opiniones con desplazamiento infinito */}
      <div
        className="marquee-container-google relative overflow-hidden cursor-grab active:cursor-grabbing w-full"
        ref={marqueeRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div className="marquee flex min-w-full">
          {[...images, ...images].map((image, index) => (
            <figure key={index} className="flex gap-4 items-start">
              <div className="bg-white w-80 h-64 flex items-start justify-center p-3 rounded-lg shadow-lg transition-transform duration-300 ease-in-out hover:scale-105">
                <img
                  src={image}
                  alt={`Customer review ${index % images.length + 1}`}
                  loading="lazy"
                  className="max-w-full max-h-full object-contain"
                  draggable="false"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Botón para ver más opiniones */}
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
