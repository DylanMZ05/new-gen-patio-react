import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

/**
 * Prefetch del chunk de AboutUsPage:
 * - Evita múltiples cargas con un flag.
 * - No rompe el code-splitting (sigue siendo un import dinámico).
 */
let aboutUsPrefetched = false;
const prefetchAboutUsChunk = () => {
  if (aboutUsPrefetched) return;
  aboutUsPrefetched = true;
  // Vite/Rollup mantiene el split; esto dispara la descarga por adelantado
  import("../../pages/WeDoIt&About/AboutUsPage").catch(() => {
    // silencioso: si falla el prefetch no afecta la navegación
    aboutUsPrefetched = false;
  });
};

const AboutUsHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Prefetch cuando el bloque entra al viewport (sin bloquear el primer render)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined" || aboutUsPrefetched) return;

    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb, { timeout: 1200 })
        : setTimeout(cb, 300);

    const io = new IntersectionObserver(
      (entries) => {
        const v = entries.some((e) => e.isIntersecting && e.intersectionRatio > 0);
        if (v) {
          idle(() => prefetchAboutUsChunk());
          io.disconnect();
        }
      },
      { rootMargin: "150px 0px", threshold: [0, 0.15] }
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
      className="relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100"
      style={{ contain: "content" as any }} // aísla layout interno; micro-ganancia CLS
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
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        We’re more than builders — we’re a team dedicated to designing outdoor
        spaces that inspire connection, comfort, and lasting memories.
      </h3>

      <Link
        to="/about-us"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        aria-label="Learn more about our team and mission"
        // Prefetch por interacción (hover/focus/touch)
        onMouseEnter={prefetchAboutUsChunk}
        onFocus={prefetchAboutUsChunk}
        onTouchStart={prefetchAboutUsChunk}
      >
        Learn More About Us
      </Link>
    </section>
  );
};

export default memo(AboutUsHome);
