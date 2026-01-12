import { useEffect, useState } from "react";

declare global {
  interface Window {
    fbq: (event: string, action: string) => void;
    gtag: (...args: [string, string, Record<string, unknown>?]) => void;
  }
}

const FreeQuoteTrackingEs = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const msg = sessionStorage.getItem("whatsappMessage") || "";
    setMessage(msg);

    setTimeout(() => {
      if (typeof window.fbq === "function") {
        window.fbq("track", "Lead");
        console.log("📩 Evento Pixel Lead enviado");
      }
    }, 300);

    setTimeout(() => {
      setShowPopup(true);
    }, 1200);
  }, []);

  return (
    <div className="relative min-h-screen bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Capa oscura */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      {/* Contenido */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center justify-center">
        {!showPopup ? (
          <>
            {/* Spinner de carga */}
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-6"></div>
            <p className="text-white text-xl text-center">Registrando su solicitud...</p>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-xl w-full text-center relative">


            <p className="text-xl font-semibold mb-2">Gracias por su solicitud</p>
            <p className="text-red-500/80 font-semibold text-sm mb-4">
              Se le ha redirigido a WhatsApp para una asistencia más rápida. Si no ocurre nada, por favor inténtelo de nuevo.
            </p>

            <button
              onClick={() => {
                window.location.href = `https://wa.me/+13465819082?text=${encodeURIComponent(message)}`;
              }}
              className="mt-2 w-full bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition cursor-pointer"
            >
              Ir a WhatsApp
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FreeQuoteTrackingEs;