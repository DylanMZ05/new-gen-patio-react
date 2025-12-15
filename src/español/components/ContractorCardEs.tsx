// src/español/components/ContractorCardEs.tsx
import React, { useMemo } from "react";

type ContractorCardProps = {
  /** Clase extra opcional para ajustar estilos desde el padre */
  className?: string;
  /** URL del formulario (opcional). Por defecto apunta al form actual */
  href?: string;
};

// ✅ NOTA: La URL del formulario se mantiene en la versión base si no hay una específica en español
const DEFAULT_CONTRACT_FORM_URL =
  "https://dylanmz05.github.io/New-Gen-Patio-Contract-Form/";

const ContractorCardEs: React.FC<ContractorCardProps> = ({
  className,
  href = DEFAULT_CONTRACT_FORM_URL,
}) => {
  // Memo por prolijidad (si en el futuro agregás UTM o lógica extra)
  const targetHref = useMemo(() => href, [href]);
  
  // === TEXTOS TRADUCIDOS ===
  const TITLE = "¿ERES CONTRATISTA?";
  const SUBTITLE_1 = "Siempre estamos abiertos a trabajar en equipo.";
  const SUBTITLE_2 = "Si tienes un proyecto en mano, necesitas ayuda y quieres delegar ese espacio exterior a profesionales.";
  const BUTTON_TEXT = "¡ESCRÍBENOS AHORA!";
  const BUTTON_ARIA_LABEL = "Abrir formulario de colaboración para contratistas en una nueva pestaña";


  return (
    <section
      className={[
        // Gradiente responsive para mantener consistencia visual con tu Financing Card
        "flex flex-col items-center justify-center gap-3",
        "bg-gradient-to-t md:bg-gradient-to-r from-red-800 to-purple-800",
        "text-center text-white p-6 rounded-lg shadow-lg w-full mt-6 md:mt-10",
        "md:h-100 md:max-w-md",
        // Micro-optimización de rendimiento para contenido bajo el fold
        "[content-visibility:auto] [contain-intrinsic-size:360px]",
        className || "",
      ].join(" ")}
    >
      <h3 className="text-2xl font-bold">{TITLE}</h3>
      <p className="text-xl text-white/80">{SUBTITLE_1}</p>
      <p className="text-xl font-bold">
        {SUBTITLE_2}
      </p>

      <a
        href={targetHref}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label={BUTTON_ARIA_LABEL}
        data-gtm="contractor_cta"
        className="
          bg-orange-500 border border-white/10 text-white px-4 py-2 mt-4
          rounded-full font-semibold hover:bg-orange-600 transition-all
          cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        "
      >
        {BUTTON_TEXT}
      </a>
    </section>
  );
};

export default ContractorCardEs;