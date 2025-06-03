import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const OurProcessHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "assets/images/Products/Patios&Pergolas/Attached/02.webp";
    img.onload = () => setBgLoaded(true);
  }, []);

  return (
    <section
      id="who-we-are"
      aria-labelledby="about-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-white text-center overflow-hidden"
    >
      {/* Imagen de fondo con efecto fijo */}
      <div
        className={`absolute inset-0 bg-cover bg-center bg-fixed transition-opacity duration-700 ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        style={{ backgroundImage: "url('assets/images/Products/Patios&Pergolas/Attached/02.webp')" }}
        aria-hidden="true"
      ></div>

      {/* Capa oscura para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Contenido sobre la imagen */}
      <div className="relative max-w-2xl px-6 text-center">
        <h2 id="about-heading" className="font-semibold text-3xl md:text-4xl">
        Quality & Sustainability Commitment
        </h2>

        <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>

        <h3 className="text-lg leading-relaxed opacity-90">
        We design maintenance-free aluminum structures backed by a 5-year warranty. Our 100% recyclable materials ensure durability while reducing environmental impact. From custom 3D designs to seamless permit handling, we make your outdoor vision a reality.
        </h3>

        <Link
          to="/our-promise-patio-builders-houston"
          className="text-black bg-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block 
            transition-all hover:bg-white/90 hover:scale-103 focus:ring-2 focus:ring-white focus:outline-none"
          onClick={handleScrollToTop}
        >
          Our Promise
        </Link>
      </div>
    </section>
  );
};

export default OurProcessHome;