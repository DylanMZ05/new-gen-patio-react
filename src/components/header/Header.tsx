import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import useScroll from "./useScroll";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";

// Alturas estables
const HEADER_H_DESKTOP = 80; // px
const HEADER_H_MOBILE = 64;  // px

const Header: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);

  const sectionIds = ["services", "catalog", "our-promise", "who-we-are", "blogs", "contact"];

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  let dropdownTimeout: ReturnType<typeof setTimeout>;

  const routeMap: { [key: string]: string } = {
    services: "/outdoor-living-services",
    catalog: "/covered-patio-project-catalog",
    "our-promise": "/how-we-doit",
    "who-we-are": "/about-us",
    blogs: "/blog",
    contact: "/contact-us",
  };

  // Evita scroll del body con el menú móvil abierto (no afecta layout -> no CLS)
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : prev || "auto";
    return () => { document.body.style.overflow = prev; };
  }, [menuOpen]);

  const handleClick = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  // Ocultar header al scrollear hacia abajo (sin cambiar su altura: usamos translateY)
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
      {/* ===== HEADER FIJO (overlay, sin spacer) ===== */}
      <header
        id="site-header"
        className="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
        role="banner"
        style={{
          height: `clamp(${HEADER_H_MOBILE}px, 10vw, ${HEADER_H_DESKTOP}px)`,
          transform: hideOnScroll ? "translateY(-140%)" : "translateY(0)",
          transition:
            "transform 480ms ease, background-color 300ms ease, color 300ms ease, box-shadow 300ms ease",
          willChange: "transform",
          // Transparente con degradado sobre el video cuando NO hay scroll;
          // Sólido con sombra cuando sí hay scroll.
          background: isScrolled
            ? "#ffffff"
            : "linear-gradient(to bottom, rgba(0,0,0,.85) 0%, rgba(0,0,0,0) 100%)",
          color: isScrolled ? "#000" : "#fff",
          boxShadow: isScrolled ? "0 10px 20px rgba(0,0,0,.12)" : "none",
        }}
      >
        <div className="h-full flex items-center justify-between px-4 xl:px-15">
          {/* ===== Logo + texto (dimensiones explícitas = cero salto) ===== */}
          <div className="flex items-center">
            <Link to="/" aria-label="Home" onClick={scrollToTop} className="flex items-center">
              <img
                src={`/assets/images/IdentidadSVG/${isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"}`}
                alt="New Gen Patio Logo"
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
              <p className="font-medium opacity-90">Modern Outdoor Living</p>
            </div>
          </div>

          {/* ===== Menú principal (desktop) ===== */}
          <nav aria-label="Main Menu" role="navigation" className="hidden lg:flex h-full">
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
                      dropdownTimeout = setTimeout(() => setDropdownOpen(false), 220);
                    }}
                  >
                    <button
                      className={`text-lg md:text-xl transition-colors duration-150 font-normal flex items-center gap-1 cursor-pointer ${
                        isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                      }`}
                      style={{ lineHeight: 1 }}
                    >
                      Our Promise
                      <FaChevronUp className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {/* Dropdown ABSOLUTE -> no empuja layout */}
                    {dropdownOpen && (
                      <div
                        className="absolute left-0 mt-2 bg-white shadow-lg w-52 rounded-md overflow-hidden"
                        onMouseEnter={() => clearTimeout(dropdownTimeout)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <Link
                          to="/our-promise"
                          onClick={scrollToTop}
                          className="block pl-3 py-2 text-black/90 font-semibold hover:bg-gray-100 transition hover:text-orange-500"
                        >
                          Our Promise
                        </Link>
                        <Link
                          to="/how-we-doit"
                          onClick={scrollToTop}
                          className="block pl-3 py-2 text-black/90 font-semibold hover:bg-gray-100 transition hover:text-orange-500"
                        >
                          How we do it
                        </Link>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={id}>
                    <Link
                      to={routeMap[id]}
                      onClick={() => {
                        handleClick(id);
                        scrollToTop();
                      }}
                      className={`text-lg md:text-xl transition-colors duration-150 font-normal ${
                        isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                      }`}
                      style={{ lineHeight: 1 }}
                    >
                      {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* ===== Botón hamburguesa (móvil, overlay) ===== */}
          <button
            className="lg:hidden focus:outline-none absolute top-4 right-5 z-[110] cursor-pointer pointer-events-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
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

        {/* ===== Menú móvil (fixed, fuera del flujo) ===== */}
        <div
          className={`lg:hidden fixed inset-0 z-[100] h-screen bg-[#0d4754] text-white 
          flex flex-col items-center justify-start pt-24 px-6
          space-y-4 transform transition-transform duration-500 ease-in-out
          ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
          aria-hidden={!menuOpen}
        >
          <Link
            to="/"
            aria-label="Home"
            onClick={() => {
              scrollToTop();
              setMenuOpen(false);
              setMobileDropdownOpen(false);
            }}
            className="mb-4"
          >
            <img
              src="/assets/images/IdentidadSVG/LogoBlanco.svg"
              alt="New Gen Patio Logo"
              width={200}
              height={80}
              className="h-20 w-auto p-2 select-none"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </Link>

          {sectionIds.map((id) =>
            id === "our-promise" ? (
              <div key={id} className="w-full text-center">
                <button
                  className="text-2xl transition-colors duration-150 flex items-center justify-center w-full gap-2 hover:text-orange-500"
                  onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
                  style={{ lineHeight: 1 }}
                >
                  Our Promise
                  <FaChevronUp className={`${mobileDropdownOpen ? " rotate-180" : ""}`} />
                </button>

                {mobileDropdownOpen && (
                  <div className="flex flex-col w-full text-center mt-2">
                    <Link
                      to="/our-promise"
                      onClick={() => {
                        scrollToTop();
                        setMenuOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                      className="block py-2 text-lg hover:text-orange-500"
                    >
                      Our Promise
                    </Link>
                    <Link
                      to="/how-we-doit"
                      onClick={() => {
                        scrollToTop();
                        setMenuOpen(false);
                        setMobileDropdownOpen(false);
                      }}
                      className="block py-2 text-lg hover:text-orange-500"
                    >
                      How we do it
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={id}
                to={routeMap[id]}
                onClick={() => {
                  handleClick(id);
                  scrollToTop();
                  setMenuOpen(false);
                  setMobileDropdownOpen(false);
                }}
                className="text-2xl transition-colors duration-150 hover:text-orange-500"
                style={{ lineHeight: 1 }}
              >
                {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
              </Link>
            )
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
