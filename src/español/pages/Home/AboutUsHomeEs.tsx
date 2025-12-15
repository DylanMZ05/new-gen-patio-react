import React, { memo, useEffect, useRef, useCallback, useState } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; // ⬅️ Nuevo: Importamos useTranslation

/* ========================= Perf helpers (Sin cambios) ========================= */
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const t = String(conn?.effectiveType || "").toLowerCase();
    if (t.includes("2g") || t.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  return true;
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1500 });
  else setTimeout(cb, 300);
};
/* ================================================================ */

/**
 * Prefetch robusto de AboutUsPage: (Sin cambios)
 */
let aboutUsPrefetched = false;
const aboutUsModules = import.meta.glob([
  "../../pages/**/AboutUsPage*.tsx",
  "../../pages/**/AboutUsPage*.jsx",
]);

const prefetchAboutUsChunk = () => {
  if (aboutUsPrefetched || !canPrefetch()) return;
  const paths = Object.keys(aboutUsModules);
  if (!paths.length) return;
  aboutUsPrefetched = true;
  (aboutUsModules[paths[0]] as () => Promise<unknown>)().catch(() => {
    aboutUsPrefetched = false; // permitir reintento si falla
  });
};

/* ===== helper: reserva responsiva que iguala containIntrinsicSize (Sin cambios) ===== */
function useReservedHeight() {
  const compute = () => {
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    if (w >= 1024) return 350; // lg
    if (w >= 768) return 350;  // md
    return 350;                // base
  };
  const [h, setH] = useState<number>(compute());
  useEffect(() => {
    const onResize = () => setH(compute());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return h;
}

const AboutUsHomeEs: React.FC = () => {
  // ❌ ELIMINADO: const { t } = useTranslation('about-us');
    
  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);
  const reserved = useReservedHeight();

  // Prefetch cuando el bloque está cerca del viewport (sin tocar el primer paint)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isNear = entries.some((e) => e.isIntersecting);
        if (isNear) {
          runIdle(prefetchAboutUsChunk);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Prefetch por intención (hover/focus/touch) sin bloquear el hilo principal
  const onIntent = useCallback(() => runIdle(prefetchAboutUsChunk), []);
  
  // === TEXTOS TRADUCIDOS ===
  const TITLE_SMALL = "SOBRE NOSOTROS";
  const TITLE_LARGE = "Apasionados por los Espacios Exteriores";
  const DESCRIPTION = "Somos más que constructores: somos un equipo dedicado a diseñar espacios exteriores que inspiran conexión, comodidad y recuerdos duraderos.";
  const LINK_ARIA_LABEL = "Conoce más sobre nuestro equipo y misión";
  const LINK_BUTTON_TEXT = "Saber Más Sobre Nosotros";

  return (
    <section
      ref={sectionRef}
      id="about-us"
      role="region"
      aria-labelledby="about-us-heading"
      className="
        relative flex flex-col items-center justify-center
        py-12 px-6 text-center bg-gray-100
        [content-visibility:auto]
      "
      /* 🔑 Reserva estable + containIntrinsicSize igualado para evitar CLS */
      style={{
        contain: "content" as any,
        minHeight: reserved,
        containIntrinsicSize: `${reserved}px` as any,
      }}
      data-lwv="AboutUsHomeEs"
    >
      <header>
        <h2
          id="about-us-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          {TITLE_SMALL} {/* ⬅️ Traducción Título Pequeño */}
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
          {TITLE_LARGE} {/* ⬅️ Traducción Título Grande */}
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        {DESCRIPTION} {/* ⬅️ Traducción Descripción */}
      </h3>

      <Link
        to="/about-us/es" // ⬅️ RUTA ES
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
                   transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none
                   motion-reduce:transform-none motion-reduce:transition-none"
        onClick={scrollToTop}
        aria-label={LINK_ARIA_LABEL}
        onPointerEnter={onIntent}
        onFocus={onIntent}
        onTouchStart={onIntent}
        data-gtm="about_us_cta"
      >
        {LINK_BUTTON_TEXT} {/* ⬅️ Traducción Texto botón */}
      </Link>
    </section>
  );
};

export default memo(AboutUsHomeEs);