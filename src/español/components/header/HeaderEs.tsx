import React, {
  useState,
  useEffect,
} from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import useScroll from "./useScroll";
import "../../../App.css"; // ⬅️ + "../" extra
import useScrollToTop from "../../../hooks/scrollToTop"; // ⬅️ + "../" extra
// ❌ Eliminado: import { useTranslation } from "react-i18next"; 

// Alturas estables
const HEADER_H_DESKTOP = 80; // px
const HEADER_H_MOBILE = 80; // px

/* ==================================================================== */
/* ⭐️ COMPONENTE SWITCH IDIOMA (CON IMÁGENES) - Modificado ⭐️             */
/* ==================================================================== */

const LANGUAGES = [
  { code: "en", label: "Inglés", flag: "../../assets/images/estados-unidos.webp" }, // ⬅️ + "../" extra
  { code: "es", label: "Español", flag: "../../assets/images/espana.webp" }, // ⬅️ + "../" extra
];

// Función para determinar la ruta de destino al cambiar de idioma
const getLanguageLink = (code: string) => {
    const currentPath = window.location.pathname;

    // Si el código es 'en' (Inglés), eliminamos el sufijo /es
    if (code === 'en') {
        // Elimina '/es' si existe al final, si no, devuelve la ruta base
        return currentPath.replace(/\/es$/, '') || '/';
    }
    
    // Si el código es 'es' (Español), aseguramos que termine en /es (o sea /es)
    if (currentPath.endsWith('/es')) {
        return currentPath;
    }
    // Si es la ruta raíz ("/") en inglés, vamos a "/es"
    if (currentPath === '/') {
        return '/es';
    }
    // Si es otra ruta en inglés (ej: /about-us), vamos a /about-us/es
    return currentPath + '/es';
};

const LanguageSwitch: React.FC<{ isScrolled: boolean; isMobile: boolean }> = ({
  isScrolled,
  isMobile,
}) => {
  // ❌ Eliminado: const { i18n, ready } = useTranslation();
  
  // Hardcodeado a 'es' para esta versión en español
  const currentLanguage = 'es'; 

  // ❌ Eliminado: changeLanguage logic

  const baseClasses = `
    font-semibold text-sm rounded-full transition-opacity duration-150 p-0.5
    flex items-center justify-center border-2 cursor-pointer
  `;

  const sizeClass = isMobile ? "w-8 h-8" : "w-6 h-6";

  return (
    <div className="flex items-center space-x-2"> {/* ✅ HECHO: Añadir switch de idiomas, oculto removido */}
      {LANGUAGES.map((lang) => (
        <Link // Usamos Link en lugar de button para la navegación
          key={lang.code}
          to={getLanguageLink(lang.code)} // Utiliza la función para obtener la ruta
          aria-label={`Cambiar a ${lang.label}`} // ✅ Traducido: aria-label
          title={lang.label}
          className={`${baseClasses} 
            ${
              currentLanguage.startsWith(lang.code) 
                ? "border-orange-500 opacity-100" 
                : isScrolled
                ? "border-gray-300 opacity-70 hover:opacity-100 hover:border-orange-300" 
                : "border-white/50 opacity-70 hover:opacity-100 hover:border-white" 
            }
          `}
        >
          <img
            src={lang.flag}
            alt={`Bandera de ${lang.label}`} // ✅ Traducido: alt text
            width={isMobile ? 32 : 24}
            height={isMobile ? 32 : 24}
            className={`object-cover rounded-full ${sizeClass}`}
            loading="lazy"
            decoding="async"
          />
        </Link>
      ))}
    </div>
  );
};


/* ==================================================================== */
/* ⭐️ COMPONENTE HEADER PRINCIPAL ⭐️               */
/* ==================================================================== */

const HeaderEs: React.FC = () => {
  // ❌ Eliminado: const { t } = useTranslation("header"); 

  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);

  // ✅ Hardcodeado: Menú en ESPAÑOL
  const menuItems: { [key: string]: string } = {
    services: "Servicios", // ✅ Traducido
    catalog: "Catálogo", // ✅ Traducido
    "our-promise": "Nuestra Promesa", // ✅ Traducido
    "who-we-are": "Quiénes Somos", // ✅ Traducido
    blogs: "Blog", // ✅ Traducido
    contact: "Contacto", // ✅ Traducido
  };
  
  const sectionIds = Object.keys(menuItems);

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  let dropdownTimeout: ReturnType<typeof setTimeout>;

  // ✅ Modificado: Todas las rutas llevan a /es
  const routeMap: { [key: string]: string } = {
    services: "/outdoor-living-services/es",
    catalog: "/covered-patio-project-catalog/es",
    "our-promise": "/how-we-doit/es", // NOTE: This is linked to /how-we-doit, but the text is "Our Promise"
    "who-we-are": "/about-us/es",
    blogs: "/blog/es",
    contact: "/contact-us/es",
  };

  // Evita scroll del body con el menú móvil abierto
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : prev || "auto";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const [hideOnScroll, setHideOnScroll] = useState(false);
  useEffect(() => {
    let lastY = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      const y = window.scrollY || 0;
      const delta = y - lastY;
      lastY = y;

      const deltaThreshold = 0;
      const minYToHide = 120;

      if (menuOpen) {
        setHideOnScroll(false);
        return;
      }
      if (delta > deltaThreshold && y > minYToHide) setHideOnScroll(true);
      else if (delta < -deltaThreshold) setHideOnScroll(false);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  useEffect(() => {
    if (menuOpen) setHideOnScroll(false);
  }, [menuOpen]);

  return (
    <>
      {/* ===== HEADER FIJO (navbar) ===== */}
      <header
        id="site-header"
        className="fixed inset-x-0 z-50 transition-colors duration-300"
        role="banner"
        style={{
          top: 0,
          height: `clamp(${HEADER_H_MOBILE}px, 10vw, ${HEADER_H_DESKTOP}px)`,
          transform: hideOnScroll ? "translateY(-140%)" : "translateY(0)",
          transition:
            "transform 480ms ease, background-color 300ms ease, color 300ms ease, box-shadow 300ms ease",
          willChange: "transform",
          background: isScrolled
            ? "#ffffff"
            : "linear-gradient(to bottom, rgba(0,0,0,.85) 0%, rgba(0,0,0,0) 100%)",
          color: isScrolled ? "#000" : "#fff",
          boxShadow: isScrolled ? "0 10px 20px rgba(0,0,0,.12)" : "none",
        }}
      >
        <div className="h-full flex items-center justify-between px-4 xl:px-15">
          {/* ===== Logo + texto (IZQUIERDA) ===== */}
          <div className="flex items-center">
            <Link
              to="/es" // ✅ Modificado: Home link a /es
              aria-label="Inicio" // ✅ Traducido: aria-label
              onClick={scrollToTop}
              className="flex items-center"
            >
              <img
                src={`../../assets/images/IdentidadSVG/${ // ⬅️ + "../" extra
                  isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"
                }`}
                alt="Logotipo de New Gen Patio" // ✅ Traducido: alt text
                width={65}
                height={80}
                className="h-14 md:h-16 w-auto p-2 pl-0 select-none"
                loading="eager"
                decoding="async"
                draggable={false}
              />
            </Link>
            <div
              className={`hidden sm:block text-sm md:text-base tracking-wider ml-2 md:ml-3 transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
              style={{ lineHeight: 1.05 }}
            >
              <p className="font-bold">NEW GEN PATIO</p>
              <p className="font-medium opacity-90">Vida Exterior Moderna</p> {/* ✅ Traducido */}
            </div>
          </div>

          {/* ===== Menú principal (DESKTOP) + Switch Idioma (DERECHA) ===== */}
          <div className="flex items-center h-full gap-8">
            <nav
              aria-label="Menú Principal" // ✅ Traducido: aria-label
              role="navigation"
              className="hidden lg:flex h-full"
            >
              <ul className="flex items-center gap-8">
                {sectionIds.map((id) =>
                  id === "our-promise" ? (
                    <li
                      key={id}
                      className="relative"
                      onMouseEnter={() => {
                        clearTimeout(dropdownTimeout);
                        setDropdownOpen(true);
                      }}
                      onMouseLeave={() => {
                        dropdownTimeout = setTimeout(
                          () => setDropdownOpen(false),
                          220
                        );
                      }}
                    >
                      <button
                        className={`text-lg md:text-xl transition-colors duration-150 font-normal flex items-center gap-1 cursor-pointer ${
                          isScrolled
                            ? "text-black hover:text-orange-500"
                            : "text-white hover:text-orange-400"
                        }`}
                        style={{ lineHeight: 1 }}
                      >
                        {menuItems[id]} {/* ✅ Traducido: Nuestra Promesa */}
                        <FaChevronUp
                          className={`transition-transform ${
                            dropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {dropdownOpen && (
                        <div
                          className="absolute left-0 mt-2 bg-white shadow-lg w-52 rounded-md overflow-hidden"
                          onMouseEnter={() => clearTimeout(dropdownTimeout)}
                          onMouseLeave={() => setDropdownOpen(false)}
                        >
                          <Link
                            to="/our-promise/es" // ✅ Modificado: link a /es
                            onClick={scrollToTop}
                            className="block pl-3 py-2 text-black/90 font-semibold hover:bg-gray-100 transition hover:text-orange-500"
                          >
                            {"Nuestra Promesa"} {/* ✅ Traducido: Nuestra Promesa (Submenú) */}
                          </Link>
                          <Link
                            to="/how-we-doit/es" // ✅ Modificado: link a /es
                            onClick={scrollToTop}
                            className="block pl-3 py-2 text-black/90 font-semibold hover:bg-gray-100 transition hover:text-orange-500"
                          >
                            {"Cómo lo hacemos"} {/* ✅ Traducido: How we do it (Submenú) */}
                          </Link>
                        </div>
                      )}
                    </li>
                  ) : (
                    <li key={id}>
                      <Link
                        to={routeMap[id]} // ✅ Modificado: link a /es (usa routeMap)
                        onClick={() => {
                          handleClick(id);
                          scrollToTop();
                        }}
                        className={`text-lg md:text-xl transition-colors duration-150 font-normal ${
                          isScrolled
                            ? "text-black hover:text-orange-500"
                            : "text-white hover:text-orange-400"
                        }`}
                        style={{ lineHeight: 1 }}
                      >
                        {menuItems[id]} {/* ✅ Traducido: Otros elementos del menú */}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* ⬅️ SWITCH DE IDIOMA (DESKTOP) */}
            <div className="hidden lg:block">
              <LanguageSwitch isScrolled={isScrolled} isMobile={false} />
            </div>
          </div>


          {/* ===== Botón hamburguesa (móvil) ===== */}
          <button
            className="lg:hidden focus:outline-none absolute top-4 right-5 z-[110] cursor-pointer pointer-events-auto"
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} // ✅ Traducido: aria-label
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span
              className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            />
            <span
              className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            />
          </button>
        </div>

        {/* ===== Menú móvil (full screen overlay) ===== */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] h-screen bg-[#0d4754] text-white 
          flex flex-col items-center justify-start pt-24 px-6
          space-y-4 transform transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
          aria-hidden={!menuOpen}
        >
          {/* Logo en Mobile */}
          <Link
            to="/es" // ✅ Modificado: Home link a /es
            aria-label="Inicio" // ✅ Traducido: aria-label
            onClick={() => {
              scrollToTop();
              setMenuOpen(false);
              setMobileDropdownOpen(false);
            }}
            className="mb-4"
          >
            <img
              src="../../assets/images/IdentidadSVG/LogoBlanco.svg" // ⬅️ + "../" extra
              alt="Logotipo de New Gen Patio" // ✅ Traducido: alt text
              width={200}
              height={80}
              className="h-20 w-auto p-2 select-none"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </Link>
          
          {/* ⬅️ SWITCH DE IDIOMA (MOBILE) */}
          <LanguageSwitch isScrolled={isScrolled} isMobile={true} />


          {/* ===== Items del menú móvil ===== */}
          {sectionIds.map((id) =>
            id === "our-promise" ? (
              <div key={id} className="w-full text-center">
                <button
                  className="text-2xl transition-colors duration-150 flex items-center justify-center w-full gap-2 hover:text-orange-500"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  style={{ lineHeight: 1 }}
                >
                  {menuItems[id]} {/* ✅ Traducido: Nuestra Promesa */}
                  <FaChevronUp
                    className={`${mobileDropdownOpen ? " rotate-180" : ""}`}
                  />
                </button>

                {mobileDropdownOpen && (
                  <div className="flex flex-col w-full text-center mt-2">
                    <Link
                      to="/our-promise/es" // ✅ Modificado: link a /es
                      onClick={() => {
                        scrollToTop();
                        setMenuOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                      className="block py-2 text-lg hover:text-orange-500"
                    >
                      {"Nuestra Promesa"} {/* ✅ Traducido: Nuestra Promesa (Submenú) */}
                    </Link>
                    <Link
                      to="/how-we-doit/es" // ✅ Modificado: link a /es
                      onClick={() => {
                        scrollToTop();
                        setMenuOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                      className="block py-2 text-lg hover:text-orange-500"
                    >
                      {"Cómo lo hacemos"} {/* ✅ Traducido: How we do it (Submenú) */}
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={id}
                to={routeMap[id]} // ✅ Modificado: link a /es (usa routeMap)
                onClick={() => {
                  handleClick(id);
                  scrollToTop();
                  setMenuOpen(false);
                  setMobileDropdownOpen(false);
                }}
                className="text-2xl transition-colors duration-150 hover:text-orange-500"
                style={{ lineHeight: 1 }}
              >
                {menuItems[id]} {/* ✅ Traducido: Otros elementos del menú */}
              </Link>
            )
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderEs;