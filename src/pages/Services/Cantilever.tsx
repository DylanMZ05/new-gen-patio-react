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
    title: "Cantilever Aluminium Pergola",
    description:
      "A modern, innovative pergola with a cantilevered structure, providing shade without traditional corner posts, resulting in a clean and sophisticated look.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Cantilever/03.webp";

const imagePaths = Array.from({ length: 12 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Cantilever/${(i + 1).toString().padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Cantilever: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cantilever Aluminium Pergola | New Gen Patio</title>
        <meta
          name="description"
          content="Explore our cantilever aluminium pergolas in Houston. Modern shade structures with no front posts, ideal for sleek, open outdoor living spaces."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/cantilever-aluminium-pergola" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="cantilever-heading">
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5">
          <h2 className="font-semibold text-3xl mb-3">Why might you need it?</h2>
          <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>You want a modern pergola without posts blocking your view or movement.</li>
            <li>You need a shading solution that takes up minimal space.</li>
            <li>You prefer a sleek, sophisticated design that complements a contemporary home.</li>
          </ul>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Unobstructed View & Maximized Space",
              text: "Cantilever pergolas eliminate the need for front support posts by utilizing a cantilevered beam system. This design ensures an open view while providing greater freedom of movement beneath the structure. The load is evenly distributed across anchor points, and high-strength structural aluminum is used to maintain stability without compromising aesthetics.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimized for Small Spaces",
              text: "Due to their suspended design, cantilever pergolas can be installed in small patios, terraces, or side areas without occupying ground space with support columns. They are securely fixed to a structural base using reinforced brackets, allowing installation on concrete, brick, or metal structures without compromising integrity.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/04.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Efficient Load Distribution",
              text: "High-strength aluminum beams (such as 2x8 or 2x10 profiles) are utilized to support the structure without additional supports. Additionally, insulated roofing panels enhance weight distribution, preventing warping or sagging over time.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/08.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Superior Wind Resistance",
              text: "Designed for aerodynamic efficiency, these pergolas withstand wind speeds of up to 120 mph. Expansion bolts are used for anchoring to ensure stability in adverse weather conditions.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/03.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
          <FreeQuoteButton />
        </div>

        <WhyUsLink backgroundImage={backgroundImage} />
        <Services showQuoteButton={false} />
      </section>
    </>
  );
};

export default Cantilever;
