// src/components/BannerOferta.tsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import "../styles/marquee.css";

type BannerOfertaProps = {
  /** Mostrar u ocultar la tira */
  activo: boolean;
  /** Texto breve que se ve en la tira (va animado tipo marquee) */
  mensaje: string;
  /** Título del popup */
  modalTitulo: string;
  /** Texto del popup (acepta \n) */
  modalTexto: string;
  /** Mensaje prellenado para WhatsApp */
  whatsappMensaje: string;
  /** Reporta la altura real del banner (px) para bajar el header fijo */
  onHeightChange?: (h: number) => void;
  /** Clave para “no mostrar más” (opcional) */
  storageKey?: string;
  /** Clases extra para la barra (opcional) */
  className?: string;
};

const WA_PHONE =
  (typeof import.meta !== "undefined" &&
    // @ts-ignore
    (import.meta.env?.VITE_WHATSAPP_PHONE as string)) ||
  "+1 (346) 581-9082";

const BannerOferta: React.FC<BannerOfertaProps> = ({
  activo,
  mensaje,
  modalTitulo,
  modalTexto,
  whatsappMensaje,
  onHeightChange,
  storageKey,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hiddenByUser, setHiddenByUser] = useState(false);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!storageKey) return;
    const v = localStorage.getItem(storageKey);
    if (v === "dismissed") setHiddenByUser(true);
  }, [storageKey]);

  // Reportar altura real (para posicionar el header debajo)
  useEffect(() => {
    if (!barRef.current || !onHeightChange) return;
    const el = barRef.current;
    const ro = new ResizeObserver(() => onHeightChange(el.offsetHeight));
    ro.observe(el);
    onHeightChange(el.offsetHeight);
    return () => ro.disconnect();
  }, [onHeightChange]);

  const waLink = useMemo(() => {
    const text = encodeURIComponent(whatsappMensaje);
    const phone = (WA_PHONE || "").replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  }, [whatsappMensaje]);

  if (!activo || hiddenByUser) return null;

  return (
    <>
      {/* 🔝 Fijo siempre visible (con marquee) */}
      <div
        ref={barRef}
        className={[
          "fixed top-0 left-0 w-full z-[1100] cursor-pointer",
          // versión compacta y con animación tipo marquee
          "marquee-container-offer border-b border-white/20 shadow bg-[#0d4754] overflow-hidden",
          className || "",
        ].join(" ")}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open promotion details"
      >
        <div className="marquee-offer w-max flex items-center gap-3">
          <p className="text-white text-sm md:text-base font-medium">{mensaje}</p>
          <span className="bg-white px-2 py-0.5 rounded-4xl font-semibold text-black text-xs md:text-sm">
            Learn more
          </span>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1150] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          {/* Card */}
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-[promoPop_180ms_ease-out]"
            style={{ animationFillMode: "both" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 rounded-full px-2 py-1 text-gray-500 hover:text-gray-800"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 id="promo-title" className="text-xl font-bold mb-3">
              {modalTitulo}
            </h2>

            <p className="text-gray-700 whitespace-pre-wrap mb-5">{modalTexto}</p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-semibold rounded-lg py-3 bg-green-500 text-white hover:bg-green-600 transition"
            >
              Chat on WhatsApp
            </a>

            {storageKey && (
              <button
                onClick={() => {
                  localStorage.setItem(storageKey, "dismissed");
                  setHiddenByUser(true);
                }}
                className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
              >
                Don’t show again
              </button>
            )}
          </div>

          <style>{`
            @keyframes promoPop {
              0% { transform: translateY(8px) scale(.98); opacity: 0; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}
    </>
  );
};

export default BannerOferta;
