import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; 

/* ===== perf helpers (Sin cambios) ===== */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const type = String(conn?.effectiveType || "").toLowerCase();
    if (type.includes("2g") || type.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  return true;
};
const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1200 });
  else setTimeout(cb, 250);
};

/* ===== prefetch /our-promise robusto (Sin cambios) ===== */
let ourPromisePrefetched = false;
const ourPromiseModules = import.meta.glob([
  "../../pages/**/OurPromise*.tsx",
  "../../pages/**/OurPromise*.jsx",
]);
const prefetchOurPromiseChunk = () => {
  if (ourPromisePrefetched || !canPrefetch()) return;
  const paths = Object.keys(ourPromiseModules);
  if (!paths.length) return;
  ourPromisePrefetched = true;
  (ourPromiseModules[paths[0]] as () => Promise<unknown>)().catch(() => {
    ourPromisePrefetched = false;
  });
};

const OurPromiseHomeEs: React.FC = () => {
  // ❌ ELIMINADO: const { t } = useTranslation('our-promise'); 
    
  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);

  // bg state
  const [shouldLoadBg, setShouldLoadBg] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  // OJO: el nombre del archivo tiene '&'
  const rawBg = "assets/images/Products/Patios&Pergolas/Attached/02.webp";
  const bgSrc = `${baseUrl}${encodeURI(rawBg)}`;

  // activar carga bg + prefetch cuando se aproxima al viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((e) => e.isIntersecting);
        if (near) {
          setShouldLoadBg(true);
          runIdle(prefetchOurPromiseChunk);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onIntent = useCallback(() => runIdle(prefetchOurPromiseChunk), []);

  // === TEXTOS TRADUCIDOS ===
  const BG_ALT = "Fondo elegante de patio cubierto con rayos de sol";
  const TITLE = "Compromiso de Calidad y Sostenibilidad";
  const DESCRIPTION = "Diseñamos estructuras de aluminio libres de mantenimiento respaldadas por una garantía de 5 años. Nuestros materiales 100% reciclables garantizan durabilidad mientras reducen el impacto ambiental. Desde diseños 3D personalizados hasta la gestión de permisos, hacemos realidad tu visión exterior.";
  const LINK_ARIA_LABEL = "Aprende más sobre nuestro compromiso de calidad y sostenibilidad";
  const LINK_BUTTON_TEXT = "Nuestra Promesa";


  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      role="region"
      aria-labelledby="about-heading"
      className="
        relative flex flex-col items-center justify-center
        py-12 px-6 text-white text-center overflow-hidden
        [content-visibility:auto] [contain-intrinsic-size:540px]
      "
      style={{ contain: "content" as any, minHeight: "320px" }}
    >
      <img
        src={shouldLoadBg ? bgSrc : undefined}
        alt={BG_ALT}
        aria-hidden="true"
        className={`absolute inset-0 z-0 w-full h-full object-cover transition-opacity duration-700
          ${bgLoaded ? "opacity-100" : "opacity-0"} motion-reduce:transition-none`}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        draggable={false}
        style={{ pointerEvents: "none", willChange: "opacity" }}
        onLoad={() => setBgLoaded(true)}
        onError={() => {
          // Si por algún motivo falla, hacemos visible el layer para no dejarlo vacío.
          setBgLoaded(true);
        }}
      />

      {/* Overlay para contraste */}
      <div
        className="absolute inset-0 bg-black/80 z-10"
        aria-hidden="true"
        style={{ pointerEvents: "none" }}
      />

      {/* Contenido */}
      <div className="relative z-20 max-w-2xl px-6 text-center">
        <h2 id="about-heading" className="font-semibold text-3xl md:text-4xl">
          {TITLE} {/* ⬅️ Traducción Título */}
        </h2>

        <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full" aria-hidden="true" />

        <h3 className="text-lg leading-relaxed opacity-90">
          {DESCRIPTION} {/* ⬅️ Traducción Descripción */}
        </h3>

        <Link
          to="/our-promise/es" // ⬅️ Ruta ES
          className="
            text-black bg-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
            transition-transform transition-colors duration-200 hover:bg-white/90 hover:scale-105
            focus:ring-2 focus:ring-white focus:outline-none
            motion-reduce:transform-none motion-reduce:transition-none
          "
          onClick={scrollToTop}
          onPointerEnter={onIntent}
          onFocus={onIntent}
          onTouchStart={onIntent}
          aria-label={LINK_ARIA_LABEL}
          data-gtm="our_promise_cta"
        >
          {LINK_BUTTON_TEXT}
        </Link>
      </div>
    </section>
  );
};

export default memo(OurPromiseHomeEs);