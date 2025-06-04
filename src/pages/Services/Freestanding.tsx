import React from "react";
import { Helmet } from "react-helmet";
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
    title: "Freestanding Aluminium Pergola and Covered Patio",
    description:
      "A standalone pergola that can be placed anywhere in your backyard, offering a versatile and customizable space for relaxation, entertainment, or shade.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Freestanding/06.webp";

const imagePaths = Array.from({ length: 21 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Freestanding/${(i + 1).toString().padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Freestanding: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Freestanding Aluminium Pergola | New Gen Patio</title>
        <meta
          name="description"
          content="Explore our freestanding aluminium pergolas in Houston—self-supported, elegant, and perfect for any area of your backyard. Ideal for modern outdoor living."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/free-standing-aluminium-pergola-covered-patio" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="freestanding-heading">
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5">
          <h2 className="font-semibold text-3xl mb-3">Why might you need it?</h2>
          <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>You want a shaded entertainment area in the middle of your garden or by the pool.</li>
            <li>You're looking to define a space without building walls or heavy structures.</li>
            <li>You need a shaded retreat that doesn’t rely on your home’s structure.</li>
          </ul>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Complete Structural Independence",
              text: "Unlike attached pergolas, freestanding structures are fully self-supporting and do not rely on existing buildings for support. A reinforced concrete base or deep-set anchors in compacted soil is used to ensure structural stability.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Enhanced Design Flexibility & Customization",
              text: "Additional features such as built-in LED lighting, ceiling fans, privacy panels, and outdoor heating systems can be incorporated without affecting the main residence. Various aluminum profiles (6x6 or 8x8 posts, 2x8 or 2x10 beams) allow the structure to be customized to meet aesthetic and functional requirements.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/03.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Defined Outdoor Entertainment Areas",
              text: "Freestanding structures help create distinct outdoor zones for lounging, dining, or grilling. Architectural elements such as aluminum privacy screens or louvered panels can be added to improve privacy while maintaining airflow.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/06.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptability to Uneven Surfaces",
              text: "These structures can be installed on grass, gravel, or concrete due to adaptable foundation systems. For soft ground, reinforced concrete bases with anchor bolts are used, while on level surfaces, mounting plates with bolted connections provide secure attachment.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/09.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
        </div>

        <WhyUsLink backgroundImage={backgroundImage} />
        <Services showQuoteButton={false} />
        <FreeQuoteButton />
      </section>
    </>
  );
};

export default Freestanding;
