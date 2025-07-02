import React from "react";
import CardGrid from "./CardGrid";
import FreeQuoteButton from "../../../components/FreeQuoteButton";

interface ServicesProps {
  showQuoteButton?: boolean;
}

const serviceCards = [
  {
    title: "Modern Outdoor Kitchens",
    imageUrl: "assets/images/Products/OutdoorKitchen/Modern/11.webp",
    link: "/modern-outdoor-kitchens-houston",
  },
    {
    title: "Traditional Outdoor Kitchens",
    imageUrl: "assets/images/Products/OutdoorKitchen/Traditional/03.webp",
    link: "/traditional-outdoor-kitchens-houston",
  },
];

const OutdorKitchenCard: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <header className="text-center max-w-2xl">
        <p className="text-2xl font-semibold text-[#0d4754]">OUTDOOR KITCHENS</p>
        <h2 id="services-heading" className="text-4xl font-semibold">Outdoor Kitchens for Outdoor Spaces</h2>
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

export default OutdorKitchenCard;