import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../../hooks/scrollToTop";
// ❌ ELIMINADO: import { useTranslation } from "react-i18next"; // ⬅️ Importamos useTranslation

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
  if (w >= 1280) return 350; // lg / desktop grande
  if (w >= 768)  return 350; // md / tablet-desktop chico
  return 350;                // base / mobile
};

const HowWeDoItHomeEs: React.FC = () => {
  // ❌ ELIMINADO: const { t } = useTranslation('our-process');
    
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

  // === TEXTOS TRADUCIDOS ===
  const TITLE_SMALL = "CÓMO LO HACEMOS";
  const TITLE_LARGE = "De la idea a la realidad";
  const DESCRIPTION = "Desde el concepto hasta la finalización, creamos espacios exteriores premium que combinan elegancia y funcionalidad. Nuestro proceso garantiza durabilidad, estilo y eficiencia, ofreciendo una experiencia sin complicaciones de principio a fin.";
  const LINK_ARIA_LABEL = "Aprende más sobre cómo construimos patios y pérgolas de alta calidad";
  const LINK_BUTTON_TEXT = "Ver Proceso";


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
      data-lwv="HowWeDoItHomeEs"
    >
      <header>
        <h2
          id="how-we-do-it-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          {TITLE_SMALL} {/* ⬅️ Traducción */}
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
            {TITLE_LARGE} {/* ⬅️ Traducción */}
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        {DESCRIPTION} {/* ⬅️ Traducción */}
      </h3>

      <Link
        to="/how-we-doit/es" // ⬅️ Ruta ES
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
                 transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        // ⬅️ Traducción: aria-label
        aria-label={LINK_ARIA_LABEL}
        // Prefetch por intención de interacción (no bloquea el hilo principal)
        onMouseEnter={() => runIdle(prefetchOurProcessChunk)}
        onFocus={() => runIdle(prefetchOurProcessChunk)}
        onTouchStart={() => runIdle(prefetchOurProcessChunk)}
      >
        {LINK_BUTTON_TEXT} {/* ⬅️ Traducción */}
      </Link>
    </section>
  );
};

export default memo(HowWeDoItHomeEs);