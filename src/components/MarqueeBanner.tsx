// src/components/MarqueeBanner.tsx
import { Link } from "react-router-dom";

const MarqueeBanner: React.FC = () => {
  // Si querés cambiar la velocidad, ajustá --marquee-speed abajo (ej: "18s", "12s")
  // También podés ajustar --fade-size para el degradado de bordes.
  const styleVars = {
    // @ts-ignore - CSS variables
    "--marquee-speed": "20s",
    "--fade-size": "6rem",
  } as React.CSSProperties;

  const handleScrollToTop = () => {
    // "instant" no es estándar; usamos "auto" para evitar warnings
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <Link
      to="/patio-financing-houston"
      className="
        block w-full border-y border-white/20 shadow-lg bg-[#0d4754]
        py-3 overflow-hidden relative
        [content-visibility:auto] [contain-intrinsic-size:56px]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
      "
      onClick={handleScrollToTop}
      aria-label="Go to financing calculator - Up to 18 months at 0% interest"
      data-discover="true"
      style={styleVars}
    >
      {/* Viewport con fade en los bordes (no recorta tab/focus) */}
      <div
        className="
          relative overflow-hidden
          before:pointer-events-none before:absolute before:inset-y-0 before:left-0
          before:w-[var(--fade-size)] before:bg-gradient-to-r before:from-[#0d4754] before:to-transparent
          after:pointer-events-none after:absolute after:inset-y-0 after:right-0
          after:w-[var(--fade-size)] after:bg-gradient-to-l after:from-[#0d4754] after:to-transparent
        "
      >
        {/* Contenido duplicado para marquee infinito sin medir anchos */}
        <div
          className="
            marquee-track flex items-center gap-6 w-max
            will-change-transform
            motion-reduce:animation-none
            hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]
          "
          aria-hidden={false}
        >
          <BannerChunk />

        </div>
      </div>

      {/* Estilos locales */}
      <style>{`
        /* Animación: desplazamos el contenedor con dos copias -50% para loop perfecto */
        .marquee-track {
          animation: marquee var(--marquee-speed) linear infinite;
        }
        @keyframes marquee {
          from { transform: translateX(100vw); }
          to   { transform: translateX(-120vw); }
        }

        /* Fallback para navegadores sin masks: usamos los pseudo (before/after) de arriba */
        /* Respeto por reduced motion ya aplicado con motion-reduce:animation-none */
      `}</style>
    </Link>
  );
};

export default MarqueeBanner;

/** Fragmento con el contenido del banner; lo usamos duplicado para el loop */
const BannerChunk: React.FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => (
  <div
    className="flex items-center gap-3 pr-6"
    aria-hidden={ariaHidden ? true : undefined}
  >
    <p className="text-white text-lg font-bold whitespace-nowrap">
      Flexible Financing Available — Up to 18 Months at 0% Interest!
    </p>
    <span className="bg-white px-3 py-1 rounded-4xl font-semibold text-black whitespace-nowrap">
      Apply Now!
    </span>
  </div>
);
