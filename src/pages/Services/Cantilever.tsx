import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "Cantilever Style Pergolas",
    description: "Breve descripción de Cantilever Style",
    backgroundImage: "assets/images/Attached24.jpg",
  },
];

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
      <Slider images={images} />
      <MarqueeBanner />

      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Visualizing Your Project"
          text="Making your vision crystal clear before we even start is essential for us..."
          imageUrl="assets/images/Attached24.jpg"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Built to Last with $0 cost of Maintenance"
          text="Our aluminum structures are designed to endure the harshest conditions..."
          imageUrl="assets/images/Free3.jpg"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Visualizing Your Project"
          text="Making your vision crystal clear before we even start is essential for us..."
          imageUrl="assets/images/Attached24.jpg"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Built to Last with $0 cost of Maintenance"
          text="Our aluminum structures are designed to endure the harshest conditions..."
          imageUrl="assets/images/Free3.jpg"
          imagePosition="left"
        />
      </div>
    </section>
  );
};

export default Cantilever;
