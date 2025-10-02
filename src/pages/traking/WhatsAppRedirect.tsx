import { useEffect, useState } from "react";

const WhatsAppRedirect = () => {
  const [message, setMessage] = useState("");
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    const msg = sessionStorage.getItem("whatsappMessage") || "";
    setMessage(msg);
  }, []);

  const handleContinue = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.location.href = `https://wa.me/+13465819082?text=${encodeURIComponent(message)}`;
    }, 1500);
  };

  return (
    <div className="relative min-h-screen bg-[url('/assets/images/Products/Patios&Pergolas/Attached/20.webp')] bg-cover bg-center flex items-center justify-center px-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>

      <div className="relative z-10 w-full max-w-md bg-white p-6 rounded-lg shadow-xl text-center">
        {redirecting ? (
          <>
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
            <p className="text-xl font-semibold">Redirecting to WhatsApp...</p>
          </>
        ) : (
          <>
            <p className="text-xl font-semibold mb-2">You are about to be redirected to WhatsApp</p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => (window.location.href = "/")}
                className="w-1/2 bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleContinue}
                className="w-1/2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition cursor-pointer"
              >
                Continue
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WhatsAppRedirect;