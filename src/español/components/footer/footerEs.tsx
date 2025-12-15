import { useCallback, useMemo, useState } from "react";
import { FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaPinterest, FaFacebookF } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";
import ContractorCardEs from "../ContractorCardEs";
// ❌ Eliminado: import { useTranslation } from "react-i18next"; 

const FooterEs: React.FC = () => {
  // ❌ Eliminado: const { t } = useTranslation(['common', 'header']);
    
  const scrollToTop = useScrollToTop();
  const [isMapOpen, setIsMapOpen] = useState(false);
  const MAP_BAR = 68;

  // Menú de navegación (Hardcodeado y ajustado para rutas ES)
  const navItems = useMemo(() => ["services", "our-promise", "who-we-are", "blogs", "contact"] as const, []);
  const routeMap: Record<(typeof navItems)[number], string> = {
    services: "/aluminium-custom-pergola-cover-patio/es", // ✅ Ruta ES
    "our-promise": "/how-we-doit/es", // ✅ Ruta ES
    "who-we-are": "/about-us/es", // ✅ Ruta ES
    blogs: "/blog/es", // ✅ Ruta ES
    contact: "/contact-us/es", // ✅ Ruta ES
  };
  
  // Textos del menú (Hardcodeado en español)
  const navItemLabels: Record<(typeof navItems)[number], string> = {
    services: "Servicios", // ✅ Traducido
    "our-promise": "Nuestra Promesa", // ✅ Traducido
    "who-we-are": "Quiénes Somos", // ✅ Traducido
    blogs: "Blog", // ✅ Traducido
    contact: "Contacto", // ✅ Traducido
  };
  
  const toggleMap = useCallback(() => setIsMapOpen(v => !v), []);

  // ✅ Hardcodeado: Textos del botón del mapa
  const mapButtonText = isMapOpen ? "📍 CERRAR MAPA" : "📍 VER MAPA"; // ✅ Traducido
  
  // === TEXTOS FIJOS EN ESPAÑOL ===
  const PROJECTS_COMPLETED = "+500 Proyectos Completados";
  const MAP_DESCRIPTION = "Haz clic en el botón de abajo para ver un mapa con las ubicaciones de proyectos finalizados.";
  const MAP_TITLE = "Ubicaciones de New Gen Patio";
  const CTA_QUESTION_LARGE = "¿Tienes un ";
  const CTA_PROJECT_WORD = "proyecto en mente?";
  const FINANCING_TITLE = "¡FINANCIAMIENTO FLEXIBLE!";
  const FINANCING_SUBTITLE = "Opciones disponibles de hasta";
  const FINANCING_INTEREST = "¡18 MESES a 0% INTERÉS!";
  const FINANCING_LINK_ARIA = "Revisar opciones de financiamiento";
  const FINANCING_LINK_TEXT = "¡APLICA AHORA!";
  const LOGO_ALT = "Logotipo de New Gen Patio";
  const COMPANY_TITLE = "NEW GEN PATIO";
  const COMPANY_DESCRIPTION = "Transformamos tus espacios exteriores con patios y pérgolas elaborados por expertos. Nos especializamos en crear áreas exteriores impresionantes y funcionales que elevan tu estilo de vida y añaden valor duradero a tu hogar. Con diseño, calidad y comunicación clara en el corazón de cada proyecto, aseguramos una experiencia fluida de principio a fin.";
  const CONTACT_TITLE = "CONTACTO";
  const LOCATION_TITLE = "UBICACIÓN";
  const LOCATION_ADDRESS = "17903 Shaw Rd, Houston, TX 77429, United States";
  const LOCATION_AREA = "(Houston y áreas circundantes)";
  const SCHEDULE_TITLE = "HORARIOS";
  const SCHEDULE_WEEKDAY = "Lunes - Viernes: 8:00 AM - 6:00 PM";
  const SCHEDULE_SATURDAY = "Sábado: 9:00 AM - 4:00 PM";
  const SCHEDULE_SUNDAY = "Domingo: Cerrado";
  const NAVIGATION_TITLE = "Navegación";
  const COPYRIGHT = "© 2024 NEW GEN PATIO. TODOS LOS DERECHOS RESERVADOS.";
  // Ruta del logo, ajustada para salir de español/components/footer
  const LOGO_PATH = "../../../assets/images/IdentidadSVG/LogoBlanco.svg";


  return (
    <>
      {/* ===================== Top section: Stats + Map ===================== */}
      <section className="border-t border-black/20 w-full">
        {/* Title + Stats */}
        <div className="flex flex-col items-center justify-center pt-[50px]">
          {/* ✅ Hardcodeado: Proyectos Completados */}
          <p className="font-semibold text-4xl text-center px-1 leading-tight">
             {PROJECTS_COMPLETED} {/* ✅ Traducido */}
          </p>
          <div className="w-30 h-[3px] bg-[#0d4754] mt-4 mb-2 rounded-full" aria-hidden="true" />
          {/* ✅ Hardcodeado: Descripción del mapa */}
          <p className="text-center text-gray-800 text-base mt-2 px-4">
            {MAP_DESCRIPTION} {/* ✅ Traducido */}
          </p>
        </div>

        {/* Button to show/hide map */}
        <div className="flex justify-center mt-5">
          <button
            onClick={toggleMap}
            className="bg-orange-500 border border-white/10 text-white px-4 py-2 font-semibold rounded-full shadow-md hover:bg-orange-600 transition-transform duration-300 hover:scale-105 cursor-pointer mb-5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-expanded={isMapOpen}
            aria-controls="project-map"
          >
            {mapButtonText} {/* ✅ Traducido */}
          </button>
        </div>

        {/* Map container (only when open) */}
        {isMapOpen && (
          <div
            id="project-map"
            className="relative w-full mt-5 bg-gray-200 rounded-lg shadow-lg overflow-hidden transition-opacity duration-500"
            style={{ aspectRatio: "16 / 9" }}
          >
            <iframe
              // ✅ Hardcodeado: Título del mapa
              title={MAP_TITLE} // ✅ Traducido
              src="https://www.google.com/maps/d/embed?mid=1vO80YEvHvKl5MYKvlnHiZ6L6cdQo4Xc&ehbc=2E312F"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute left-0 top-0 block w-full"
              style={{ top: -MAP_BAR, height: `calc(100% + ${MAP_BAR}px)` }}
            />
          </div>
        )}
      </section>

      {/* ===================== Main Footer ===================== */}
      <footer id="contact" className="bg-[#0D4C5F] flex items-center justify-center w-full">
        <section className="w-full max-w-[1400px] flex flex-col py-10 md:px-10 md:items-center md:justify-center">
          {/* Contact CTA */}
          <p className="text-white text-5xl font-semibold mb-4 text-center mx-8 leading-tight">
            {/* ✅ Hardcodeado: CTA Question Large */}
            {CTA_QUESTION_LARGE} <br /> {/* ✅ Traducido */}
            {/* ✅ Hardcodeado: CTA Project Word */}
            {CTA_PROJECT_WORD} {/* ✅ Traducido */}
          </p>

          <div className="flex flex-col-reverse gap-4 mb-5 items-start md:w-full md:flex-row md:justify-between px-5 max-w-[1100px]">
            {/* Contractor Call-To-Action Card (NOTE: Assuming ContractorCard is static or has its own hardcoded texts) */}
            <div className="w-full md:max-w-md">
              <div className="min-h-[300px] md:min-h-[260px]">
                <ContractorCardEs />
              </div>
            </div>

            {/* Financing Card */}
            <div
              className="flex flex-col items-center justify-center gap-3 bg-gradient-to-t md:bg-gradient-to-r from-red-800 to-purple-800 text-center text-white p-6 rounded-lg shadow-lg w-full mt-6 md:mt-10 md:max-w-md"
              style={{ minHeight: 260 }}
            >
              <p className="text-2xl font-bold md:text-3xl">
                 {FINANCING_TITLE} {/* ✅ Traducido */}
              </p>
              <p className="mt-2 text-xl text-white/80 md:text-2xl">
                 {FINANCING_SUBTITLE} {/* ✅ Traducido */}
              </p>
              <p className="text-2xl font-bold md:text-3xl">
                 {FINANCING_INTEREST} {/* ✅ Traducido */}
              </p>
              <Link
                to="/patio-financing-houston/es" // ✅ Ruta ES
                className="bg-orange-500 border border-white/10 text-white px-4 py-2 mt-4 rounded-full font-semibold hover:bg-orange-600 transition-all"
                onClick={scrollToTop}
                // ✅ Hardcodeado: Financing Link Aria
                aria-label={FINANCING_LINK_ARIA} // ✅ Traducido
              >
                {FINANCING_LINK_TEXT} {/* ✅ Traducido */}
              </Link>
            </div>
          </div>

          {/* Brand / Info */}
          <div className="w-full px-5">
            <img
              src={LOGO_PATH} // ✅ Ruta ajustada
              // ✅ Hardcodeado: Logo Alt
              alt={LOGO_ALT} // ✅ Traducido
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
            {/* Company Info */}
            <div className="flex flex-col text-white md:max-w-[50%]">
              <p className="font-semibold text-2xl mb-3">
                 {COMPANY_TITLE} {/* ✅ Traducido (Mismo texto en inglés) */}
              </p>
              <p className="text-white/80">
                 {COMPANY_DESCRIPTION} {/* ✅ Traducido */}
              </p>
            </div>

            {/* Contact Info */}
            <div>
              <p className="font-semibold text-2xl mb-3">
                 {CONTACT_TITLE} {/* ✅ Traducido */}
              </p>
              <a
                href="tel:+13465819082"
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
              <p className="font-semibold text-2xl mb-3">
                 {LOCATION_TITLE} {/* ✅ Traducido */}
              </p>
              <a
                href="https://www.google.com/maps/place/New+Gen+Patio+LLC+%2F+Aluminum+Pergola+Builders+in+Houston"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-orange-400 transition-all"
              >
                {LOCATION_ADDRESS} {/* ✅ Traducido (Dirección permanece en EN) */}
              </a>
              <p className="text-white/50 text-md">
                 {LOCATION_AREA} {/* ✅ Traducido */}
              </p>
            </div>

            {/* Schedules */}
            <div>
              <p className="font-semibold text-2xl mb-3">
                 {SCHEDULE_TITLE} {/* ✅ Traducido */}
              </p>
              <p className="text-white/80">
                 {SCHEDULE_WEEKDAY} {/* ✅ Traducido */}
              </p>
              <p className="text-white/80">
                 {SCHEDULE_SATURDAY} {/* ✅ Traducido */}
              </p>
              <p className="text-white/80">
                 {SCHEDULE_SUNDAY} {/* ✅ Traducido */}
              </p>
            </div>
          </div>

          {/* Socials */}
          <div className="flex gap-3 w-full justify-center mt-2">
            <a href="https://www.instagram.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="w-6 h-6 text-white hover:text-pink-500 transition-colors" />
            </a>
            <a href="https://www.tiktok.com/@newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
              <FaTiktok className="w-6 h-6 text-white hover:text-white/70 transition-colors" />
            </a>
            <a href="https://www.pinterest.com/newgenpatio/" target="_blank" rel="noopener noreferrer" aria-label="Pinterest">
              <FaPinterest className="w-6 h-6 text-white hover:text-red-500 transition-colors" />
            </a>
            <a href="https://www.facebook.com/newgenpatio" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebookF className="w-6 h-6 text-white hover:text-blue-500 transition-colors" />
            </a>
          </div>

          {/* Navigation */}
          <p className="text-white/90 text-xl font-semibold mt-2 text-center">
                 {NAVIGATION_TITLE} {/* ✅ Traducido */}
          </p>
          <nav className="flex flex-wrap justify-center text-white text-sm mt-4 gap-2" aria-label={"Navegación de Pie de Página"}>
            {navItems.map((id, index) => {
              // Aseguramos que la ruta tenga /es
              const base = routeMap[id] ?? `/${id}`;
              const path = base.endsWith('/es') ? base : `${base}/es`; // Añadir /es si falta
              
              return (
                <span key={id} className="inline-flex items-center">
                  <Link to={path} className="hover:text-orange-400 transition-colors" onClick={scrollToTop}>
                    {navItemLabels[id] ?? id.replace(/-/g, " ").toUpperCase()} {/* ✅ Traducido (o fallback) */}
                  </Link>
                  {index !== navItems.length - 1 && (
                    <span aria-hidden="true" className="text-white/70 mx-1">•</span>
                  )}
                </span>
              );
            })}
          </nav>

          {/* Copyright */}
          <div className="w-full bg-white/40 h-[1px] my-5" aria-hidden="true" />
          <p className="text-white text-center">
             {COPYRIGHT} {/* ✅ Traducido */}
          </p>
        </section>
      </footer>
    </>
  );
};

export default FooterEs;