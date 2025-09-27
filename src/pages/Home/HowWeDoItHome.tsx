import { memo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";

// Prefetch del chunk de la ruta /how-we-doit (OurProcess)
let ourProcessPrefetched = false;
const prefetchOurProcessChunk = () => {
  if (ourProcessPrefetched) return;
  ourProcessPrefetched = true;
  import("../../pages/WeDoIt&About/OurProcess").catch(() => {
    // si falla el prefetch, no rompe la navegación
    ourProcessPrefetched = false;
  });
};

const HowWeDoItHome: React.FC = () => {
  const handleScrollToTop = useScrollToTop();
  const sectionRef = useRef<HTMLElement | null>(null);

  // Prefetch cuando el bloque entra en viewport (de forma ociosa)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof window === "undefined" || ourProcessPrefetched) return;

    const idle = (cb: () => void) =>
      (window as any).requestIdleCallback
        ? (window as any).requestIdleCallback(cb, { timeout: 1200 })
        : setTimeout(cb, 300);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting && e.intersectionRatio > 0)) {
          idle(() => prefetchOurProcessChunk());
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
      id="how-we-do-it"
      role="region"
      aria-labelledby="how-we-do-it-heading"
      className="relative flex flex-col items-center justify-center py-12 px-6 text-center bg-gray-100"
      style={{ contain: "content" as any }} /* micro anti-CLS */
    >
      <header>
        <h2
          id="how-we-do-it-heading"
          className="text-2xl font-semibold text-[#0d4754] tracking-wide uppercase"
        >
          How We Do It
        </h2>
        <p className="text-4xl font-semibold text-black mt-2">
          From idea to reality
        </p>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" />
      </header>

      <h3 className="text-lg font-medium text-black/90 max-w-2xl">
        From concept to completion, we craft premium outdoor spaces that blend
        elegance and functionality. Our process ensures durability, style, and
        efficiency, delivering a hassle-free experience from start to finish.
      </h3>

      <Link
        to="/how-we-doit"
        className="bg-orange-500 border border-white/10 text-white text-lg font-semibold px-6 py-2 rounded-full mt-6 inline-block transition-all hover:bg-orange-600 hover:scale-105 focus:ring-2 focus:ring-orange-500 focus:outline-none"
        onClick={handleScrollToTop}
        aria-label="Learn more about how we build high-quality patios and pergolas"
        // Prefetch por interacción
        onMouseEnter={prefetchOurProcessChunk}
        onFocus={prefetchOurProcessChunk}
        onTouchStart={prefetchOurProcessChunk}
      >
        How We Do It
      </Link>
    </section>
  );
};

export default memo(HowWeDoItHome);
