import React, { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa"; // Ícono de flecha
import useScroll from "./useScroll";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";
// import BannerOferta from "../BannerOferta";

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

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
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

      const deltaThreshold = 8;
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

  useLayoutEffect(() => {
    const root = document.documentElement;
    const headerEl = document.getElementById("site-header");
    // const bannerEl = document.getElementById("promo-banner");

    const compute = () => {
      // const bannerH = bannerEl?.offsetHeight ?? 0;
      const bannerH = 0;
      const headerH = headerEl?.offsetHeight ?? 0;
      const headerVisibleH = hideOnScroll ? 0 : headerH;
      const offset = bannerH + headerVisibleH;

      root.style.setProperty("--promo-offset", `${bannerH}px`);
      root.style.setProperty("--header-offset", `${headerVisibleH}px`);
      root.style.setProperty("--chrome-offset", `${offset}px`);

      window.dispatchEvent(new CustomEvent("ui:chrome-offset", { detail: { offset } }));
    };

    compute();

    const ro = new ResizeObserver(compute);
    const headerElObs = document.getElementById("site-header");
    // const bannerElObs = document.getElementById("promo-banner");
    headerElObs && ro.observe(headerElObs);
    // bannerElObs && ro.observe(bannerElObs);
    window.addEventListener("resize", compute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, [hideOnScroll]);

  return (
    <>
      {/* <div id="promo-banner">
        <BannerOferta
          activo={true}
          mensaje="Labor Day Special: Get 2 Free Manual Shades or 2 Sconce Lights – Sign your Project Before Sept 1st!"
          modalTitulo="We didn’t want you to miss this!"
          modalTexto={`Until Labor Day, sign your patio project with us and get a FREE 2 manual shade until 8 fits or 2 adjustable sconce lights 3 fits x 6 inches, as our gift 🎁.

Perfect for adding shade and style to your new backyard!

📅 Offer ends on September 1st

Let’s book your spot today!`}
          whatsappMensaje="Hello, I would like to know more about the offer for Labor Day"
        />
      </div> */}

      <header
        id="site-header"
        className={`w-full fixed top-11 z-50 transition-colors duration-300 ${
          isScrolled ? "bg-white shadow-lg text-black" : "bg-gradient-to-b from-black to-transparent text-white"
        }`}
        role="banner"
        style={{
          transform: hideOnScroll ? "translateY(-140%)" : "translateY(0)",
          transition:
            "transform 480ms ease, background-color 300ms ease, color 300ms ease, box-shadow 300ms ease",
          willChange: "transform",
        }}
      >
        <div className="flex justify-between items-center px-4 xl:px-15">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" aria-label="Home" onClick={scrollToTop}>
              <img
                src={`/assets/images/IdentidadSVG/${isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"}`}
                alt="New Gen Patio Logo"
                className="h-20 img-shadow p-2 pl-0"
                loading="eager"
                width="65"
                height="80"
              />
            </Link>
            <div
              className={`hidden sm:block text-lg tracking-wider ml-3 transition-colors duration-300 ${
                isScrolled ? "text-black" : "text-white"
              }`}
            >
              <p className="font-bold">NEW GEN PATIO</p>
              <p className="font-medium opacity-90">Modern Outdoor Living</p>
            </div>
          </div>

          {/* Menú principal (desktop) */}
          <nav aria-label="Main Menu" role="navigation" className="hidden lg:flex">
            <ul className="flex justify-between items-center space-x-10">
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
                      dropdownTimeout = setTimeout(() => setDropdownOpen(false), 300);
                    }}
                  >
                    <button
                      className={`text-xl transition-all duration-150 font-neutral flex items-center gap-1 cursor-pointer ${
                        isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                      }`}
                    >
                      Our Promise
                      <FaChevronUp className={`${dropdownOpen ? "rotate-180" : ""}`} />
                    </button>
                    {dropdownOpen && (
                      <div
                        className="absolute left-0 mt-2 bg-white shadow-lg w-48"
                        onMouseEnter={() => clearTimeout(dropdownTimeout)}
                        onMouseLeave={() => setDropdownOpen(false)}
                      >
                        <Link
                          to="/our-promise"
                          onClick={scrollToTop}
                          className="block pl-2 py-2 text-black/90 font-semibold hover:bg-gray-200 transition hover:text-orange-500"
                        >
                          Our Promise
                        </Link>
                        <Link
                          to="/how-we-doit"
                          onClick={scrollToTop}
                          className="block pl-2 py-2 text-black/90 font-semibold hover:bg-gray-200 transition hover:text-orange-500"
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
                      className={`text-xl transition-all duration-150 font-neutral ${
                        isScrolled ? "text-black hover:text-orange-500" : "text-white hover:text-orange-400"
                      }`}
                    >
                      {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* Botón de menú hamburguesa para móviles */}
          <button
            className="lg:hidden focus:outline-none absolute top-5 right-5 z-[110] cursor-pointer pointer-events-auto"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
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
            className={`lg:hidden fixed inset-0 z-[100] h-screen bg-[#0d4754] text-white 
            flex flex-col items-center justify-start pt-24 px-6
            space-y-4 transform transition-all duration-500 ease-in-out
            ${menuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}
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
                width="200"
                height="80"
                className="h-20 img-shadow p-2"
                loading="eager"
              />
            </Link>

            {sectionIds.map((id) =>
              id === "our-promise" ? (
                <div key={id} className="w-full text-center">
                  <button
                    className="text-2xl transition-all duration-150 flex items-center justify-center w-full gap-2 hover:text-orange-500"
                    onClick={() => setMobileDropdownOpen(!mobileDropdownOpen)}
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
                  className="text-2xl transition-all duration-150 hover:text-orange-500"
                >
                  {id.replace(/-/g, " ").charAt(0).toUpperCase() + id.replace(/-/g, " ").slice(1)}
                </Link>
              )
            )}
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
