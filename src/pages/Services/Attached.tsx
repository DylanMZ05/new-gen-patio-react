import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "Attached Style Pergolas",
    description: "Breve descripción de Attached Style",
    backgroundImage: "assets/images/Attached24.jpg",
  },
];

const Attached: React.FC = () => {
  const images = [
    "assets/images/Products/Patios&Pergolas/Attached/01.webp",
    "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    "assets/images/Products/Patios&Pergolas/Attached/04.webp",
    "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    "assets/images/Products/Patios&Pergolas/Attached/06.webp",
    "assets/images/Products/Patios&Pergolas/Attached/07.webp",
    "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    "assets/images/Products/Patios&Pergolas/Attached/09.webp",
    "assets/images/Products/Patios&Pergolas/Attached/10.webp",
    "assets/images/Products/Patios&Pergolas/Attached/11.webp",
    "assets/images/Products/Patios&Pergolas/Attached/12.webp",
    "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    "assets/images/Products/Patios&Pergolas/Attached/14.webp",
    "assets/images/Products/Patios&Pergolas/Attached/15.webp",
    "assets/images/Products/Patios&Pergolas/Attached/16.webp",
    "assets/images/Products/Patios&Pergolas/Attached/17.webp",
    "assets/images/Products/Patios&Pergolas/Attached/18.webp",
    "assets/images/Products/Patios&Pergolas/Attached/19.webp",
    "assets/images/Products/Patios&Pergolas/Attached/20.webp",
    "assets/images/Products/Patios&Pergolas/Attached/21.webp",
    "assets/images/Products/Patios&Pergolas/Attached/22.webp",
    "assets/images/Products/Patios&Pergolas/Attached/23.webp",
    "assets/images/Products/Patios&Pergolas/Attached/24.webp",
    "assets/images/Products/Patios&Pergolas/Attached/25.webp",
    "assets/images/Products/Patios&Pergolas/Attached/26.webp",
    "assets/images/Products/Patios&Pergolas/Attached/27.webp",
    "assets/images/Products/Patios&Pergolas/Attached/28.webp",
    "assets/images/Products/Patios&Pergolas/Attached/29.webp",
    "assets/images/Products/Patios&Pergolas/Attached/30.webp",
    "assets/images/Products/Patios&Pergolas/Attached/31.webp",
    "assets/images/Products/Patios&Pergolas/Attached/32.webp",
    "assets/images/Products/Patios&Pergolas/Attached/33.webp",
    "assets/images/Products/Patios&Pergolas/Attached/34.webp",
    "assets/images/Products/Patios&Pergolas/Attached/35.webp",
    "assets/images/Products/Patios&Pergolas/Attached/36.webp",
    "assets/images/Products/Patios&Pergolas/Attached/37.webp",
    "assets/images/Products/Patios&Pergolas/Attached/38.webp",
    "assets/images/Products/Patios&Pergolas/Attached/39.webp",
    "assets/images/Products/Patios&Pergolas/Attached/40.webp",
    "assets/images/Products/Patios&Pergolas/Attached/41.webp",
    "assets/images/Products/Patios&Pergolas/Attached/42.webp",
    "assets/images/Products/Patios&Pergolas/Attached/43.webp",
    "assets/images/Products/Patios&Pergolas/Attached/44.webp",
    "assets/images/Products/Patios&Pergolas/Attached/45.webp",
    "assets/images/Products/Patios&Pergolas/Attached/46.webp",
    "assets/images/Products/Patios&Pergolas/Attached/47.webp",
    "assets/images/Products/Patios&Pergolas/Attached/48.webp",
    "assets/images/Products/Patios&Pergolas/Attached/49.webp",
    "assets/images/Products/Patios&Pergolas/Attached/50.webp",
    "assets/images/Products/Patios&Pergolas/Attached/51.webp",
    "assets/images/Products/Patios&Pergolas/Attached/52.webp",
    "assets/images/Products/Patios&Pergolas/Attached/53.webp",
    "assets/images/Products/Patios&Pergolas/Attached/54.webp",
    "assets/images/Products/Patios&Pergolas/Attached/55.webp",
    "assets/images/Products/Patios&Pergolas/Attached/56.webp",
    "assets/images/Products/Patios&Pergolas/Attached/57.webp",
    "assets/images/Products/Patios&Pergolas/Attached/58.webp",
    "assets/images/Products/Patios&Pergolas/Attached/59.webp",
    "assets/images/Products/Patios&Pergolas/Attached/60.webp",
    "assets/images/Products/Patios&Pergolas/Attached/61.webp",
    "assets/images/Products/Patios&Pergolas/Attached/62.webp",
    "assets/images/Products/Patios&Pergolas/Attached/63.webp",
    "assets/images/Products/Patios&Pergolas/Attached/64.webp",
    "assets/images/Products/Patios&Pergolas/Attached/65.webp",
  ];
  
  console.log(images.length)

  const validImages = images.filter((img) => img && img.trim() !== "");

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <Slider images={validImages} />
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

export default Attached;
