import React from "react";
import CardGridEs from "./CardGridEs";
import FreeQuoteButtonEs from "../../../components/FreeQuoteButtonEs";

interface ServicesProps {
  showQuoteButton?: boolean;
}

const serviceCards = [
  {
    title: "Estilo Adosado",
    imageUrl: "../assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/attached-aluminium-pergola-covered-patio/es",
  },
  {
    title: "Estilo Independiente",
    imageUrl: "../assets/images/Products/Patios&Pergolas/Freestanding/07.webp",
    link: "/free-standing-aluminium-pergola-covered-patio/es",
  },
  {
    title: "Estilo Voladizo (Cantilever)",
    imageUrl: "../assets/images/Products/Patios&Pergolas/Cantilever/21.webp",
    link: "/cantilever-aluminium-pergola/es",
  },
];

const PatioAndPergolasCardEs: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <header className="text-center max-w-2xl">
        <p className="text-2xl font-semibold text-[#0d4754]">PATIOS Y PÉRGOLAS</p>
        <h2 id="services-heading" className="text-4xl font-semibold">Patios y Pérgolas para Espacios Exteriores</h2>
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

export default PatioAndPergolasCardEs;