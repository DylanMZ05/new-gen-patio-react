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
    title: "Pergola Cantilever Design",
    description: "A modern, innovative pergola with a cantilevered structure, providing shade without traditional corner posts, resulting in a clean and sophisticated look.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Cantilever/03.webp";

const Cantilever: React.FC = () => {
  const images = [
    "assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/02.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/03.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/04.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/05.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/06.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/07.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/08.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/09.webp",
    "assets/images/Products/Patios&Pergolas/Cantilever/10.webp",
  ];

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <Slider images={images} withBorderT/>
      <MarqueeBanner />
      <div className="pt-8 px-5">
        <h3 className="font-semibold text-3xl mb-3">
          Why might you need it?
        </h3>
        <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <p className="text-lg">🔹 You want a modern pergola without posts blocking your view or movement.</p>
          <p className="text-lg">🔹 You need a shading solution that takes up minimal space.</p>
          <p className="text-lg">🔹 You prefer a sleek, sophisticated design that complements a contemporary home.</p>
      </div>
      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Unobstructed View and Maximized Usable Space"
          text="Cantilever pergolas eliminate the need for front support posts by utilizing a cantilevered beam system. This design ensures an open view while providing greater freedom of movement beneath the structure. The load is evenly distributed across anchor points, and high-strength structural aluminum is used to maintain stability without compromising aesthetics."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Optimized for Small Spaces"
          text="Due to their suspended design, cantilever pergolas can be installed in small patios, terraces, or side areas without occupying ground space with support columns. They are securely fixed to a structural base using reinforced brackets, allowing installation on concrete, brick, or metal structures without compromising integrity."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/04.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Efficient Load Distribution"
          text="High-strength aluminum beams (such as 2x8 or 2x10 profiles) are utilized to support the structure without additional supports. Additionally, insulated roofing panels enhance weight distribution, preventing warping or sagging over time."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/06.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Superior Wind Resistance"
          text="Designed for aerodynamic efficiency, these pergolas withstand wind speeds of up to 120 mph. Expansion bolts are used for anchoring to ensure stability in adverse weather conditions."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/03.webp"
          imagePosition="left"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default Cantilever;
