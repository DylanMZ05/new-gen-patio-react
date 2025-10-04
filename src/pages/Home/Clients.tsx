import "../../styles/googleCards.css";
import React, { useRef, useEffect, useState, useMemo, memo } from "react";

/* === Ajustes de velocidad ===
   - Desktop: 20 px/s
   - Mobile:  12 px/s
   - La duración del loop siempre queda entre 45s y 240s
*/
const TOTAL_IMAGES = 71;
const BASE_SPEED_DESKTOP = 20; // px/seg
const BASE_SPEED_MOBILE  = 12; // px/seg
const MIN_SECONDS        = 45;
const MAX_SECONDS        = 240;
const PLACEHOLDER = "/assets/images/default-placeholder.webp";

// Atributo "fetchpriority" sin romper TypeScript (spread genérico)
const LOW_FETCH_ATTR: Record<string, string> = { fetchpriority: "low" };

const Clients: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);        // contenedor visible
  const trackRef = useRef<HTMLAnchorElement>(null);          // tira que se anima
  const sectionRef = useRef<HTMLElement | null>(null);

  const [animationDuration, setAnimationDuration] = useState("30s");
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  const containStyle: React.CSSProperties = { contain: "content" };

  // Construye rutas respetando BASE_URL si deployas en subcarpeta
  const baseUrl = import.meta.env.BASE_URL || "/";
  const images = useMemo(
    () =>
      Array.from({ length: TOTAL_IMAGES }, (_, i) =>
        `${baseUrl}assets/images/opinions/${String(i + 1).padStart(2, "0")}.webp`
      ),
    [baseUrl]
  );

  // Detector de mobile para bajar más la velocidad
  const getSpeed = () => {
    if (typeof window === "undefined" || !window.matchMedia) return BASE_SPEED_DESKTOP;
    return window.matchMedia("(max-width: 768px)").matches
      ? BASE_SPEED_MOBILE
      : BASE_SPEED_DESKTOP;
  };

  // Montaje diferido: renderiza el carrusel solo cuando entra en viewport
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          // fuerza una medición en el próximo frame para disparar el ResizeObserver
          requestAnimationFrame(() => {
            // leer scrollWidth fuerza layout y ayuda a que el RO dispare
            void containerRef.current?.scrollWidth;
          });
          io.disconnect();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Respeta prefers-reduced-motion
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = () => setReducedMotion(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Calcula duración en función del ancho real del track y la velocidad target
  useEffect(() => {
    const node = trackRef.current; // medimos la tira que se anima
    if (!node) return;

    const recompute = () => {
      // Como duplicamos el contenido, un loop es la mitad del ancho total
      const loopWidth = Math.max(1, node.scrollWidth / 2); // px
      const speed = getSpeed();                            // px/s
      const seconds = loopWidth / speed;
      const clamped = Math.max(MIN_SECONDS, Math.min(MAX_SECONDS, seconds));
      setAnimationDuration(`${clamped.toFixed(2)}s`);
    };

    const ro = new ResizeObserver(recompute);
    ro.observe(node);
    recompute(); // primer cálculo

    // Si cambia el breakpoint (mobile/desktop), recalculamos
    let mm: MediaQueryList | null = null;
    if (typeof window !== "undefined" && window.matchMedia) {
      mm = window.matchMedia("(max-width: 768px)");
      const onChange = () => recompute();
      mm.addEventListener("change", onChange);
      return () => {
        ro.disconnect();
        mm?.removeEventListener("change", onChange);
      };
    }
    return () => ro.disconnect();
  }, [visible]);

  return (
    <section
      ref={sectionRef}
      id="reviews"
      role="region"
      aria-labelledby="clients-heading"
      className="flex flex-col items-center justify-center py-12 px-6 border-t border-black/20 overflow-hidden bg-gray-100"
      style={containStyle}
    >
      <p id="clients-heading" className="font-semibold text-4xl text-center">
        Our Clients
      </p>
      <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-5 rounded-full" />

      {/* Carrusel / marquee */}
      <div
        className="marquee-reviews-container max-w-[1080px] h-[260px]" /* altura fija -> evita CLS */
        ref={containerRef}
        aria-hidden={!visible}
      >
        {visible ? (
          <a
            ref={trackRef}
            href="https://www.google.com/search?q=new+gen+patio+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="marquee-reviews cursor-pointer"
            style={{
              animationDuration,
              animationPlayState: reducedMotion ? "paused" : "running",
            }}
            aria-label="Open Google reviews for New Gen Patio in a new tab"
            title="Open Google reviews"
          >
            {[...images, ...images].map((src, index) => (
              <div key={index} className="review-card">
                <img
                  {...LOW_FETCH_ATTR}
                  src={src}
                  alt={`Google review image ${index + 1} for New Gen Patio`}
                  width={320}
                  height={260}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    const img = e.currentTarget as HTMLImageElement & {
                      dataset: DOMStringMap & { fallbackApplied?: string };
                    };
                    if (img.dataset.fallbackApplied) return;
                    img.dataset.fallbackApplied = "1";
                    img.src = `${baseUrl}${PLACEHOLDER.replace(/^\//, "")}`;
                  }}
                />
              </div>
            ))}
          </a>
        ) : (
          // Placeholder liviano mientras no está visible
          <div className="w-full h-full" aria-hidden="true" />
        )}
      </div>

      <a
        href="https://www.google.com/search?q=new+gen+patio+reviews"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white bg-black text-xl font-semibold px-5 pt-1 pb-2 rounded-full mt-5 inline-block transition-all hover:bg.black/90 hover:scale-105 focus:ring-2 focus:ring-white focus:outline-none"
        aria-label="View all Google reviews for New Gen Patio"
      >
        View all reviews
      </a>
    </section>
  );
};

export default memo(Clients);
