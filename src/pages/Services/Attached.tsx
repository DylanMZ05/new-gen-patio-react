import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";

const sectionsData = [
  {
    id: 1,
    title: "Attached Cover Patio",
    description:
      "An attached pergola that seamlessly connects to your home’s structure, providing shade and protection while maintaining a smooth transition between indoor and outdoor spaces.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Attached/12.webp";

// Lista de imágenes optimizada
const imagePaths = Array.from({ length: 65 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Attached/${(i + 1).toString().padStart(2, "0")}.webp`
);

const validImages = imagePaths.filter((img) => img.trim() !== "");

const Attached: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="attached-heading">
      <header className="sr-only">
        <h1 id="attached-heading">Attached Cover Patio</h1>
      </header>

      <SectionBlock sections={sectionsData} />
      <Slider images={validImages} withBorderT />
      <MarqueeBanner />

      <div className="pt-8 px-5">
        <h2 className="font-semibold text-3xl mb-3">Why might you need it?</h2>
        <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
        <ul className="list-disc pl-6 text-lg">
          <li>Your patio gets too much sun, making it uncomfortable during peak hours.</li>
          <li>You want an outdoor space that feels like a natural extension of your home.</li>
          <li>You're looking for an aesthetic and functional solution without taking up too much space.</li>
        </ul>
      </div>

      <div className="flex flex-col my-10 gap-10">
        {[
          {
            title: "Seamless integration",
            text: "Attaches to your home’s structure, creating a cozy space without disrupting the design.",
            imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
            imagePosition: "right" as const, // Corrige el tipado de TypeScript
          },
          {
            title: "Protection & comfort",
            text: "Shields you from the sun and rain, allowing year-round outdoor enjoyment.",
            imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Energy efficiency",
            text: "Reduces sun exposure on windows and doors, keeping your home cooler.",
            imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Fully customizable",
            text: "A wide range of styles, materials, and finishes to match your taste.",
            imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Increases home value",
            text: "Well-designed outdoor spaces boost property appeal and resale value.",
            imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
            imagePosition: "right" as const,
          },
        ].map((section, index) => (
          <ImgTxtSection key={index} {...section} />
        ))}
      </div>

      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default Attached;
