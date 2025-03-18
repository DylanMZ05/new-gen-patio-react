import { useState } from "react";
import { FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

const Footer: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const [isMapOpen, setIsMapOpen] = useState(false);

  return (
    <>
      {/* Sección superior con estadísticas y mapa */}
      <section className="border-t border-black/20 relative w-full">
        {/* Título y Estadísticas */}
        <div className="flex flex-col items-center justify-center pt-[70px]">
          <h2 className="font-semibold text-4xl text-center px-1">
            +300 Projects Completed
          </h2>
          <div className="w-30 h-[3px] bg-[#0d4754] my-4 rounded-full"></div>
        </div>

        {/* Botón para Mostrar/Ocultar Mapa */}
        <div className="flex justify-center mt-5">
          <button
            onClick={() => setIsMapOpen(!isMapOpen)}
            className="bg-orange-500 text-white px-4 py-2 font-semibold rounded-full shadow-md hover:bg-orange-600 transition-transform duration-300 hover:scale-105 cursor-pointer mb-5"
            aria-expanded={isMapOpen}
            aria-controls="project-map"
            aria-label={isMapOpen ? "📍 CLOSE MAP" : "📍 VIEW MAP"}
          >
            {isMapOpen ? "📍 CLOSE MAP" : "📍 VIEW MAP"}
          </button>
        </div>

        {/* Contenedor del Mapa - Solo se muestra si isMapOpen es true */}
        {isMapOpen && (
          <div
            id="project-map"
            className="w-full mt-5 flex items-center justify-center bg-gray-200 rounded-lg shadow-lg transition-all duration-700 overflow-hidden"
          >
            <iframe
              className="w-full h-[500px] relative z-0 transition-opacity duration-700 -top-17 -mb-17"
              title="New Gen Patio Locations"
              src="https://www.google.com/maps/d/embed?mid=1vO80YEvHvKl5MYKvlnHiZ6L6cdQo4Xc&amp;ehbc=2E312F"
              loading="lazy"
              aria-label="Google Map showing multiple project locations"
            ></iframe>
          </div>
        )}
      </section>

      {/* Footer principal */}
      <footer id="contact" className="bg-[#0D4C5F] flex items-center justify-center w-full">
        <section className="w-full max-w-[1400px] flex flex-col items-center justify-center py-10 md:px-10">
          
          {/* Contact Section */}
          <h2 className="text-white text-5xl font-semibold mb-4 text-center">
            Get in Touch
          </h2>

          <div className="md:w-full md:flex md:justify-between px-5 max-w-[1100px]">
            {/* Contact Form */}
            <div className="flex flex-col items-center justify-center text-center text-white p-6 w-full max-w-md mt-6 md:mt-10 md:h-100">
              <div className="flex flex-col gap-5">
                <h3 className="text-2xl font-bold md:text-3xl">
                  CONTACT US NOW!
                </h3>
                <p className="mt-2 text-xl text-white/80 md:text-2xl">
                  Within your reach!
                </p>
                <Link
                  to="/formpage"
                  className="w-40 bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition-all mx-auto"
                  onClick={scrollToTop}
                  aria-label="Go to contact form"
                >
                  CONTACT US
                </Link>
              </div>  
            </div>

            {/* Financing Card */}
            <div className="flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6 md:mt-10 md:h-100">
              <h3 className="text-2xl font-bold md:text-3xl">
                FLEXIBLE FINANCING!
              </h3>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                Options available for up to
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                18 MONTHS at 0% INTEREST!
              </p>
              <Link
                to="/calculator"
                className="bg-orange-500 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition-all"
                onClick={scrollToTop}
                aria-label="Check financing options"
              >
                APPLY NOW!
              </Link>
            </div>
          </div>

          <div className="w-full px-5">
            <img
              src="assets/images/IdentidadSVG/LogoBlanco.svg"
              alt="New Gen Patio Logo"
              className="h-20 p-2 pl-0"
              width="65"
              height="80"
              loading="lazy"
            />
          </div>

          {/* Footer Information */}
          <div className="text-white flex flex-col w-full max-w-[1920px] gap-8 md:flex-row md:justify-between px-5 mt-3">
            {/* Company Info */}
            <div className="flex flex-col">
              <h3 className="font-semibold text-2xl mb-3">NEW GEN PATIO</h3>
              <p className="text-white/80">
                Transforming your outdoor spaces with expertly crafted patios and pergolas.
                <br /> Design, quality, and communication at the heart of every project.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="font-semibold text-2xl mb-3">CONTACT</h3>
              <a href="https://wa.me/13463800845" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-all">
                <FaPhoneAlt /> 13463800845
              </a>
              <a href="mailto:info@newgenpatio.io" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-all">
                <FaEnvelope /> info@newgenpatio.io
              </a>
            </div>

            {/* Location (Con Enlace a Google Maps) */}
            <div>
              <h3 className="font-semibold text-2xl mb-3">LOCATION</h3>
              <a
                href="https://www.google.com/maps/place/New+Gen+Patio+LLC+%2F+Aluminum+Pergola+Builders+in+Houston"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-orange-400 transition-all"
              >
                17903 Shaw Rd, Houston, TX 77429, United States
              </a>
              <p className="text-white/50 text-md">(Houston and surrounding areas)</p>
            </div>

            {/* Schedules */}
            <div>
              <h3 className="font-semibold text-2xl mb-3">SCHEDULES</h3>
              <p className="text-white/80">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-white/80">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-white/80">Sunday: Closed</p>
            </div>
          </div>

       {/* Redes Sociales */}
        <div className="flex gap-3 w-full justify-center mt-2">
          {/* Instagram */}
          <a
            href="https://www.instagram.com/newgenpatio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 transition-colors" />
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@newgenpatio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
          >
            <FaTiktok className="w-6 h-6 text-white hover:text-white/70 transition-colors" />
          </a>

          {/* Pinterest */}
          <a
            href="https://www.pinterest.com/newgenpatio/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Pinterest"
          >
            <FaPinterest className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/newgenpatio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-6 h-6 text-white hover:text-blue-500 transition-colors" />
          </a>
        </div>

          {/* Navigation con Separadores "•" */}
          <h3 className="text-white/90 text-xl font-semibold mt-2">Navigation</h3>
          <div className="flex flex-wrap justify-center text-white text-sm mt-4 gap-2">
            {["services", "our-promise", "who-we-are", "blogs", "contact"].map((id, index, array) => {
              const routeMap: { [key: string]: string } = {
                "services": "/services",
                "our-promise": "/howwedoit",
                "who-we-are": "/aboutus",
                "blogs": "/blogs",
                "contact": "/formpage",
              };

              // Usa la ruta mapeada o la predeterminada si no existe en el routeMap
              const path = routeMap[id] || `/${id}`;

              return (
                <span key={id}>
                  <Link 
                    to={path} 
                    className="hover:text-orange-400 transition-colors"
                    onClick={scrollToTop} // Agregado el evento para hacer scroll arriba
                  >
                    {id.replace(/-/g, " ").toUpperCase()}
                  </Link>
                  {index !== array.length - 1 && <span className="text-white/70 mx-1"> •</span>}
                </span>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="w-full bg-white/40 h-[1px] my-5"></div>
          <p className="text-white text-center">© 2024 NEW GEN PATIO. ALL RIGHTS RESERVED.</p>
        </section>
      </footer>
    </>
  );
};

export default Footer;


