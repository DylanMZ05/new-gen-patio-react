import React from "react";
import CardGridEs from "./CardGridEs";
import FreeQuoteButtonEs from "../../../components/FreeQuoteButtonEs";

interface ServicesProps {
  showQuoteButton?: boolean;
}

const serviceCards = [
  {
    title: "Cocinas Exteriores Modernas",
    imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/11.webp",
    link: "/modern-outdoor-kitchens-houston/es",
  },
  {
    title: "Cocinas Exteriores Tradicionales",
    imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/03.webp",
    link: "/traditional-outdoor-kitchens-houston/es",
  },
];

const OutdoorKitchenCardsEs: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <header className="text-center max-w-2xl">
        <p className="text-2xl font-semibold text-[#0d4754]">COCINAS EXTERIORES</p>
        <h2 id="services-heading" className="text-4xl font-semibold">Cocinas para Espacios al Aire Libre</h2>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
        <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
          Diseñamos patios, pérgolas y cocinas exteriores de primera calidad, creados para aportar estilo, durabilidad y funcionalidad a su hogar.
        </p>
      </header>

      <CardGridEs cards={serviceCards} />

      {showQuoteButton && (
        <FreeQuoteButtonEs 
          questionText="¿Tiene un proyecto en mente?"
          buttonText="Hablemos"
        />
      )}
    </section>
  );
};

export default OutdoorKitchenCardsEs;