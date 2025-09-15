// src/components/BannerOferta.tsx
import React, { useEffect, useRef, useState, useMemo } from "react";

type BannerOfertaProps = {
  activo: boolean;
  modalTitulo: string;
  modalTexto: string;
  mensaje?: string; 
  whatsappMensaje: string;
  onHeightChange?: (h: number) => void;
  storageKey?: string;
  className?: string;
};

const WA_PHONE =
  (typeof import.meta !== "undefined" &&
    // @ts-ignore
    (import.meta.env?.VITE_WHATSAPP_PHONE as string)) ||
  "+1 (346) 380-0845";

const BannerOferta: React.FC<BannerOfertaProps> = ({
  activo,
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
      {/* 🔝 Banner con imagen en loop infinito */}
      <div
        ref={barRef}
        className={[
          "fixed top-0 left-0 w-full z-[1100] overflow-hidden cursor-pointer",
          className || "",
        ].join(" ")}
        style={{ height: "45px" }}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Abrir promoción"
      >
        <div className="banner-track">
          <img
            src="/assets/images/fondo-banner.webp"
            alt="banner"
            className="banner-img"
          />
          <img
            src="/assets/images/fondo-banner.webp"
            alt="banner"
            className="banner-img"
          />
        </div>
      </div>

      {/* 📌 Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-[1150] flex items-center justify-center px-4">
          {/* Fondo oscuro */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          {/* Tarjeta */}
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-[promoPop_180ms_ease-out]"
            style={{ animationFillMode: "both" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="promo-title"
          >
            {/* Botón cerrar */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 rounded-full px-2 py-1 text-gray-500 hover:text-gray-800"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h2
              id="promo-title"
              className="text-xl font-bold mb-3 text-blue-700"
            >
              {modalTitulo}
            </h2>

            <p className="text-gray-700 whitespace-pre-wrap mb-5">{modalTexto}</p>

            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center font-semibold rounded-lg py-3 bg-green-600 text-white hover:bg-green-700 transition"
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

          {/* Animación popup */}
          <style>{`
            @keyframes promoPop {
              0% { transform: translateY(8px) scale(.98); opacity: 0; }
              100% { transform: translateY(0) scale(1); opacity: 1; }
            }
          `}</style>
        </div>
      )}

      {/* 🎯 Estilos del banner */}
      <style>{`
        .banner-track {
          display: flex;
          width: calc(19200px * 2); /* dos copias para loop */
          animation: banner-move 230s linear infinite; /* velocidad ajustable */
        }
        .banner-img {
          height: 45px;   /* altura exacta */
          width: 19200px; /* ancho real */
          flex-shrink: 0;
        }
        @keyframes banner-move {
          from { transform: translateX(0); }
          to   { transform: translateX(-19200px); } /* desplaza justo una imagen */
        }
      `}</style>
    </>
  );
};

export default BannerOferta;
