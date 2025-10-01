import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";
import FreeQuoteButton from "../../components/FreeQuoteButton";

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "cantilever pergola",
  "aluminum cantilever pergola",
  "cantilever steel pergola",
  "modern cantilever pergola",
  "steel cantilever pergola",
  "cantilever aluminium pergola",
  "cantilever metal pergola",
  "cantilever pergola attached to house",
  "cantilever pergola kits",
  "metal cantilever pergola",
  "modern steel cantilever pergola",
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 20; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva el orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Cantilever Aluminium Pergola",
    description:
      "A modern, innovative pergola with a cantilevered structure, providing shade without traditional corner posts, resulting in a clean and sophisticated look.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Cantilever/03.webp";

// Ajustá la cantidad si tenés más/menos imágenes en tu carpeta Cantilever
const imagePaths = Array.from({ length: 12 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Cantilever/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Cantilever: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Modern Cantilever Pergolas & Carports | New Gen Patio</title>
        <meta
          name="description"
          content="Modern design is experienced with a cantilever pergola or carport. Minimalist structures offering maximum shade and style for your Houston patio are provided. Discover the difference."
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/cantilever-aluminium-pergola"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="Cantilever-heading"
      >
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            Why might you need it?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>You want a modern pergola without posts blocking your view or movement.</li>
            <li>You need a shading solution that takes up minimal space.</li>
            <li>You prefer a sleek, sophisticated design that complements a contemporary home.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Benefits</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Unobstructed View and Maximized Usable Space",
              text: "Cantilever pergolas eliminate the need for front support posts by utilizing a cantilevered beam system. This design ensures an open view while providing greater freedom of movement beneath the structure. The load is evenly distributed across anchor points, and high-strength structural aluminum is used to maintain stability without compromising aesthetics.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/PRIMERO.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimized for Small Spaces",
              text: "Due to their suspended design, cantilever pergolas can be installed in small patios, terraces, or side areas without occupying ground space with support columns. They are securely fixed to a structural base using reinforced brackets, allowing installation on concrete, brick, or metal structures without compromising integrity.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/SEGUNDO.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Efficient Load Distribution",
              text: "High-strength aluminum beams (such as 2x8 or 2x10 profiles) are utilized to support the structure without additional supports. Additionally, insulated roofing panels enhance weight distribution, preventing warping or sagging over time.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/TERCERO.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Superior Wind Resistance",
              text: "Designed for aerodynamic efficiency, these pergolas withstand wind speeds of up to 120 mph. Expansion bolts are used for anchoring to ensure stability in adverse weather conditions.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/CUARTO.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
          <FreeQuoteButton questionText="Got a project in mind?" buttonText="Let’s Talk" />
        </div>

        <WhyUsLink backgroundImage={backgroundImage} />
        <Services showQuoteButton={false} />
      </section>
    </>
  );
};

export default Cantilever;
