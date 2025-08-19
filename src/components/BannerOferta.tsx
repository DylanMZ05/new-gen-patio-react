// src/components/BannerOferta.tsx
import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

type BannerOfertaProps = {
  /** Mostrar u ocultar la tira */
  activo: boolean;
  /** Texto breve que se ve en la tira (va animado) */
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
  "+1 (346) 380-0845";

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
  const trackRef = useRef<HTMLDivElement | null>(null);
  const itemRef = useRef<HTMLDivElement | null>(null);

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

  // Calcular el arranque en el margen derecho y la distancia de loop
  const recalc = () => {
    const container = barRef.current;
    const item = itemRef.current;
    const track = trackRef.current;
    if (!container || !item || !track) return;

    const containerW = container.clientWidth;  // ancho visible
    const itemW = item.scrollWidth;            // ancho de UNA copia
    // Queremos que el primer carácter esté justo en el borde derecho:
    // => desplazamiento inicial POSITIVO igual al ancho del contenedor.
    const startPx = containerW;                // visible desde el segundo 0
    const loopPx = -itemW;                     // moverse exactamente un item por ciclo

    track.style.setProperty("--ngp-start-px", `${startPx}px`);
    track.style.setProperty("--ngp-loop-px", `${loopPx}px`);

    // Velocidad consistente (~40px/s). Ajustá si querés más rápido/lento.
    const durSec = Math.max(12, Math.round(itemW / 100));
    track.style.setProperty("--ngp-dur", `${durSec}s`);
  };

  useLayoutEffect(() => {
    recalc();
    const ro1 = new ResizeObserver(recalc);
    const ro2 = new ResizeObserver(recalc);
    if (barRef.current) ro1.observe(barRef.current);
    if (itemRef.current) ro2.observe(itemRef.current);
    window.addEventListener("resize", recalc);
    return () => {
      ro1.disconnect();
      ro2.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [mensaje]);

  const waLink = useMemo(() => {
    const text = encodeURIComponent(whatsappMensaje);
    const phone = (WA_PHONE || "").replace(/[^\d]/g, "");
    return `https://wa.me/${phone}?text=${text}`;
  }, [whatsappMensaje]);

  if (!activo || hiddenByUser) return null;

  // Contenido de UNA copia (se duplica para continuidad)
  const Item = () => (
    <div
      ref={itemRef}
      className="flex items-center gap-3 pr-8"
      // Nota: solo la PRIMER copia tiene ref; la segunda es aria-hidden
    >
      <p className="text-white font-medium">{mensaje}</p>
      <span className="bg-white px-2 py-0.5 rounded-4xl font-semibold text-black text-xs md:text-sm">
        Learn more
      </span>
    </div>
  );

  return (
    <>
      {/* 🔝 Fijo siempre visible */}
      <div
        ref={barRef}
        className={[
          "fixed top-0 left-0 w-full z-[1100] cursor-pointer",
          "overflow-hidden bg-orange-500 border-b border-white/20 shadow",
          "py-2", // compacto
          className || "",
        ].join(" ")}
        onClick={() => setIsOpen(true)}
        role="button"
        aria-label="Open promotion details"
      >
        {/* Track que se anima; inicia pegado al margen derecho */}
        <div ref={trackRef} className="ngp-marquee-track">
          <div className="ngp-marquee-item">
            <Item />
          </div>
          <div className="ngp-marquee-item" aria-hidden="true">
            <Item />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-[1150] flex items-center justify-center px-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
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

      {/* 🎯 Estilos del marquee: arranca en el borde derecho y se mueve de forma continua */}
      <style>{`
        .ngp-marquee-track {
          display: flex;
          width: max-content;
          will-change: transform;
          transform: translateX(var(--ngp-start-px, 0px));
          animation: ngp-marquee var(--ngp-dur, 20s) linear infinite;
          /* Asegura visibilidad inmediata incluso en dispositivos lentos */
          animation-delay: 0s;
        }
        .ngp-marquee-item {
          display: flex;
          align-items: center;
          /* separación entre repeticiones */
          padding-right: 5rem;
        }
        /* Mueve exactamente el ancho de UNA copia (loop perfecto) */
        @keyframes ngp-marquee {
          0%   { transform: translateX(var(--ngp-start-px, 0px)); }
          100% { transform: translateX(calc(var(--ngp-start-px, 0px) + var(--ngp-loop-px, -600px))); }
        }
      `}</style>
    </>
  );
};

export default BannerOferta;
