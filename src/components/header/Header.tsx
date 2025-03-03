import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useScroll from "./useScroll";
import useActiveSection from "./useActiveSection";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";

const Header: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);
  const sectionIds = [
    "services",
    "our-promise",
    "who-we-are",
    "reviews",
    "blogs",
    "contact"
  ];
  const [activeSection, setActiveSectionManually] =
    useActiveSection(sectionIds);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const handleClick = (id: string) => {
    setActiveSectionManually(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <header
        className={`w-full fixed z-50 transition-colors duration-300 ${
          isScrolled
            ? "bg-white shadow-lg text-black"
            : "bg-gradient-to-b from-black to-transparent text-white"
        }`}
        role="banner"
      >
        <div className="flex justify-between items-center text-white px-4 xl:px-15">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="//" aria-label="Inicio"
              onClick={scrollToTop}>
              <img
                src="/new-gen-patio-react/assets/images/IdentidadSVG/LogoColor.svg"
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
              <h2 className="font-bold">NEW GEN PATIO</h2>
              <p className="font-medium opacity-90">Modern Outdoor Living</p>
            </div>
          </div>

          {/* Menú principal */}
          <nav aria-label="Menú principal" className="hidden lg:flex">
            <ul className="flex justify-between items-center space-x-10">
              {sectionIds.map((id) => (
                <Link
                  key={id}
                  to={`//#${id}`}
                  onClick={() => handleClick(id)}
                  className={`text-xl transition-all duration-150 font-neutral ${
                    activeSection === id
                      ? "text-orange-500 font-bold"
                      : isScrolled
                        ? "text-black hover:text-orange-500"
                        : "text-white hover:text-orange-500"
                  }`}
                >
                  {id.replace(/-/g, " ").charAt(0).toUpperCase() +
                    id.replace(/-/g, " ").slice(1)}
                </Link>
              ))}
            </ul>
          </nav>

          {/* Botón de menú para móvil */}
          <button
            className="lg:hidden focus:outline-none z-50 ml-auto cursor-pointer"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div
              className={`w-8 h-1 my-1.5 rounded transition-transform duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "rotate-45 translate-y-2.5" : ""}`}
            ></div>

            <div
              className={`w-8 h-1 my-1.5 rounded transition-opacity duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "opacity-0" : ""}`}
            ></div>

            <div
              className={`w-8 h-1 my-1.5 rounded transition-transform duration-300 ${
                isScrolled ? "bg-black" : "bg-white"
              } ${menuOpen ? "-rotate-45 -translate-y-2.5" : ""}`}
            ></div>
          </button>

          {/* Menú móvil */}
          <div
            className={`lg:hidden fixed z-20 top-0 left-0 w-full h-full background-skyblue text-white flex flex-col items-center justify-center space-y-8 transition-transform duration-500 ${
              menuOpen ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <Link
              to="//"
              aria-label="Inicio"
              className="flex flex-col items-center"
            >
              <img
                src="/new-gen-patio-react/assets/images/IdentidadSVG/LogoBlanco.svg"
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
                to={`//#${id}`}
                onClick={() => handleClick(id)}
                className={`text-2xl transition-all duration-150 ${
                  activeSection === id
                    ? "text-orange-500 font-semibold"
                    : "hover:text-orange-500"
                }`}
              >
                {id.replace(/-/g, " ").charAt(0).toUpperCase() +
                  id.replace(/-/g, " ").slice(1)}
              </Link>
            ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
