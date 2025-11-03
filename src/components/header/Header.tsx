import React, {
  useState,
  useEffect,
  // useRef,        // 🔒 (promo) — desactivado
  // useMemo,       // 🔒 (promo) — desactivado
  // useCallback,   // 🔒 (promo) — desactivado
} from "react";
import { Link } from "react-router-dom";
import { FaChevronUp } from "react-icons/fa";
import useScroll from "./useScroll";
import "../../App.css";
import useScrollToTop from "../../hooks/scrollToTop";

// Alturas estables
const HEADER_H_DESKTOP = 80; // px
const HEADER_H_MOBILE = 80; // px

/* ============================
   🔒 BLOQUE PROMO DESACTIVADO
   ----------------------------
   - PROMO_TEXT
   - PROMO_TITLE
   - DEFAULT_WA_MSG
   - WA_PHONE
   - PROMO_STORAGE_KEY
================================

const PROMO_TEXT = `Why move the party inside? Transform your patio into a cozy, festive retreat for the entire season. Imagine warm gatherings, stylish comfort, and unforgettable nights under the stars.
Until October 31st, you can get a 72-inch fire pit completely free if you close your backyard with us. 
(Applicable only to new customers who close during this time period and while supplies last)`;

const PROMO_TITLE = "The best autumn memories are made outdoors.  🍂🔥";

const DEFAULT_WA_MSG =
  "Hi! I'm interested in the Fall Season patio offer with the free 72-inch fire pit 🔥 Can you tell me more?";

const WA_PHONE =
  (typeof import.meta !== "undefined" &&
    // @ts-ignore
    (import.meta.env?.VITE_WHATSAPP_PHONE as string)) ||
  "+1 (346) 380-0845";

const PROMO_STORAGE_KEY = "fall-offer-oct-31-2025";
*/

const Header: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const isScrolled = useScroll(50);

  const sectionIds = [
    "services",
    "catalog",
    "our-promise",
    "who-we-are",
    "blogs",
    "contact",
  ];

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

  /* ============================
     🔒 ESTADO / LÓGICA PROMO OFF
     ----------------------------
     - promoHiddenByUser
     - promoOpen
     - bannerHeight
     - read from localStorage
     - dismissPromoForever
     - waLink
     - promoBarRef & ResizeObserver
  =================================

  const [promoHiddenByUser, setPromoHiddenByUser] = useState(false);
  const [promoOpen, setPromoOpen] = useState(false);
  const [bannerHeight, setBannerHeight] = useState(0);

  useEffect(() => {
    const v = localStorage.getItem(PROMO_STORAGE_KEY);
    if (v === "dismissed") {
      setPromoHiddenByUser(true);
    }
  }, []);

  const dismissPromoForever = useCallback(() => {
    localStorage.setItem(PROMO_STORAGE_KEY, "dismissed");
    setPromoHiddenByUser(true);
    setPromoOpen(false);
  }, []);

  const waLink = useMemo(() => {
    const text = encodeURIComponent(DEFAULT_WA_MSG);
    const phoneDigits = (WA_PHONE || "").replace(/[^\d]/g, "");
    return `https://wa.me/${phoneDigits}?text=${text}`;
  }, []);

  const promoBarRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!promoBarRef.current) return;
    if (promoHiddenByUser) {
      setBannerHeight(0);
      return;
    }

    const el = promoBarRef.current;
    setBannerHeight(el.clientHeight);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      const borderSize =
        Array.isArray(entry.borderBoxSize) && entry.borderBoxSize.length > 0
          ? entry.borderBoxSize[0]
          : (entry as any).borderBoxSize;

      if (borderSize?.blockSize) {
        setBannerHeight(Math.round(borderSize.blockSize));
      } else {
        setBannerHeight(el.clientHeight);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [promoHiddenByUser]);
  */

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
      {/* =======================
          🔒 PROMO BANNER REMOVIDO DE LA UI
          (para reactivar, descomentá todo el bloque superior y el JSX de abajo)
          =======================

      {!promoHiddenByUser && (
        <>
          <div
            ref={promoBarRef}
            className={[
              "fixed top-0 left-0 w-full z-[1100] cursor-pointer select-none",
              "shadow-[0_1px_0_rgba(0,0,0,.06)]",
              "bg-[#0d4754]",
            ].join(" ")}
            style={
              {
                ["--promo-banner-height" as any]: "45px",
                height: "var(--promo-banner-height)",
              } as React.CSSProperties
            }
            role="button"
            tabIndex={0}
            aria-label="Open promotion details"
            onClick={() => setPromoOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setPromoOpen(true);
              }
            }}
          >
            <div className="relative w-full h-full overflow-hidden">
              <div
                className="absolute inset-0 pointer-events-none promo-tiling"
                aria-hidden="true"
              />
            </div>
          </div>

          {promoOpen && (
            <div
              className="fixed inset-0 z-[1150] flex items-center justify-center px-4"
              role="dialog"
              aria-modal="true"
              aria-labelledby="promo-title"
            >
              <button
                className="absolute inset-0 bg-black/50"
                aria-label="Close modal"
                onClick={() => setPromoOpen(false)}
              />

              <div
                className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-[promoPop_180ms_ease-out] will-change-transform will-change-opacity"
                style={{ animationFillMode: "both" }}
              >
                <button
                  onClick={() => setPromoOpen(false)}
                  className="absolute top-3 right-3 rounded-full px-2 py-1 text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring"
                  aria-label="Close"
                >
                  ✕
                </button>

                <h2
                  id="promo-title"
                  className="text-xl font-bold mb-3 text-[#0d4754]"
                >
                  {PROMO_TITLE}
                </h2>

                <p className="text-gray-700 whitespace-pre-wrap mb-5 text-[0.95rem] leading-relaxed">
                  {PROMO_TEXT}
                </p>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center font-semibold rounded-lg py-3 bg-green-600 text-white hover:bg-green-700 transition"
                >
                  Chat on WhatsApp
                </a>

                <button
                  onClick={dismissPromoForever}
                  className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
                >
                  Don’t show again
                </button>
              </div>

              <style>{`
                @keyframes promoPop {
                  0% { transform: translateY(8px) scale(.98); opacity: 0; }
                  100% { transform: translateY(0) scale(1); opacity: 1; }
                }
              `}</style>
            </div>
          )}

          <style>{`
            .promo-tiling {
              background-image: image-set(
                url("/assets/images/fondo-banner.webp") type("image/webp") 1x
              );
              background-repeat: repeat-x;
              background-size: auto var(--promo-banner-height);
              background-position: 0 50%;
              animation: promo-pan 30s linear infinite;
              will-change: background-position;
              opacity: 1;
            }

            @keyframes promo-pan {
              from { background-position: 0 50%; }
              to   { background-position: -2000px 50%; }
            }

            @media (prefers-reduced-motion: reduce) {
              .promo-tiling { animation: none; }
            }
          `}</style>
        </>
      )}
      */}

      {/* ===== HEADER FIJO (navbar) ===== */}
      <header
        id="site-header"
        className="fixed inset-x-0 z-50 transition-colors duration-300"
        role="banner"
        style={{
          // ✅ Como el banner está desactivado, el header siempre arranca en top: 0
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
          {/* ===== Logo + texto ===== */}
          <div className="flex items-center">
            <Link
              to="/"
              aria-label="Home"
              onClick={scrollToTop}
              className="flex items-center"
            >
              <img
                src={`/assets/images/IdentidadSVG/${
                  isScrolled ? "LogoColor.svg" : "LogoBlanco.svg"
                }`}
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
          <nav
            aria-label="Main Menu"
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
                      Our Promise
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
                        isScrolled
                          ? "text-black hover:text-orange-500"
                          : "text-white hover:text-orange-400"
                      }`}
                      style={{ lineHeight: 1 }}
                    >
                      {id
                        .replace(/-/g, " ")
                        .charAt(0)
                        .toUpperCase() +
                        id.replace(/-/g, " ").slice(1)}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>

          {/* ===== Botón hamburguesa (móvil) ===== */}
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

        {/* ===== Menú móvil (full screen overlay) ===== */}
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
                  <FaChevronUp
                    className={`${mobileDropdownOpen ? " rotate-180" : ""}`}
                  />
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
                {id
                  .replace(/-/g, " ")
                  .charAt(0)
                  .toUpperCase() +
                  id.replace(/-/g, " ").slice(1)}
              </Link>
            )
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
