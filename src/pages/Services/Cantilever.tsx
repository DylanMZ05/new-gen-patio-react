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
          title="Unobstructed design"
          text="Provides shade without intrusive posts."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Cutting-edge aesthetics"
          text="Sleek and contemporary, ideal for modern architecture."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/04.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Maximum functionality"
          text="Efficient shade coverage with minimal visual impact."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/06.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Strong & durable"
          text="Made with high-quality materials to withstand the elements."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/03.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Low maintenance"
          text="Easy to clean and maintain for long-lasting beauty."
          imageUrl="assets/images/Products/Patios&Pergolas/Cantilever/05.webp"
          imagePosition="right"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default Cantilever;
