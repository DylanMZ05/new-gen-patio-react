// src/components/WspButton.tsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { FaWhatsapp } from "react-icons/fa";

const RAW_PHONE =
  (typeof import.meta !== "undefined" &&
    // @ts-ignore
    (import.meta.env?.VITE_WHATSAPP_PHONE as string)) ||
  "+13465819082"; // fallback consistente con el sitio
const PHONE_DIGITS = RAW_PHONE.replace(/[^\d]/g, "");

// ====== TIMINGS (ajustá acá la “velocidad” del ciclo del popup) ======
const INITIAL_DELAY_MS = 5000; // espera inicial antes del primer popup
const VISIBLE_MS = 5000;       // tiempo visible del popup
const FADE_MS = 500;           // duración del fade out
const HIDDEN_MS = 5000;        // espera entre un ciclo y el siguiente

const WhatsAppButton: React.FC = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const timerRef = useRef<number | null>(null);

  // Respeta "prefers-reduced-motion": si está activo, no ciclamos el popup.
  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    clearTimer();
    timerRef.current = window.setTimeout(fn, ms);
  }, [clearTimer]);

  const startCycle = useCallback(() => {
    // Espera inicial
    schedule(() => {
      setShowPopup(true);
      setFadeOut(false);

      // Mantener visible
      schedule(() => {
        setFadeOut(true);

        // Esperar el fade y ocultar
        schedule(() => {
          setShowPopup(false);

          // Pausa entre ciclos y repetir
          schedule(() => {
            startCycle();
          }, HIDDEN_MS);
        }, FADE_MS);
      }, VISIBLE_MS);
    }, INITIAL_DELAY_MS);
  }, [schedule]);

  useEffect(() => {
    if (prefersReducedMotion) return; // no animes ni muestres en bucle

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        clearTimer();
        setShowPopup(false);
        setFadeOut(false);
      } else {
        // reinicia el ciclo al volver a la pestaña
        startCycle();
      }
    };

    startCycle();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      clearTimer();
    };
  }, [prefersReducedMotion, startCycle, clearTimer]);

  const waLink = useMemo(() => {
    const msg = "Hello, I'm interested in your services";
    const utm = "utm_source=web&utm_medium=button&utm_campaign=whatsapp_contact";
    return `https://wa.me/${PHONE_DIGITS}?text=${encodeURIComponent(msg)}&${utm}`;
  }, []);

  return (
    <>
      {/* Popup bubble */}
      {showPopup && (
        <div
          className={[
            "fixed z-[2100] bottom-[80px] right-[27px]",
            "bg-white text-black text-sm px-4 py-2 rounded-xl shadow-lg border border-green-500/70",
            fadeOut ? "wsp-anim-out" : "wsp-anim-in",
          ].join(" ")}
          role="status"
          aria-live="polite"
        >
          Contact us
          <div
            className="absolute -bottom-2 right-3 w-0 h-0 
                       border-l-8 border-r-8 border-t-8 
                       border-l-transparent border-r-transparent border-t-white"
            aria-hidden="true"
          />
        </div>
      )}

      {/* WhatsApp button */}
      <a
        href={waLink}
        target="_blank"
        rel="noopener noreferrer nofollow"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        className="
          fixed bottom-5 right-2 sm:right-4 md:right-5 lg:right-8
          bg-green-500 text-white p-3 rounded-full shadow-xl
          hover:bg-green-600 transition duration-300
          flex items-center justify-center w-14 h-14
          focus:ring-2 focus:ring-green-300 border border-black/10
          z-[2000] cursor-pointer
        "
      >
        <FaWhatsapp size={28} aria-hidden="true" />
      </a>

      {/* Animaciones locales (no dependen de Tailwind) */}
      <style>{`
        @keyframes wspPopupIn {
          0% { transform: translateY(8px) scale(.98); opacity: 0; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }
        @keyframes wspFadeOut {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }
        .wsp-anim-in {
          animation: wspPopupIn 220ms ease-out both;
        }
        .wsp-anim-out {
          animation: wspFadeOut ${FADE_MS}ms ease-in both;
        }
        @media (prefers-reduced-motion: reduce) {
          .wsp-anim-in, .wsp-anim-out { animation: none; }
        }
      `}</style>
    </>
  );
};

export default WhatsAppButton;
