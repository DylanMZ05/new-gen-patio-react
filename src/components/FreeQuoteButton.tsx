// src/components/FreeQuoteButton.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/scrollToTop";

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
  questionText = "Do you want to get a Free Quote?",
  buttonText = "Get a Free Quote",
  linkTo = "/get-a-free-quote-houston",
  className,
  size = "md",
  gtmId = "free_quote_cta",
}) => {
  // ✅ usar el hook correctamente (antes te faltaban los paréntesis)
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
      aria-label="Free quote section"
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
          aria-label={buttonText}
        >
          {buttonText}
        </Link>
      </div>
    </nav>
  );
};

export default FreeQuoteButton;
