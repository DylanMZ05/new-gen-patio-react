import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";

const sectionsData = [
  {
    id: 1,
    title: "Attached Cover Patio",
    description: "An attached pergola that seamlessly connects to your home’s structure, providing shade and protection while maintaining a smooth transition between indoor and outdoor spaces.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/01.webp",
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
      <Slider images={validImages} withBorderT/>
      <MarqueeBanner />
      <div className="pt-8">
        <h3 className="font-semibold text-3xl mb-3">
          Why might you need it?
        </h3>
        <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
        <p className="text-lg">🔹 Your patio gets too much sun, making it uncomfortable during peak hours.</p>
        <p className="text-lg">🔹 You want an outdoor space that feels like a natural extension of your home.</p>
        <p className="text-lg">🔹 You're looking for an aesthetic and functional solution without taking up too much space.</p>
      </div>
      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Seamless integration"
          text="Attaches to your home’s structure, creating a cozy space without disrupting the design."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/02.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Protection & comfort"
          text="Shields you from the sun and rain, allowing year-round outdoor enjoyment."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/03.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Energy efficiency"
          text="Reduces sun exposure on windows and doors, keeping your home cooler."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/05.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Fully customizable"
          text="A wide range of styles, materials, and finishes to match your taste."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/08.webp"
          imagePosition="left"
        />
        
        <ImgTxtSection
          title="Increases home value"
          text="Well-designed outdoor spaces boost property appeal and resale value."
          imageUrl="assets/images/Products/Patios&Pergolas/Attached/13.webp"
          imagePosition="right"
        />
      </div>
      <WhyUsLink />
    </section>
  );
};

export default Attached;
