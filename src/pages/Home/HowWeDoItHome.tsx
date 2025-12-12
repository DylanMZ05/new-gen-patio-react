import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";
import { useTranslation } from "react-i18next"; // ⬅️ Importamos useTranslation

/* ========================= Helpers de rendimiento (Sin cambios) ========================= */
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
/* ======================================================================== */

/**
 * Prefetch robusto del chunk de "OurProcess"
 */
let ourProcessPrefetched = false;
const moduleCandidates = import.meta.glob([
  "../../pages/**/OurProcess*.tsx",
  "../../pages/**/OurProcess*.jsx",
]);

const prefetchOurProcessChunk = () => {
  if (ourProcessPrefetched || !canPrefetch()) return;
  const paths = Object.keys(moduleCandidates);
  if (paths.length === 0) return; // nada que prefetch-ar (no rompe)
  ourProcessPrefetched = true;
  const importer = moduleCandidates[paths[0]] as () => Promise<unknown>;
  importer().catch(() => {
    ourProcessPrefetched = false; // permitir reintento si falla
  });
};

/* ===== helper: reserva responsiva para evitar CLS ===== */
const computeReserved = () => {
  // Títulos + párrafo + botón + paddings: ~520–680px según viewport
  const w = typeof window !== "undefined" ? window.innerWidth : 1024;
  if (w >= 1280) return 680; // lg / desktop grande
  if (w >= 768)  return 600; // md / tablet-desktop chico
  return 520;                // base / mobile
};

const HowWeDoItHome: React.FC = () => {
  // ⬅️ CRÍTICO: Usamos el namespace 'our-process'
  const { t } = useTranslation('our-process');
    
  const handleScrollToTop = useScrollToTop();
  // 🚨 CORRECCIÓN: Inicializar useRef con null, no con su propia referencia.
  const sectionRef = useRef<HTMLElement | null>(null); 

  // Prefetch cuando la sección se aproxima al viewport (idle)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.some((e) => e.isIntersecting);
        if (vis) {
          runIdle(prefetchOurProcessChunk);
          io.disconnect(); // sólo una vez
        }
      },
      { rootMargin: "800px 0px", threshold: 0 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Anti-CLS: reserva responsiva y sincroniza containIntrinsicSize
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const set = () => {
      const h = computeReserved();
      (el.style as any).minHeight = `${h}px`;
      (el.style as any).containIntrinsicSize = `${h}px`;
    };
    set();
    window.addEventListener("resize", set);
    return () => window.removeEventListener("resize", set);
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-do-it"
      role="region"
      aria-labelledby="how-we-do-it-heading"
      className="
        relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100
        [content-visibility:auto]
      "
      // aislamos el layout interno para reducir trabajo de pintura/flujo
      style={{ contain: "content" as any }}
      data-lwv="HowWeDoItHome"
    >
      <header>
        <h2
          id="how-we-do-it-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          {t('title-small', { defaultValue: "How We Do It" })} {/* ⬅️ Traducción */}
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
            {t('title-large', { defaultValue: "From idea to reality" })} {/* ⬅️ Traducción */}
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        {t('description', { 
             defaultValue: "From concept to completion, we craft premium outdoor spaces that blend elegance and functionality. Our process ensures durability, style, and efficiency, delivering a hassle-free experience from start to finish." 
        })} {/* ⬅️ Traducción */}
      </h3>

      <Link
        to="/how-we-doit"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
                 transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        // ⬅️ Traducción: aria-label
        aria-label={t('link-aria-label', { defaultValue: "Learn more about how we build high-quality patios and pergolas" })}
        // Prefetch por intención de interacción (no bloquea el hilo principal)
        onMouseEnter={() => runIdle(prefetchOurProcessChunk)}
        onFocus={() => runIdle(prefetchOurProcessChunk)}
        onTouchStart={() => runIdle(prefetchOurProcessChunk)}
      >
        {t('link-button-text', { defaultValue: "How We Do It" })} {/* ⬅️ Traducción */}
      </Link>
    </section>
  );
};

export default memo(HowWeDoItHome);