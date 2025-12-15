// src/components/BannerOferta.tsx
import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";

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

  // ====== Persistencia de dismiss ======
  useEffect(() => {
    if (!storageKey) return;
    const v = localStorage.getItem(storageKey);
    if (v === "dismissed") setHiddenByUser(true);
  }, [storageKey]);

  // ====== Reportar alto sin forzar reflow ======
  useEffect(() => {
    if (!barRef.current || !onHeightChange) return;
    const el = barRef.current;

    // Llamada inicial
    onHeightChange(el.clientHeight);

    const ro = new ResizeObserver((entries) => {
      const entry = entries[0];
      // borderBoxSize evita lecturas de layout en la mayoría de navegadores modernos
      const borderSize =
        Array.isArray(entry.borderBoxSize) && entry.borderBoxSize.length > 0
          ? entry.borderBoxSize[0]
          : (entry as any).borderBoxSize;

      if (borderSize?.blockSize) {
        onHeightChange(Math.round(borderSize.blockSize));
      } else {
        // Fallback razonable
        onHeightChange(el.clientHeight);
      }
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, [onHeightChange]);

  // ====== Link de WhatsApp ======
  const waLink = useMemo(() => {
    const text = encodeURIComponent(whatsappMensaje);
    const phone = (WA_PHONE || "").replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  }, [whatsappMensaje]);

  // ====== Handlers ======
  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);
  const handleKey = useCallback<React.KeyboardEventHandler<HTMLDivElement>>(
    (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setIsOpen(true);
      }
    },
    []
  );
  const dismissForever = useCallback(() => {
    if (storageKey) localStorage.setItem(storageKey, "dismissed");
    setHiddenByUser(true);
  }, [storageKey]);

  if (!activo || hiddenByUser) return null;

  return (
    <>
      {/* 🔝 Banner fijo con fondo en repeat-x y animación en background-position */}
      <div
        ref={barRef}
        className={[
          "fixed top-0 left-0 w-full z-[1100] cursor-pointer select-none",
          "shadow-[0_1px_0_rgba(0,0,0,.06)]",
          className || "",
        ].join(" ")}
        style={
          {
            // altura estable sin CLS
            ["--banner-height" as any]: "45px",
          } as React.CSSProperties
        }
        onClick={openModal}
        onKeyDown={handleKey}
        role="button"
        tabIndex={0}
        aria-label="Open promotion"
      >
        <div className="relative w-full h-[var(--banner-height)] overflow-hidden">
          <div className="absolute inset-0 banner-tiling" aria-hidden="true" />
        </div>
      </div>

      {/* 📌 Modal Popup */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[1150] flex items-center justify-center px-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="promo-title"
        >
          {/* Fondo oscuro */}
          <button
            className="absolute inset-0 bg-black/50"
            aria-label="Close modal"
            onClick={closeModal}
          />
          {/* Tarjeta */}
          <div
            className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-[promoPop_180ms_ease-out] will-change-transform will-change-opacity"
            style={{ animationFillMode: "both" }}
          >
            {/* Botón cerrar */}
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 rounded-full px-2 py-1 text-gray-500 hover:text-gray-800 focus:outline-none focus-visible:ring"
              aria-label="Close"
            >
              ✕
            </button>

            <h2 id="promo-title" className="text-xl font-bold mb-3 text-blue-700">
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
                onClick={dismissForever}
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

      {/* 🎯 Estilos del banner (optimizados) */}
      <style>{`
        /* Imagen en mosaico con repeat-x.
           IMPORTANT: la imagen debe ser "tileable" horizontalmente.
           Si tu /assets/images/fondo-banner.webp no lo es, exportá una versión
           más angosta (p.ej. 1024px) pensada para repetir. */

        .banner-tiling {
          background-image: image-set(
            url("/assets/images/fondo-banner.webp") type("image/webp") 1x
          );
          background-repeat: repeat-x;
          background-size: auto var(--banner-height);
          background-position: 0 50%;
          animation: banner-pan 30s linear infinite;
          will-change: background-position;
        }

        /* Velocidad ajustable: 120s para un scroll suave.
           Menor tiempo = más rápido. */
        @keyframes banner-pan {
          from { background-position: 0 50%; }
          to   { background-position: -2000px 50%; }
        }

        /* Respeta usuarios con reducción de movimiento */
        @media (prefers-reduced-motion: reduce) {
          .banner-tiling { animation: none; }
        }
      `}</style>
    </>
  );
};

export default BannerOferta;
