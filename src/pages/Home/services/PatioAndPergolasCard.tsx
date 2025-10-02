import React from "react";
import CardGrid from "./CardGrid";
import FreeQuoteButton from "../../../components/FreeQuoteButton";

interface ServicesProps {
  showQuoteButton?: boolean;
}

const serviceCards = [
  {
    title: "Attached Style",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/attached-aluminium-pergola-covered-patio",
  },
  {
    title: "Freestanding Style",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/07.webp",
    link: "/free-standing-aluminium-pergola-covered-patio",
  },
    {
    title: "Cantilever Style",
    imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/21.webp",
    link: "/cantilever-aluminium-pergola",
  },
];

const PatiosAndPergolasCard: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <header className="text-center max-w-2xl">
        <p className="text-2xl font-semibold text-[#0d4754]">PATIOS AND PERGOLAS</p>
        <h2 id="services-heading" className="text-4xl font-semibold">Patios and Pergolas for Outdoor Spaces</h2>
        <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
        <p className="text-center font-semibold text-black/80 mb-6 max-w-2xl">
          We craft premium patios, pergolas, and outdoor kitchens designed for style, durability, and functionality.
        </p>
      </header>

      <CardGrid cards={serviceCards} />

      {showQuoteButton && <FreeQuoteButton 
                      questionText="Got a project in mind?"
                      buttonText="Let’s Talk"
                    />}
    </section>
  );
};

export default PatiosAndPergolasCard;
