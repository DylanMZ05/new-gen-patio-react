import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa"; // Ícono de flecha
import useScroll from "./useScroll";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";

const Header: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);
  const sectionIds = ["services", "our-promise", "who-we-are", "blogs", "contact"];
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  let dropdownTimeout: ReturnType<typeof setTimeout>;

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
      <div className="flex justify-between items-center px-4 xl:px-15">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="//" aria-label="Home" onClick={scrollToTop}>
            <img
              src={`/new-gen-patio-react/assets/images/IdentidadSVG/${isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"}`}
              alt="New Gen Patio Logo"
              className="h-20 img-shadow p-2 pl-0"
              loading="lazy"
            />
          </Link>
          <div className={`hidden sm:block text-lg tracking-wider ml-3 transition-colors duration-300 ${
            isScrolled ? "text-black" : "text-white"
          }`}>
            <h1 className="font-bold">NEW GEN PATIO</h1>
            <p className="font-medium opacity-90">Modern Outdoor Living</p>
          </div>
        </div>

        {/* Menú principal */}
        <nav aria-label="Main Menu" role="navigation" className="hidden lg:flex">
          <ul className="flex justify-between items-center space-x-10">
            {sectionIds.map((id) => (
              id === "our-promise" ? (
                // Dropdown para "Our Promise"
                <li
                  key={id}
                  className="relative"
                  onMouseEnter={() => {
                    clearTimeout(dropdownTimeout);
                    setDropdownOpen(true);
                  }}
                  onMouseLeave={() => {
                    dropdownTimeout = setTimeout(() => setDropdownOpen(false), 300);
                  }}
                >
                  <Link
                    to={routeMap[id]}
                    onClick={scrollToTop}
                    className={`text-xl transition-all duration-150 font-neutral flex items-center gap-1 ${
                      isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                    }`}
                  >
                    Our Promise
                    <FaChevronUp className={`${dropdownOpen ? "rotate-180" : ""}`} />
                  </Link>
                  {/* Menú desplegable */}
                  {dropdownOpen && (
                    <div 
                      className="absolute left-0 mt-2 bg-white shadow-lg w-48"
                      onMouseEnter={() => clearTimeout(dropdownTimeout)}
                      onMouseLeave={() => setDropdownOpen(false)}
                    >
                      <Link
                        to="/ourprocess"
                        onClick={() => {
                          scrollToTop();
                          setDropdownOpen(false);
                        }}
                        className="block pl-2 py-2 text-black/90 font-semibold hover:bg-gray-200 transition hover:text-orange-500"
                      >
                        Our Process
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
                    className={`text-xl transition-all duration-150 font-neutral ${
                      isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                    }`}
                  >
                    {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
                  </Link>
                </li>
              )
            ))}
          </ul>
        </nav>

        {/* Botón de menú hamburguesa para móviles */}
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
          {sectionIds.map((id) => (
            id === "our-promise" ? (
              <div key={id} className="relative">
                <button
                  className="text-2xl transition-all duration-150 flex items-center gap-1"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  Our Promise
                  <FaChevronUp className={`${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute left-0 mt-2 bg-white text-black rounded-md shadow-lg">
                    <Link
                      to="/ourprocess"
                      onClick={() => {
                        scrollToTop();
                        setDropdownOpen(false);
                        setMenuOpen(false);
                      }}
                      className="block px-4 py-2 hover:bg-gray-200 transition"
                    >
                      Our Process
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
                }}
                className="text-2xl transition-all duration-150"
              >
                {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
              </Link>
            )
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
