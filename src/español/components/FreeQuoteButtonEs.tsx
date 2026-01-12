// src/components/FreeQuoteButton.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../../hooks/scrollToTop";
import { useTranslation } from "react-i18next"; // ⬅️ Nuevo: Importamos useTranslation

interface FreeQuoteButtonProps {
  questionText?: string;
  buttonText?: string;
  linkTo?: string;
  /** Clase extra para el contenedor (opcional) */
  className?: string;
  /** Tamaño del botón (opcional) */
  size?: "sm" | "md" | "lg";
  /** Atributo para analítica (opcional) */
  gtmId?: string;
}

const FreeQuoteButton: React.FC<FreeQuoteButtonProps> = ({
  // ⬅️ CRÍTICO: Usamos las claves por defecto para i18n aquí.
  questionText: questionTextProp,
  buttonText: buttonTextProp,
  linkTo = "/get-a-free-quote-houston/es",
  className,
  size = "md",
  gtmId = "free_quote_cta",
}) => {
  // ⬅️ Usamos el namespace 'common'
  const { t } = useTranslation('common');

  // Si las props no se pasan, usamos la traducción por defecto.
  const defaultQuestionText = t('quote-question-default', { defaultValue: "Do you want to get a Free Quote?" });
  const defaultButtonText = t('quote-button-default', { defaultValue: "Get a Free Quote" });

  const questionText = questionTextProp ?? defaultQuestionText;
  const buttonText = buttonTextProp ?? defaultButtonText;

  const scrollToTop = useScrollToTop();

  const sizeClasses = useMemo(() => {
    switch (size) {
      case "sm":
        return "text-base px-4 py-1";
      case "lg":
        return "text-lg px-6 py-1";
      case "md":
      default:
        return "text-lg px-5 py-1";
    }
  }, [size]);

  return (
    <nav
      className={["text-center mt-10", className || ""].join(" ")}
      role="navigation"
      aria-label={t('quote-button-aria-label', { defaultValue: "Free quote section" })} // ⬅️ Traducción del aria-label de la nav
    >
      {questionText && (
        <p className="text-2xl font-semibold">{questionText}</p>
      )}

      <div className="flex justify-center">
        <Link
          to={linkTo}
          data-gtm={gtmId}
          className={[
            "bg-orange-500 border border-white/10 text-white font-semibold rounded-full mt-4 mb-2 inline-block",
            "transition-transform transition-colors duration-200 hover:bg-orange-600 hover:scale-105",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-300",
            "motion-reduce:transform-none motion-reduce:transition-none",
            sizeClasses,
          ].join(" ")}
          onClick={scrollToTop}
          // ⬅️ Usamos el buttonText ya traducido o pasado por prop
          aria-label={buttonText} 
        >
          {buttonText}
        </Link>
      </div>
    </nav>
  );
};

export default FreeQuoteButton;