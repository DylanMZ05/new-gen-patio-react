// src/components/MarqueeBanner.tsx
import { Link } from "react-router-dom";

const MarqueeBanner: React.FC = () => {
  // Tuning rápido
  const styleVars = {
    // @ts-ignore
    "--marquee-speed": "12s",        // velocidad (menor = más rápido)
    "--marquee-gap": "1.5rem",       // separación entre items
    "--fade-size": "6rem",           // ancho del degradado lateral
    "--banner-height": "56px",       // alto estable para evitar CLS
  } as React.CSSProperties;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  return (
    <Link
      to="/patio-financing-houston"
      className="
        group block w-full border-y border-white/20 shadow-lg bg-[#0d4754]
        overflow-hidden relative py-3
        [content-visibility:auto] [contain-intrinsic-size:var(--banner-height)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
      "
      onClick={handleScrollToTop}
      aria-label="Go to financing calculator - Up to 18 months at 0% interest"
      data-discover="true"
      style={styleVars}
    >
      {/* Viewport con fade en bordes (no afecta foco/lectura) */}
      <div
        className="
          relative overflow-hidden
          before:pointer-events-none before:absolute before:inset-y-0 before:left-0
          before:w-[var(--fade-size)] before:bg-gradient-to-r before:from-[#0d4754] before:to-transparent
          after:pointer-events-none after:absolute after:inset-y-0 after:right-0
          after:w-[var(--fade-size)] after:bg-gradient-to-l after:from-[#0d4754] after:to-transparent
        "
      >
        {/* Track = 200% width con 2 copias → loop perfecto moviendo -50% */}
        <div
          className="
            marquee-track flex items-center gap-[var(--marquee-gap)]
            w-max
            motion-reduce:animate-none
            group-hover:[animation-play-state:paused]
            group-focus-within:[animation-play-state:paused]
          "
          aria-hidden={false}
        >
          <BannerChunk />
          <BannerChunk ariaHidden />
        </div>
      </div>

      {/* Estilos locales encapsulados */}
      <style>{`
        /* Animamos solo transform (compositor), sin layout/paint */
        .marquee-track {
          animation: marquee var(--marquee-speed) linear infinite;
          /* activá el compositor solo cuando el usuario interactúa */
        }
        .group:hover .marquee-track,
        .group:focus-within .marquee-track {
          will-change: transform;
        }
        @keyframes marquee {
          0%   { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); } /* mueve media pista */
        }

        /* Respeto a usuarios con reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </Link>
  );
};

export default MarqueeBanner;

/** Fragmento reutilizable del banner (duplicado para el loop) */
const BannerChunk: React.FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => (
  <div className="flex items-center gap-3 pr-6" aria-hidden={ariaHidden ? true : undefined}>
    <p className="text-white text-lg font-bold whitespace-nowrap">
      Flexible Financing Available — Up to 18 Months at 0% Interest!
    </p>
    <span className="bg-white px-3 py-1 rounded-4xl font-semibold text-black whitespace-nowrap">
      Apply Now!
    </span>
  </div>
);
