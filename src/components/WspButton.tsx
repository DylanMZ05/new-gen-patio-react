import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const phoneNumber = "1234567890";

  return (
    <>
      <a
        href={`https://wa.me/${phoneNumber}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-1000 bottom-17 right-2 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition duration-300 flex items-center justify-center w-14 h-14"
      >
        <FaWhatsapp size={28} />
      </a>
      <a
        href={`/`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-1000 bottom-2 right-2 text-[14px] bg-orange-500 font-semibold text-white text-center p-3 rounded-full shadow-lg hover:bg-orange-600 transition duration-300 flex items-center justify-center w-14 h-14"
      >
        Free Quote
      </a>
    </>
  );
};

export default WhatsAppButton;
