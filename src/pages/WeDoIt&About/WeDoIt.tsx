import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "How we do it",
    description: "Breve descripción de How we do it",
    backgroundImage: "assets/images/Attached24.jpg",
  },
];

const HowWeDoIt: React.FC = () => {
  const images = [
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
    "assets/images/Attached24.jpg",
    "assets/images/Free3.jpg",
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

export default HowWeDoIt;
