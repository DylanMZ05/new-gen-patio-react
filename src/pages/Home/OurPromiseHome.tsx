import React, { memo, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

// Atributo no tipado por TS en <img>, lo pasamos por spread
const LOW_FETCH_ATTR: Record<string, string> = { fetchpriority: "low" };

// Prefetch del chunk de la página destino (/our-promise)
let ourPromisePrefetched = false;
const prefetchOurPromiseChunk = () => {
  if (ourPromisePrefetched) return;
  ourPromisePrefetched = true;
  import("../../pages/WeDoIt&About/OurPromise").catch(() => {
    ourPromisePrefetched = false; // si falla, reintenta en el próximo hover/viewport
  });
};

const OurProcessHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);
  const [bgLoaded, setBgLoaded] = useState(false);

  const baseUrl = import.meta.env.BASE_URL || "/";
  // El path tiene '&' → encodeURI para evitar problemas
  const rawBg =
    "assets/images/Products/Patios&Pergolas/Attached/02.webp";
  const bgSrc = `${baseUrl}${encodeURI(rawBg)}`;

  // Prefetch cuando la sección entra en viewport (de forma ociosa)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb, { timeout: 1200 })
        : setTimeout(cb, 250);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          idle(() => prefetchOurPromiseChunk());
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Pre-carga del bg para hacer el cross-fade sin flashes
  useEffect(() => {
    const img = new Image();
    img.src = bgSrc;
    img.onload = () => setBgLoaded(true);
  }, [bgSrc]);

  return (
    <section
      ref={sectionRef}
      id="who-we-are"
      role="region"
      aria-labelledby="about-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-white text-center overflow-hidden"
      style={{ contain: "content" as any }} // aísla layout interno (micro anti-CLS)
    >
      {/* Background con cross-fade (sin bg-fixed para evitar jank en móvil) */}
      <img
        {...LOW_FETCH_ATTR}
        src={bgSrc}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 will-change-[opacity] ${
          bgLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading="lazy"
        decoding="async"
      />

      {/* Overlay para contraste */}
      <div className="absolute inset-0 bg-black/80" aria-hidden="true" />

      {/* Contenido */}
      <div className="relative max-w-2xl px-6 text-center">
        <h2 id="about-heading" className="font-semibold text-3xl md:text-4xl">
          Quality &amp; Sustainability Commitment
        </h2>

        <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full" />

        <h3 className="text-lg leading-relaxed opacity-90">
          We design maintenance-free aluminum structures backed by a 5-year warranty. Our
          100% recyclable materials ensure durability while reducing environmental impact.
          From custom 3D designs to seamless permit handling, we make your outdoor vision a reality.
        </h3>

        <Link
          to="/our-promise"
          className="text-black bg-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block transition-all hover:bg-white/90 hover:scale-103 focus:ring-2 focus:ring-white focus:outline-none"
          onClick={handleScrollToTop}
          // Prefetch por interacción
          onMouseEnter={prefetchOurPromiseChunk}
          onFocus={prefetchOurPromiseChunk}
          onTouchStart={prefetchOurPromiseChunk}
          aria-label="Learn more about our quality and sustainability commitment"
        >
          Our Promise
        </Link>
      </div>
    </section>
  );
};

export default memo(OurProcessHome);
