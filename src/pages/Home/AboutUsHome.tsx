// src/components/home/AboutUsHome.tsx
import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

/**
 * Prefetch del chunk de AboutUsPage con protecciones:
 * - Flag global para evitar múltiples descargas.
 * - Respeta ahorro de datos / conexiones lentas.
 * - Se dispara en idle + cuando la sección entra al viewport.
 * - Prefetch adicional por intención del usuario (pointerenter/focus/touch).
 */
let aboutUsPrefetched = false;

const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    // Evitamos en ahorro de datos o redes muy lentas
    if (conn?.saveData) return false;
    const slow = String(conn?.effectiveType || "").toLowerCase();
    if (slow.includes("2g") || slow.includes("slow-2g")) return false;
  }
  // No prefetch si la pestaña no está visible
  if (typeof document !== "undefined" && document.visibilityState === "hidden") {
    return false;
  }
  return true;
};

const prefetchAboutUsChunk = () => {
  if (aboutUsPrefetched || !canPrefetch()) return;
  aboutUsPrefetched = true;
  import("../../pages/WeDoIt&About/AboutUsPage").catch(() => {
    // Si falla, liberamos el flag para reintentar más tarde
    aboutUsPrefetched = false;
  });
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const anyWin = window as any;
  if (anyWin.requestIdleCallback) {
    anyWin.requestIdleCallback(cb, { timeout: 1500 });
  } else {
    // Fallback razonable
    setTimeout(cb, 300);
  }
};

const AboutUsHome: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Prefetch cuando el bloque está cerca del viewport (sin bloquear el primer render)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined" || aboutUsPrefetched) return;

    const io = new IntersectionObserver(
      (entries) => {
        const isNear = entries.some((e) => e.isIntersecting || e.intersectionRatio > 0);
        if (isNear) {
          runIdle(prefetchAboutUsChunk);
          io.disconnect();
        }
      },
      // Prefetch con ~300px de anticipación en scroll
      { rootMargin: "300px 0px", threshold: [0, 0.1] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-us"
      role="region"
      aria-labelledby="about-us-heading"
      className={[
        "relative flex flex-col items-center justify-center",
        "py-12 px-6 text-center bg-gray-100",
        // Micro-ganancia en CLS/paint cuando no está en viewport
        "[content-visibility:auto] [contain-intrinsic-size:520px]",
      ].join(" ")}
    >
      <header>
        <h2
          id="about-us-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          About Us
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
          Passionate About Outdoors
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" aria-hidden="true" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        We’re more than builders — we’re a team dedicated to designing outdoor
        spaces that inspire connection, comfort, and lasting memories.
      </h3>

      <Link
        to="/about-us"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
                   transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={scrollToTop}
        aria-label="Learn more about our team and mission"
        // Prefetch por intención del usuario
        onPointerEnter={prefetchAboutUsChunk}
        onFocus={prefetchAboutUsChunk}
        onTouchStart={prefetchAboutUsChunk} // iOS/Safari antiguos
        data-gtm="about_us_cta"
      >
        Learn More About Us
      </Link>
    </section>
  );
};

export default memo(AboutUsHome);
