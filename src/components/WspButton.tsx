import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const showAndHidePopup = () => {
      setShowPopup(true);
      setFadeOut(false);

      timeoutId = setTimeout(() => {
        setFadeOut(true);
        timeoutId = setTimeout(() => {
          setShowPopup(false);
          timeoutId = setTimeout(() => {
            showAndHidePopup();
          }, 5000);
        }, 500);
      }, 5000);
    };

    timeoutId = setTimeout(() => {
      showAndHidePopup();
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <>
      {/* Popup bubble */}
      {showPopup && (
        <div
          className={`fixed z-[2100] bottom-[80px] right-[27px]
                      bg-white text-black text-sm px-4 py-2 rounded-xl shadow-lg
                      border border-green-500/70 
                      ${fadeOut ? "animate-fadeOut" : "animate-popup"}`}
        >
          Contact us
          <div className="absolute -bottom-2 right-3 w-0 h-0 
                border-l-8 border-r-8 border-t-8 
                border-l-transparent border-r-transparent border-t-white" />
        </div>
      )}

      {/* WhatsApp button with hyperlink */}
      <a
        href="https://wa.me/+13463800845?text=Hello%2C+I%27m+interested+in+your+services&utm_source=web&utm_medium=button&utm_campaign=whatsapp_contact"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-5 right-2 sm:right-4 md:right-5 lg:right-8 
                  bg-green-500 text-white p-3 rounded-full shadow-xl 
                  hover:bg-green-600 transition duration-300 flex items-center justify-center 
                  w-14 h-14 focus:ring-2 focus:ring-green-300 border border-black/10 z-[2000] cursor-pointer"
      >
        <FaWhatsapp size={28} />
      </a>
    </>
  );
};

export default WhatsAppButton;
