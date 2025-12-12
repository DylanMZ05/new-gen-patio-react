// src/components/MarqueeBanner.tsx
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next"; // ⬅️ Importamos useTranslation

const MarqueeBanner: React.FC = () => {
  // ⬅️ CRÍTICO: Usamos el namespace 'common'
  const { t } = useTranslation('common');

  const styleVars = {
    // @ts-ignore
    "--marquee-speed": "12s",
    "--marquee-gap": "1.5rem",
    "--fade-size": "6rem",
    "--banner-height": "56px",
  } as React.CSSProperties;

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  
  // ⬅️ Traducción: Generamos el aria-label dinámicamente
  const ariaLabelText = t('financing-banner-aria-label', {
    defaultValue: 'Go to financing calculator - Up to 18 months at 0% interest'
  });

  return (
    <Link
      to="/patio-financing-houston"
      className="
        group block w-screen fixed left-0 right-0 border-y border-white/20 shadow-lg bg-[#0d4754]
        overflow-hidden relative py-3
        [content-visibility:auto] [contain-intrinsic-size:var(--banner-height)]
        focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
      "
      onClick={handleScrollToTop}
      aria-label={ariaLabelText} // ⬅️ Usamos la clave traducida
      style={styleVars}
    >
      {/* Fade lateral */}
      <div
        className="
          relative overflow-hidden
          before:pointer-events-none before:absolute before:inset-y-0 before:left-0
          before:w-[var(--fade-size)] before:bg-gradient-to-r before:from-[#0d4754] before:to-transparent
          after:pointer-events-none after:absolute after:inset-y-0 after:right-0
          after:w-[var(--fade-size)] after:bg-gradient-to-l after:from-[#0d4754] after:to-transparent
        "
      >
        {/* Pista doble (loop infinito) */}
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

      {/* Estilos locales */}
      <style>{`
        .marquee-track {
          animation: marquee var(--marquee-speed) linear infinite;
        }
        .group:hover .marquee-track,
        .group:focus-within .marquee-track {
          will-change: transform;
        }
        @keyframes marquee {
          0%  { transform: translate3d(0,0,0); }
          100% { transform: translate3d(-50%,0,0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
        /* Fuerza full width sin scroll horizontal */
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </Link>
  );
};

export default MarqueeBanner;

// ⭐️ Componente anidado BannerChunk ⭐️
const BannerChunk: React.FC<{ ariaHidden?: boolean }> = ({ ariaHidden }) => {
  // ⬅️ CRÍTICO: Debemos usar useTranslation aquí también, ya que es un componente funcional
  const { t } = useTranslation('common');
    
  return (
    <div
      className="flex items-center gap-3 pr-6"
      aria-hidden={ariaHidden ? true : undefined}
    >
      <p className="text-white text-lg font-bold whitespace-nowrap">
        {/* ⬅️ Traducción: Texto principal del banner */}
        {t('financing-banner-text', { defaultValue: 'Flexible Financing Available — Up to 18 Months at 0% Interest!' })}
      </p>
      <span className="bg-white px-3 py-1 rounded-4xl font-semibold text-black whitespace-nowrap">
        {/* ⬅️ Traducción: Texto del botón CTA */}
        {t('financing-banner-cta', { defaultValue: 'Apply Now!' })}
      </span>
    </div>
  );
};