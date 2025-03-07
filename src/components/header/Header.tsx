import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScroll from "./useScroll";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";

const Header: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);
  // Solo incluimos los ids que necesitamos para el mapeo:
  const sectionIds = ["services", "our-promise", "who-we-are", "blogs", "contact"];
  const [menuOpen, setMenuOpen] = useState(false);

  // Mapeo de ids a rutas:
  const routeMap: { [key: string]: string } = {
    "services": "/services",
    "our-promise": "/howwedoit",
    "who-we-are": "/aboutus",
    "blogs": "/blogs",
    "contact": "/formpage",
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleClick = (id: string) => {
    // Este scrollIntoView se activa si la sección existe en la página actual.
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <header
      className={`w-full fixed z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white shadow-lg text-black" : "bg-gradient-to-b from-black to-transparent text-white"
      }`}
      role="banner"
    >
      <div className="flex justify-between items-center text-white px-4 xl:px-15">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="//" aria-label="Home" onClick={() => scrollToTop()}>
            <img
              src={`/new-gen-patio-react/assets/images/IdentidadSVG/${isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"}`}
              alt="New Gen Patio Logo"
              className="h-20 img-shadow p-2 pl-0"
              loading="lazy"
            />
          </Link>
          <div
            className={`hidden sm:block text-lg tracking-wider ml-3 transition-colors duration-300 ${
              isScrolled ? "text-black" : "text-white"
            }`}
          >
            <h1 className="font-bold">NEW GEN PATIO</h1>
            <p className="font-medium opacity-90">Modern Outdoor Living</p>
          </div>
        </div>

        {/* Menú principal */}
        <nav aria-label="Main Menu" role="navigation" className="hidden lg:flex">
          <ul className="flex justify-between items-center space-x-10">
            {sectionIds.map((id) => (
              <li key={id}>
                <Link
                  to={routeMap[id]}
                  onClick={() => {
                    handleClick(id);
                    scrollToTop();
                  }}
                  className={`text-xl transition-all duration-150 font-neutral}`}
                >
                  {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Botón de menú para móvil */}
        <button
          className="lg:hidden focus:outline-none absolute top-5 right-5 z-60 cursor-pointer pointer-events-auto"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {/* Líneas del botón de menú */}
          <span
            className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
              isScrolled ? "bg-black" : "bg-white"
            } ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
          ></span>
          <span
            className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
              isScrolled ? "bg-black" : "bg-white"
            } ${menuOpen ? "opacity-0" : ""}`}
          ></span>
          <span
            className={`block w-8 h-1 my-1.5 rounded transition-all duration-300 ${
              isScrolled ? "bg-black" : "bg-white"
            } ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
          ></span>
        </button>

        {/* Menú móvil */}
        <div
          className={`lg:hidden fixed z-50 top-0 left-0 w-full h-full bg-[#0d4754] text-white flex flex-col items-center justify-center 
          space-y-8 transition-transform duration-500 ease-in-out ${
            menuOpen ? "translate-x-0 opacity-100 visible" : "-translate-x-full opacity-0 invisible"
          }`}
        >
          <Link to="/" aria-label="Home" className="flex flex-col items-center" onClick={() => scrollToTop()}>
            <img
              src={`/new-gen-patio-react/assets/images/IdentidadSVG/${isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"}`}
              alt="New Gen Patio Logo"
              className="h-22 img-shadow p-2"
              loading="lazy"
            />
            <h2 className="font-semibold text-2xl">NEW GEN PATIO</h2>
            <p className="text-xl opacity-80">Modern Outdoor Living</p>
          </Link>

          {sectionIds.map((id) => (
            <Link
              key={id}
              to={routeMap[id]}
              onClick={() => {
                handleClick(id);
                scrollToTop();
              }}
              className={`text-2xl transition-all duration-150`}
            >
              {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;