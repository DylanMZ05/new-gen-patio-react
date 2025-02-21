import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";

const ExtraServices: React.FC = () => {
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
      <div className="h-[100px]"></div>
      <div className="px-4 flex flex-col items-center justify-center text-center">
        <h2 className="text-3xl font-bold">Extra Services</h2>
        <div className="w-25 h-1 background-skyblue mt-3 mb-2 rounded-4xl"></div>
        <p className="text-[24px] mb-5">
          BREVE descripción de Extra Services (OUTDOOR KITCHEN + CONCRETE +
          GRASS)
        </p>
      </div>
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

export default ExtraServices;
