// src/components/ContractorCard.tsx
import React, { useMemo } from "react";

type ContractorCardProps = {
  /** Clase extra opcional para ajustar estilos desde el padre */
  className?: string;
  /** URL del formulario (opcional). Por defecto apunta al form actual */
  href?: string;
};

const DEFAULT_CONTRACT_FORM_URL =
  "https://dylanmz05.github.io/New-Gen-Patio-Contract-Form/";

const ContractorCard: React.FC<ContractorCardProps> = ({
  className,
  href = DEFAULT_CONTRACT_FORM_URL,
}) => {
  // Memo por prolijidad (si en el futuro agregás UTM o lógica extra)
  const targetHref = useMemo(() => href, [href]);

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
      <h3 className="text-2xl font-bold">ARE YOU A CONTRACTOR?</h3>
      <p className="text-xl text-white/80">We are always open to teamwork.</p>
      <p className="text-xl font-bold">
        If you have a project at hand, you need help, and you want to delegate
        that outdoor space to professionals.
      </p>

      <a
        href={targetHref}
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="Open contractor collaboration form in a new tab"
        data-gtm="contractor_cta"
        className="
          bg-orange-500 border border-white/10 text-white px-4 py-2 mt-4
          rounded-full font-semibold hover:bg-orange-600 transition-all
          cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        "
      >
        WRITE US NOW!
      </a>
    </section>
  );
};

export default ContractorCard;
