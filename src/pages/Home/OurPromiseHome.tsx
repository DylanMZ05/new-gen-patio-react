// src/components/home/OurProcessHome.tsx
import React, { memo, useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

// ===== Helpers de prefetch (evitar en redes lentas / pestaña oculta) =====
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const type = String(conn?.effectiveType || "").toLowerCase();
    if (type.includes("2g") || type.includes("slow-2g")) return false;
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") {
    return false;
  }
  return true;
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1200 });
  else setTimeout(cb, 250);
};

// Prefetch del chunk de la página destino (/our-promise)
let ourPromisePrefetched = false;
const prefetchOurPromiseChunk = () => {
  if (ourPromisePrefetched || !canPrefetch()) return;
  ourPromisePrefetched = true;
  import("../../pages/WeDoIt&About/OurPromise").catch(() => {
    ourPromisePrefetched = false; // si falla, reintenta en el próximo hover/viewport
  });
};

const OurProcessHome: React.FC = () => {
  const scrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Control de imagen de fondo (carga diferida + cross-fade)
  const [shouldLoadBg, setShouldLoadBg] = useState(false);
  const [bgLoaded, setBgLoaded] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  // El path tiene '&' → encodeURI para evitar problemas
  const rawBg = "assets/images/Products/Patios&Pergolas/Attached/02.webp";
  const bgSrc = `${baseUrl}${encodeURI(rawBg)}`;

  // Prefetch y habilitar carga del background cuando la sección se acerca al viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        const near = entries.some((e) => e.isIntersecting || e.intersectionRatio > 0);
        if (near) {
          setShouldLoadBg(true); // habilita la carga del bg
          runIdle(prefetchOurPromiseChunk); // prefetch de la página destino en idle
          io.disconnect();
        }
      },
      { rootMargin: "250px 0px", threshold: [0, 0.05] }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pre-carga del bg para hacer el cross-fade sin flashes (sólo cuando shouldLoadBg = true)
  useEffect(() => {
    if (!shouldLoadBg) return;
    const img = new Image();
    img.src = bgSrc;
    img.onload = () => setBgLoaded(true);
  }, [bgSrc, shouldLoadBg]);

  // Handlers de intención del usuario para prefetch
  const onIntent = useCallback(() => runIdle(prefetchOurPromiseChunk), []);

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
      style={{ contain: "content" as any }} // aísla layout interno (micro anti-CLS)
    >
      {/* Background con cross-fade (sin bg-fixed para evitar jank en móvil) */}
      <img
        src={shouldLoadBg ? bgSrc : undefined}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 will-change-[opacity]
          ${bgLoaded ? "opacity-100" : "opacity-0"}
          motion-reduce:transition-none
        `}
        loading="lazy"
        decoding="async"
        fetchPriority="low"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative max-w-2xl px-6 text-center">
        <h2 id="about-heading" className="font-semibold text-3xl md:text-4xl">
          Quality &amp; Sustainability Commitment
        </h2>

        <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full" aria-hidden="true" />

        <h3 className="text-lg leading-relaxed opacity-90">
          We design maintenance-free aluminum structures backed by a 5-year warranty. Our
          100% recyclable materials ensure durability while reducing environmental impact.
          From custom 3D designs to seamless permit handling, we make your outdoor vision a reality.
        </h3>

        <Link
          to="/our-promise"
          className="
            text-black bg-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block
            transition-transform transition-colors duration-200 hover:bg-white/90 hover:scale-105
            focus:ring-2 focus:ring-white focus:outline-none
            motion-reduce:transform-none motion-reduce:transition-none
          "
          onClick={scrollToTop}
          // Prefetch por interacción
          onPointerEnter={onIntent}
          onFocus={onIntent}
          onTouchStart={onIntent}
          aria-label="Learn more about our quality and sustainability commitment"
          data-gtm="our_promise_cta"
        >
          Our Promise
        </Link>
      </div>
    </section>
  );
};

export default memo(OurProcessHome);
