import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

/* ========================= Helpers de rendimiento ========================= */
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
 * - Usa import.meta.glob para no depender del nombre exacto de carpetas/archivos (incluye el caso con "&").
 * - Importa la primera coincidencia y, si falla, vuelve a permitir otro intento.
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
  // toma la primera coincidencia
  const importer = moduleCandidates[paths[0]] as () => Promise<unknown>;
  importer().catch(() => {
    ourProcessPrefetched = false; // permitir reintento si falla
  });
};

const HowWeDoItHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
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
      {
        // Calienta bien antes de entrar en pantalla sin afectar el LCP
        rootMargin: "800px 0px",
        threshold: 0,
      }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="how-we-do-it"
      role="region"
      aria-labelledby="how-we-do-it-heading"
      className="
        relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100
        [content-visibility:auto] [contain-intrinsic-size:520px]
      "
      // aislamos el layout interno para reducir trabajo de pintura/flujo
      style={{ contain: "content" as any, minHeight: "320px" }}
    >
      <header>
        <h2
          id="how-we-do-it-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          How We Do It
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">From idea to reality</p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        From concept to completion, we craft premium outdoor spaces that blend elegance and
        functionality. Our process ensures durability, style, and efficiency, delivering a
        hassle-free experience from start to finish.
      </h3>

      <Link
        to="/how-we-doit"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
                 transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        aria-label="Learn more about how we build high-quality patios and pergolas"
        // Prefetch por intención de interacción (no bloquea el hilo principal)
        onMouseEnter={() => runIdle(prefetchOurProcessChunk)}
        onFocus={() => runIdle(prefetchOurProcessChunk)}
        onTouchStart={() => runIdle(prefetchOurProcessChunk)}
      >
        How We Do It
      </Link>
    </section>
  );
};

export default memo(HowWeDoItHome);
