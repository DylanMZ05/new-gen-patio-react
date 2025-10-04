import { useCallback, useMemo, useState } from "react";
import {
  FaInstagram,
  FaTiktok,
  FaPhoneAlt,
  FaEnvelope,
  FaPinterest,
  FaFacebookF,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";
import ContractorCard from "../ContractorCard";

/**
 * Optimizaciones:
 * - CLS: contenedores con aspect-ratio y tamaños intrínsecos en imágenes.
 * - El mapa se monta sólo tras clic (no existe antes).
 * - Se recorta la barra superior de Google My Maps desplazando el iframe dentro de un wrapper con overflow:hidden.
 * - content-visibility para reducir trabajo de layout/paint en secciones largas.
 * - Accesibilidad: ARIA, focus-visible, rels adecuados.
 */

const Footer: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const [isMapOpen, setIsMapOpen] = useState(false);

  // Altura aproximada de la barra superior de My Maps a ocultar (px)
  const MAP_BAR = 68;

  const navItems = useMemo(
    () => ["services", "our-promise", "who-we-are", "blogs", "contact"] as const,
    []
  );

  const routeMap: Record<(typeof navItems)[number], string> = {
    "services": "/aluminium-custom-pergola-cover-patio",
    "our-promise": "/how-we-doit",
    "who-we-are": "/about-us",
    "blogs": "/blog",
    "contact": "/contact-us",
  };

  const toggleMap = useCallback(() => setIsMapOpen((v) => !v), []);

  return (
    <>
      {/* =====================  Top section: Stats + Map  ===================== */}
      <section
        className="
          border-t border-black/20 w-full
          [content-visibility:auto] [contain-intrinsic-size:600px]
        "
      >
        {/* Title + Stats */}
        <div className="flex flex-col items-center justify-center pt-[50px]">
          <p className="font-semibold text-4xl text-center px-1 leading-tight">
            +500 Projects Completed
          </p>
          <div
            className="w-30 h-[3px] bg-[#0d4754] mt-4 mb-2 rounded-full"
            aria-hidden="true"
          />
          <p className="text-center text-gray-800 text-base mt-2 px-4">
            Click the button below to view a map with completed project locations.
          </p>
        </div>

        {/* Button to show/hide map */}
        <div className="flex justify-center mt-5">
          <button
            onClick={toggleMap}
            className="
              bg-orange-500 border border-white/10 text-white px-4 py-2
              font-semibold rounded-full shadow-md hover:bg-orange-600
              transition-transform duration-300 hover:scale-105 cursor-pointer mb-5
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
            aria-expanded={isMapOpen}
            aria-controls="project-map"
          >
            {isMapOpen ? "📍 CLOSE MAP" : "📍 VIEW MAP"}
          </button>
        </div>

        {/* Map container (only when open) */}
        {isMapOpen && (
          <div
            id="project-map"
            className="
              relative w-full mt-5 bg-gray-200 rounded-lg shadow-lg
              overflow-hidden transition-opacity duration-500
            "
            // Reserva espacio estable para evitar CLS
            style={{ aspectRatio: "16 / 9" }}
          >
            {/* 
              Recorte seguro de la barra superior de My Maps:
              - Desplazamos el iframe -MAP_BAR px hacia arriba
              - Aumentamos su altura total en +MAP_BAR px
              - El wrapper tiene overflow:hidden, por lo que la barra queda fuera de vista
            */}
            <iframe
              title="New Gen Patio Locations"
              src="https://www.google.com/maps/d/embed?mid=1vO80YEvHvKl5MYKvlnHiZ6L6cdQo4Xc&ehbc=2E312F"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute left-0 top-0 block w-full"
              style={{
                top: -MAP_BAR,
                height: `calc(100% + ${MAP_BAR}px)`,
              }}
            />
          </div>
        )}
      </section>

      {/* =====================  Main Footer  ===================== */}
      <footer
        id="contact"
        className="
          bg-[#0D4C5F] flex items-center justify-center w-full
          [content-visibility:auto] [contain-intrinsic-size:900px]
        "
      >
        <section className="w-full max-w-[1400px] flex flex-col py-10 md:px-10 md:items-center md:justify-center">
          {/* Contact CTA */}
          <p className="text-white text-5xl font-semibold mb-4 text-center mx-8 leading-tight">
            Do you have a <br /> project in mind?
          </p>

          <div className="flex flex-col-reverse gap-4 mb-5 items-start md:w-full md:flex-row md:justify-between px-5 max-w-[1100px]">
            {/* Contractor Call-To-Action Card */}
            <ContractorCard />

            {/* Financing Card */}
            <div
              className="
                flex flex-col items-center justify-center gap-3
                bg-gradient-to-t md:bg-gradient-to-r from-red-800 to-purple-800
                text-center text-white p-6 rounded-lg shadow-lg w-full mt-6 md:mt-10
                md:h-100 md:max-w-md
              "
            >
              <p className="text-2xl font-bold md:text-3xl">FLEXIBLE FINANCING!</p>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                Options available for up to
              </p>
              <p className="text-2xl font-bold md:text-3xl">18 MONTHS at 0% INTEREST!</p>
              <Link
                to="/patio-financing-houston"
                className="bg-orange-500 border border-white/10 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition-all"
                onClick={scrollToTop}
                aria-label="Check financing options"
              >
                APPLY NOW!
              </Link>
            </div>
          </div>

          {/* Brand / Info */}
          <div className="w-full px-5">
            <img
              src="/assets/images/IdentidadSVG/LogoBlanco.svg"
              alt="New Gen Patio Logo"
              className="h-20 p-2 pl-0 select-none"
              width={160}
              height={80}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div className="text-white flex flex-col w-full max-w-[1920px] gap-8 md:flex-row md:justify-between px-5 mt-3">
            {/* Company Info */}
            <div className="flex flex-col text-white md:max-w-[50%]">
              <p className="font-semibold text-2xl mb-3">NEW GEN PATIO</p>
              <p className="text-white/80">
                Transforming your outdoor spaces with expertly crafted patios and pergolas.
                We specialize in creating stunning, functional outdoor areas that elevate your
                lifestyle and add lasting value to your home. With design, quality, and clear
                communication at the heart of every project, we ensure a seamless experience
                from concept to completion.
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <p className="font-semibold text-2xl mb-3">CONTACT</p>
              <a
                href="https://wa.me/+13465819082"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-all"
              >
                <FaPhoneAlt aria-hidden="true" /> +1 346 581 9082
              </a>
              <a
                href="mailto:info@newgenpatio.io"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-all"
              >
                <FaEnvelope aria-hidden="true" /> info@newgenpatio.io
              </a>
            </div>

            {/* Location */}
            <div>
              <p className="font-semibold text-2xl mb-3">LOCATION</p>
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
              <p className="font-semibold text-2xl mb-3">SCHEDULES</p>
              <p className="text-white/80">Monday - Friday: 8:00 AM - 6:00 PM</p>
              <p className="text-white/80">Saturday: 9:00 AM - 4:00 PM</p>
              <p className="text-white/80">Sunday: Closed</p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-3 w-full justify-center mt-2">
            <a
              href="https://www.instagram.com/newgenpatio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 transition-colors" />
            </a>

            <a
              href="https://www.tiktok.com/@newgenpatio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <FaTiktok className="w-6 h-6 text-white hover:text-white/70 transition-colors" />
            </a>

            <a
              href="https://www.pinterest.com/newgenpatio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Pinterest"
            >
              <FaPinterest className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
            </a>

            <a
              href="https://www.facebook.com/newgenpatio"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-6 h-6 text-white hover:text-blue-500 transition-colors" />
            </a>
          </div>

          {/* Navigation */}
          <p className="text-white/90 text-xl font-semibold mt-2 text-center">
            Navigation
          </p>
          <nav
            className="flex flex-wrap justify-center text-white text-sm mt-4 gap-2"
            aria-label="Footer Navigation"
          >
            {navItems.map((id, index) => {
              const path = routeMap[id] ?? `/${id}`;
              return (
                <span key={id} className="inline-flex items-center">
                  <Link
                    to={path}
                    className="hover:text-orange-400 transition-colors"
                    onClick={scrollToTop}
                  >
                    {id.replace(/-/g, " ").toUpperCase()}
                  </Link>
                  {index !== navItems.length - 1 && (
                    <span aria-hidden="true" className="text-white/70 mx-1">
                      •
                    </span>
                  )}
                </span>
              );
            })}
          </nav>

          {/* Copyright */}
          <div className="w-full bg-white/40 h-[1px] my-5" aria-hidden="true" />
          <p className="text-white text-center">
            © 2024 NEW GEN PATIO. ALL RIGHTS RESERVED.
          </p>
        </section>
      </footer>
    </>
  );
};

export default Footer;
