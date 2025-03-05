import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";
import { useState, useEffect } from "react";

const AboutUs: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "assets/images/Free3.jpg";
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
        style={{ backgroundImage: "url('assets/images/Free3.jpg')" }}
        aria-hidden="true"
      ></div>

      {/* Capa oscura para mejorar la legibilidad */}
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Contenido sobre la imagen */}
      <div className="relative max-w-3xl px-6">
        <h2 id="about-heading" className="font-semibold text-3xl md:text-4xl">
          About New Gen Patio: Outdoor Living Experts in Texas
        </h2>

        <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>

        <p className="text-lg leading-relaxed opacity-90">
          At <strong>New Gen Patio</strong>, we specialize in designing and building custom
          patio covers that enhance outdoor living spaces across Texas. Our
          mission is to transform backyards into stunning, functional environments
          with high-quality craftsmanship and innovative designs.
        </p>

        <p className="text-lg leading-relaxed opacity-90 mt-4">
          Whether you envision a cozy retreat or a luxurious entertainment area,
          our expert team brings your outdoor dreams to life. With a focus on
          durability, style, and personalization, we ensure that every project
          exceeds expectations.
        </p>

        <Link
          to="/aboutus"
          className="text-gray-900 bg-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block 
            transition-all hover:bg-white/90 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
          onClick={handleScrollToTop}
        >
          Discover Our Story
        </Link>
      </div>
    </section>
  );
};

export default AboutUs;
