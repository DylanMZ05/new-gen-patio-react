import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";
import FreeQuoteButton from "../../components/FreeQuoteButton";

const sectionsData = [
  {
    id: 1,
    title: "Louvered Aluminium Pergola",
    description:
      "Adjustable-louver pergolas that control sun, shade, and rain with manual or motorized operation—engineered for year-round outdoor living.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Louvered/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Louvered/03.webp";

// Ajustá la cantidad si tenés más/menos imágenes en tu carpeta Louvered
const imagePaths = Array.from({ length: 16 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Louvered/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Louvered: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Louvered Aluminum Pergolas (Motorized) | New Gen Patio</title>
        <meta
          name="description"
          content="Modern louvered pergolas in Houston with adjustable blades—manual or motorized—rain management, integrated lighting & fans. Year-round comfort, custom design."
        />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/louvered-aluminium-pergola"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="louvered-heading"
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
            <li>You want on-demand sun, shade, or full rain protection.</li>
            <li>You prefer a clean, modern look with integrated lighting or fans.</li>
            <li>You need a low-maintenance, all-weather solution for outdoor living.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Benefits</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Adjustable Comfort (Manual or Motorized)",
              text: "Precision-engineered aluminum louvers rotate to control light and ventilation. Choose manual cranks or motorized operation with remote/app controls for seamless comfort throughout the day.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Louvered/02.webp",
              imagePosition: "right" as const,
            },
            {
              title: "All-Weather Rain Management",
              text: "When closed, interlocking blades create a water-tight seal that channels rain into hidden perimeter gutters and downspouts—keeping your space dry and usable year-round.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Louvered/04.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Integrated Accessories",
              text: "Add dimmable LED lighting, ceiling fans, screens, and heaters without compromising the structure. Clean cable routing keeps everything minimal and modern.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Louvered/05.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Durability & Low Maintenance",
              text: "Powder-coated structural aluminum resists corrosion and UV exposure. Few moving parts and sealed actuators ensure long-term reliability with minimal upkeep.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Louvered/06.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Smart Sensors & Automation (Optional)",
              text: "Wind and rain sensors can auto-close the louvers to protect furniture and electronics. Create schedules or scenes for daily use and events.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Louvered/07.webp",
              imagePosition: "right" as const,
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

export default Louvered;
