import React from "react";
import CardGrid from "./CardGrid";
import FreeQuoteButton from "../../../components/FreeQuoteButton";

interface ServicesProps {
  showQuoteButton?: boolean;
}

const serviceCards = [
  {
    title: "Covered Patios & Pergolas",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    link: "/aluminium-custom-pergola-cover-patio",
  },
    {
    title: "Outdoor Kitchens",
    imageUrl: "assets/images/Products/OutdoorKitchen/Modern/01.webp",
    link: "/custom-outdoor-kitchen",
  },
  {
    title: "Additional Services",
    imageUrl: "assets/images/Products/AdditionalServices/1.webp",
    link: "/concrete-and-turf-installation-houston",
    subtitle: "Landscaping | Concrete | Artificial Turf"
  }
];

const Services: React.FC<ServicesProps> = ({ showQuoteButton = true }) => {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="flex flex-col items-center justify-center py-12 px-6"
    >
      <header className="text-center max-w-2xl">
        <h2 className="text-2xl font-semibold text-[#0d4754]">OUR SERVICES</h2>
        <p id="services-heading" className="text-4xl font-semibold">What We Offer</p>
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

export default Services;
