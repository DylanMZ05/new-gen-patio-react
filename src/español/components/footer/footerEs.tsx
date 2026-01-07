import { useCallback, useMemo, useState } from "react";
import { FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";
import ContractorCardEs from "../ContractorCardEs";

const FooterEs: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const MAP_BAR = 68;

  // Menú de navegación (Hardcodeado y ajustado para rutas ES)
  const navItems = useMemo(() => ["services", "our-promise", "who-we-are", "blogs", "contact"] as const, []);
  
  const routeMap: Record<(typeof navItems)[number], string> = {
    services: "/aluminium-custom-pergola-cover-patio/es",
    "our-promise": "/how-we-doit/es",
    "who-we-are": "/about-us/es",
    blogs: "/blog/es",
    contact: "/contact-us/es",
  };
  
  // Textos del menú (Hardcodeado en español)
  const navItemLabels: Record<(typeof navItems)[number], string> = {
    services: "Servicios",
    "our-promise": "Nuestra Promesa",
    "who-we-are": "Quiénes Somos",
    blogs: "Blog",
    contact: "Contacto",
  };
  
  const toggleMap = useCallback(() => setIsMapOpen(v => !v), []);

  // ✅ Hardcodeado: Textos del botón del mapa
  const mapButtonText = isMapOpen ? "📍 CERRAR MAPA" : "📍 VER MAPA";
  
  // === TEXTOS FIJOS EN ESPAÑOL ===
  const PROJECTS_COMPLETED = "+500 Proyectos Completados";
  const MAP_DESCRIPTION = "Haz clic en el botón de abajo para ver el mapa de nuestras ubicaciones y proyectos finalizados.";
  const MAP_TITLE = "Ubicaciones de New Gen Patio";
  const CTA_QUESTION_LARGE = "¿Tienes un";
  const CTA_PROJECT_WORD = "proyecto en mente?";
  const FINANCING_TITLE = "¡FINANCIAMIENTO FLEXIBLE!";
  const FINANCING_SUBTITLE = "Opciones disponibles de hasta";
  const FINANCING_INTEREST = "¡18 MESES con 0% DE INTERÉS!";
  const FINANCING_LINK_ARIA = "Ver opciones de financiamiento";
  const FINANCING_LINK_TEXT = "¡SOLICITA AHORA!";
  const LOGO_ALT = "Logotipo de New Gen Patio";
  const COMPANY_TITLE = "NEW GEN PATIO";
  const COMPANY_DESCRIPTION = "Transformamos tus espacios exteriores con patios y pérgolas diseñados por expertos. Nos especializamos en crear áreas impresionantes y funcionales que elevan tu estilo de vida y añaden valor duradero a tu hogar. Con el diseño, la calidad y una comunicación clara como pilares de cada proyecto, garantizamos una experiencia excepcional de principio a fin.";
  const CONTACT_TITLE = "CONTACTO";
  const LOCATION_TITLE = "UBICACIÓN";
  const LOCATION_ADDRESS = "17903 Shaw Rd, Houston, TX 77429, Estados Unidos";
  const LOCATION_AREA = "(Houston y áreas circundantes)";
  const SCHEDULE_TITLE = "HORARIOS";
  const SCHEDULE_WEEKDAY = "Lunes - Viernes: 8:00 AM - 6:00 PM";
  const SCHEDULE_SATURDAY = "Sábado: 9:00 AM - 4:00 PM";
  const SCHEDULE_SUNDAY = "Domingo: Cerrado";
  const NAVIGATION_TITLE = "Navegación";
  const COPYRIGHT = `© ${new Date().getFullYear()} NEW GEN PATIO. TODOS LOS DERECHOS RESERVADOS.`;
  
  // Ruta del logo
  const LOGO_PATH = "../../../assets/images/IdentidadSVG/LogoBlanco.svg";

  return (
    <>
      {/* ===================== Sección Superior: Estadísticas + Mapa ===================== */}
      <section className="border-t border-black/20 w-full">
        <div className="flex flex-col items-center justify-center pt-[50px]">
          <p className="font-semibold text-4xl text-center px-1 leading-tight">
             {PROJECTS_COMPLETED}
          </p>
          <div className="w-30 h-[3px] bg-[#0d4754] mt-4 mb-2 rounded-full" aria-hidden="true" />
          <p className="text-center text-gray-800 text-base mt-2 px-4 max-w-2xl">
            {MAP_DESCRIPTION}
          </p>
        </div>

        {/* Botón Mapa */}
        <div className="flex justify-center mt-5">
          <button
            onClick={toggleMap}
            className="bg-orange-500 border border-white/10 text-white px-4 py-2 font-semibold rounded-full shadow-md hover:bg-orange-600 transition-transform duration-300 hover:scale-105 cursor-pointer mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-expanded={isMapOpen}
            aria-controls="project-map"
          >
            {mapButtonText}
          </button>
        </div>

        {/* Contenedor del Mapa */}
        {isMapOpen && (
          <div
            id="project-map"
            className="relative w-full mt-5 bg-gray-200 shadow-lg overflow-hidden transition-opacity duration-500"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              title={MAP_TITLE}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3455.9472343204!2d-95.6881!3d29.9774!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDU4JzM4LjYiTiA5NcKwNDEnMTcuMiJX!5e0!3m2!1ses!2sus!4v1700000000000"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute left-0 top-0 block w-full"
              style={{ top: -MAP_BAR, height: `calc(100% + ${MAP_BAR}px)` }}
            />
          </div>
        )}
      </section>

      {/* ===================== Footer Principal ===================== */}
      <footer id="contact" className="bg-[#0D4C5F] flex items-center justify-center w-full">
        <section className="w-full max-w-[1400px] flex flex-col py-10 md:px-10 md:items-center md:justify-center">
          
          {/* CTA Contacto */}
          <p className="text-white text-5xl font-semibold mb-4 text-center mx-8 leading-tight">
            {CTA_QUESTION_LARGE} <br />
            {CTA_PROJECT_WORD}
          </p>

          <div className="flex flex-col-reverse gap-4 mb-5 items-start md:w-full md:flex-row md:justify-between px-5 max-w-[1100px]">
            {/* Card de Contratista */}
            <div className="w-full md:max-w-md">
              <div className="min-h-[300px] md:min-h-[260px]">
                <ContractorCardEs />
              </div>
            </div>

            {/* Card de Financiamiento */}
            <div
              className="flex flex-col items-center justify-center gap-3 bg-gradient-to-t md:bg-gradient-to-r from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full mt-6 md:mt-10 md:max-w-md"
              style={{ minHeight: 260 }}
            >
              <p className="text-2xl font-bold md:text-3xl">
                 {FINANCING_TITLE}
              </p>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                 {FINANCING_SUBTITLE}
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                 {FINANCING_INTEREST}
              </p>
              <Link
                to="/patio-financing-houston/es"
                className="bg-orange-500 border border-white/10 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition-all"
                onClick={scrollToTop}
                aria-label={FINANCING_LINK_ARIA}
              >
                {FINANCING_LINK_TEXT}
              </Link>
            </div>
          </div>

          {/* Logo */}
          <div className="w-full px-5">
            <img
              src={LOGO_PATH}
              alt={LOGO_ALT}
              className="h-20 p-2 pl-0 select-none"
              width={160}
              height={80}
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            className="text-white flex flex-col w-full max-w-[1920px] gap-8 md:flex-row md:justify-between px-5 mt-3"
            style={{ minHeight: 220 }}
          >
            {/* Información de la Empresa */}
            <div className="flex flex-col text-white md:max-w-[50%]">
              <p className="font-semibold text-2xl mb-3">
                 {COMPANY_TITLE}
              </p>
              <p className="text-white/80 leading-relaxed">
                 {COMPANY_DESCRIPTION}
              </p>
            </div>

            {/* Contacto */}
            <div>
              <p className="font-semibold text-2xl mb-3">
                 {CONTACT_TITLE}
              </p>
              <a
                href="tel:+13465819082"
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex items-center gap-2 text-white/80 hover:text-orange-400 transition-all mb-2"
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

            {/* Ubicación */}
            <div>
              <p className="font-semibold text-2xl mb-3">
                 {LOCATION_TITLE}
              </p>
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-orange-400 transition-all block mb-1"
              >
                {LOCATION_ADDRESS}
              </a>
              <p className="text-white/50 text-md">
                 {LOCATION_AREA}
              </p>
            </div>

            {/* Horarios */}
            <div>
              <p className="font-semibold text-2xl mb-3">
                 {SCHEDULE_TITLE}
              </p>
              <p className="text-white/80">{SCHEDULE_WEEKDAY}</p>
              <p className="text-white/80">{SCHEDULE_SATURDAY}</p>
              <p className="text-white/80">{SCHEDULE_SUNDAY}</p>
            </div>
          </div>

          {/* Redes Sociales */}
          <div className="flex gap-4 w-full justify-center mt-8">
            <a href="https://www.instagram.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-7 h-7 text-white hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://www.tiktok.com/@newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok className="w-7 h-7 text-white hover:text-gray-300 transition-colors" />
            </a>
            <a href="https://www.pinterest.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest className="w-7 h-7 text-white hover:text-red-500 transition-colors" />
            </a>
            <a href="https://www.facebook.com/newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="w-7 h-7 text-white hover:text-blue-500 transition-colors" />
            </a>
          </div>

          {/* Navegación */}
          <p className="text-white/90 text-xl font-semibold mt-8 text-center">
            {NAVIGATION_TITLE}
          </p>
          <nav className="flex flex-wrap justify-center text-white text-sm mt-4 gap-y-2 gap-x-1" aria-label="Navegación del pie de página">
            {navItems.map((id, index) => {
              const base = routeMap[id] ?? `/${id}/es`;
              const path = base.endsWith('/es') ? base : `${base}/es`;
              
              return (
                <span key={id} className="inline-flex items-center">
                  <Link to={path} className="hover:text-orange-400 transition-colors px-2 py-1" onClick={scrollToTop}>
                    {navItemLabels[id] ?? id.toUpperCase()}
                  </Link>
                  {index !== navItems.length - 1 && (
                    <span aria-hidden="true" className="text-white/30 mx-1">•</span>
                  )}
                </span>
              );
            })}
          </nav>

          {/* Copyright */}
          <div className="w-full bg-white/20 h-[1px] my-8" aria-hidden="true" />
          <p className="text-white/60 text-center text-sm px-4">
             {COPYRIGHT}
          </p>
        </section>
      </footer>
    </>
  );
};

export default FooterEs;