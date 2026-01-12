import React, { useId, useState } from "react";

interface FAQItemProps {
  question: string;
  answer: React.ReactNode;
  /** Abierto por defecto (opcional) */
  defaultOpen?: boolean;
  /** Clases extra para el <article> contenedor (opcional) */
  className?: string;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  defaultOpen = false,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // IDs seguros y únicos (evita usar el texto como id)
  const uid = useId();
  const panelId = `faq-panel-${uid}`;
  const buttonId = `faq-button-${uid}`;

  return (
    <article
      className={[
        "w-full max-w-2xl border-b border-gray-300 py-4",
        className || "",
      ].join(" ")}
    >
      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          className={[
            "w-full text-left text-xl font-semibold flex justify-between items-center",
            "text-white bg-[#0d4754] p-3 cursor-pointer transition-colors duration-200",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70",
            isOpen ? "rounded-t-xl" : "rounded-xl",
          ].join(" ")}
          aria-expanded={isOpen}
          aria-controls={panelId}
        >
          {question}
          <svg
            aria-hidden="true"
            className={`ml-3 h-5 w-5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-5-5a1 1 0 1 1 1.414-1.414L10 9.586l4.293-4.293A1 1 0 1 1 15.707 6.707l-5 5A1 1 0 0 1 10 12z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </h3>

      {/* 
        Colapsable con grid 0fr→1fr:
        - No medimos alturas (sin reflows forzados).
        - overflow-hidden asegura que no “salte”.
      */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        className={[
          "grid overflow-hidden",
          "transition-[grid-template-rows] duration-300 ease-in-out",
          "motion-reduce:transition-none",
          "[content-visibility:auto] [contain-intrinsic-size:160px]",
          isOpen ? "rounded-b-xl" : "",
        ].join(" ")}
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        aria-hidden={!isOpen}
      >
        <div className="min-h-0">
          <p className="text-black/80 bg-gray-100/50 border-2 border-t-0 border-black/10 rounded-b-xl p-2 whitespace-pre-line">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
};

export default FAQItem;
