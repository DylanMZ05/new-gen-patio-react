import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "Extra Services",
    description: "Breve descripción de Extra Services",
    backgroundImage: "assets/images/Attached24.jpg",
  },
];

const OutdoorKitchen: React.FC = () => {
  const imagesModern = [
    "assets/images/Products/OutdoorKitchen/Modern/01.webp",
    "assets/images/Products/OutdoorKitchen/Modern/02.webp",
    "assets/images/Products/OutdoorKitchen/Modern/03.webp",
    "assets/images/Products/OutdoorKitchen/Modern/04.webp",
    "assets/images/Products/OutdoorKitchen/Modern/05.webp",
    "assets/images/Products/OutdoorKitchen/Modern/06.webp",
    "assets/images/Products/OutdoorKitchen/Modern/07.webp",
    "assets/images/Products/OutdoorKitchen/Modern/08.webp",
    "assets/images/Products/OutdoorKitchen/Modern/09.webp",
    "assets/images/Products/OutdoorKitchen/Modern/10.webp",
    "assets/images/Products/OutdoorKitchen/Modern/11.webp",
    "assets/images/Products/OutdoorKitchen/Modern/12.webp",
    "assets/images/Products/OutdoorKitchen/Modern/13.webp",
    "assets/images/Products/OutdoorKitchen/Modern/14.webp",
    "assets/images/Products/OutdoorKitchen/Modern/15.webp",
  ];

  const imagesTraditional = [
    "assets/images/Products/OutdoorKitchen/Traditional/01.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/02.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/03.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/04.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/05.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/06.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/07.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/08.webp",
    "assets/images/Products/OutdoorKitchen/Traditional/09.webp",
  ];

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <h2 className="text-4xl font-semibold my-5">Modern Style</h2>
      <Slider images={imagesModern} withBorderT withBorderB/>
      <h2 className="text-4xl font-semibold my-5">Traditional Style</h2>
      <Slider images={imagesTraditional} withBorderT/>
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

export default OutdoorKitchen;
