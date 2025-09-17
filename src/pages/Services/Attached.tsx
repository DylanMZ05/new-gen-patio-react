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
  "covered patio attached to house",
  "pergola attached house",
  "pergola attached to house",
  "attached gable roof patio cover",
  "attached pergola roof",
  "attached pergola with roof",
  "attached pergola",
  "attached patio cover",
  "modern pergola attached to house",
  "patio roof attached to house",
  "pergola roof attached to house",
  "pergola with roof attached to house",
  "enclosed patio attached to house",
  "house attached pergola",
  "patios attached to house",
  "covered pergola attached to house",
  "attached covered patio",
  "attached patio",
  "patio cover attached to roof",
  "pergola attached to house on deck",
  "aluminum pergola attached to house",
  "attached patio roof",
  "backyard patio attached to house",
  "covered outdoor kitchen attached to house",
  "metal pergola attached to house",
  "patio attached to roof",
  "pergola attached to house roof",
  "white pergola attached to house",
  "aluminum attached solid patio cover",
  "aluminum patio cover attached to house",
  "attached aluminum patio cover",
  "attached aluminum pergola",
  "attached backyard patio",
  "attached covered patio with fireplace",
  "attached covered pergola",
  "attached covered porch",
  "attached enclosed patio",
  "attached metal patio covers",
  "attached metal pergola",
  "attached modern pergola",
  "attached outdoor covered patio",
  "attached patio awning",
  "attached pergola on deck",
  "attached pergola with metal roof",
  "attached white pergola",
  "backyard attached patio",
  "backyard attached pergola",
  "backyard covered patios attached to house",
  "cantilever pergola attached to house",
  "covered attached patio",
  "covered outdoor area attached to house",
  "covered outdoor space attached to house",
  "covered patio attached to roof",
  "covered patio with attached pergola",
  "custom attached pergola",
  "enclosed pergola attached to house",
  "home attached pergola",
  "house attached patio roof",
  "metal attached pergola",
  "modern attached pergola",
  "non attached patio cover",
  "outdoor attached patios",
  "outdoor attached pergola",
  "outdoor covered patio attached to house",
  "outdoor patio attached to house",
  "patio canopy attached to house",
  "patio cover attached",
  "patio pergola attached to house",
  "patio roof attached to fascia",
  "patio roof not attached to house",
  "pergola attached to back of house",
  "pergola attached to brick house",
  "pergola attached to brick wall",
  "pergola attached to covered patio",
  "pergola attached to deck",
  "pergola attached to front of house",
  "pergola attached to home",
  "pergola attached to house wall",
  "pergola attached to wall",
  "pergola house attached",
  "pergola patio attached to house",
  "pergola with attached bar",
  "screened in pergola attached to house",
  "wall attached patio cover",
  "wall attached pergola",
  "white attached pergola",
  "attach pergola to brick house",
  "attach pergola to brick wall",
  "attach pergola to concrete",
  "attach pergola to fascia",
  "attach pergola to house roof",
  "attach pergola to patio",
  "attachable pergola",
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 35; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva el orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Attached Aluminium Pergola and Covered Patio",
    description:
      "An attached pergola that seamlessly connects to your home’s structure, providing shade and protection while maintaining a smooth transition between indoor and outdoor spaces.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Attached/12.webp";

const imagePaths = Array.from({ length: 46 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Attached/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Attached: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Attached Aluminum Pergolas & Covered Patios | New Gen Patio</title>
        <meta
          name="description"
          content="Your living space is seamlessly expanded with an attached aluminum pergola or covered patio. Durable, modern, and custom-built for your Houston home. A free consultation is available!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/attached-aluminium-pergola-covered-patio"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="attached-heading"
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
            <li>Your patio gets too much sun, making it uncomfortable during peak hours.</li>
            <li>You want an outdoor space that feels like a natural extension of your home.</li>
            <li>You're looking for an aesthetic and functional solution without taking up too much space.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Benefits
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Seamless Integration",
              text: "This type of cover is directly attached to the house using a wall header, ensuring even load distribution but it’s not intrusive and we won’t modify the structure of your home. As a result, the structure extends the living space naturally, blending harmoniously with the existing architecture.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Energy Efficiency",
              text: "The use of 3-inch insulated roofing panels significantly reduces heat transfer, minimizing indoor temperatures. By decreasing direct sun exposure on windows and glass doors, energy efficiency is improved, leading to a 30% reduction in air conditioning costs.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Increased Stability and Durability",
              text: "With an additional structural support point from the house, the cover gains enhanced resistance to impacts and high winds. A high-durability epoxy coated aluminum finish protects against corrosion and long term weather exposure.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimized for Compact Patios",
              text: "By utilizing the house as a structural support, the need for additional posts is eliminated, creating a more open and spacious environment—ideal for small patios where space is limited.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
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

export default Attached;
