import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import useScrollToTop from "../hooks/scrollToTop";

const WhatsAppButton = () => {
  const scrollToTop = useScrollToTop();

  return (
    <>
      {/* Botón de WhatsApp */}
      <a
        href="https://wa.me/13463800845"
        target="_blank"
        rel="noopener noreferrer"
        title="Chat with us on WhatsApp"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-20 sm:bottom-24 right-2 sm:right-4 md:right-5 lg:right-8 
                  bg-green-500 text-white p-3 rounded-full shadow-xl 
                  hover:bg-green-600 transition duration-300 flex items-center justify-center 
                  w-14 h-14 focus:ring-2 focus:ring-green-300 border border-black/10 z-2000"
        tabIndex={0}
      >
        <FaWhatsapp size={28} />
      </a>

      {/* Botón de Free Quote */}
      <Link 
        to="/freequote"
        onClick={scrollToTop}
        aria-label="Request a free quote"
        className="fixed bottom-5 right-2 sm:right-4 md:right-5 lg:right-8 
                  bg-orange-500 text-sm font-semibold text-white text-center p-3 rounded-full shadow-xl 
                  hover:bg-orange-600 transition duration-300 flex items-center justify-center 
                  w-14 h-14 leading-4 focus:ring-2 focus:ring-orange-300 border border-black/10 z-2000"
        tabIndex={0}
      >
        Free Quote
      </Link>
    </>
  );
};

export default WhatsAppButton;