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
    title: "Freestanding Covered Patio",
    description: "A standalone pergola that can be placed anywhere in your backyard, offering a versatile and customizable space for relaxation, entertainment, or shade.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Freestanding/06.webp";

const Freestanding: React.FC = () => {
  const images = [
    "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/02.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/03.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/04.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/05.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/06.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/07.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/08.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/09.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/10.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/11.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/12.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/13.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/14.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/15.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/16.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/17.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/18.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/19.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/20.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/21.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/22.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/23.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/24.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/25.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/26.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/27.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/28.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/29.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/30.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/31.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/32.webp",
    "assets/images/Products/Patios&Pergolas/Freestanding/33.webp",
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
          <p className="text-lg">🔹 You want a shaded entertainment area in the middle of your garden or by the pool.</p>
          <p className="text-lg">🔹 You're looking to define a space without building walls or heavy structures.</p>
          <p className="text-lg">🔹 You need a shaded retreat that doesn’t rely on your home’s structure.</p>
      </div>
      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Complete Structural Independence"
          text="Unlike attached pergolas, freestanding structures are fully self-supporting and do not rely on existing buildings for support. A reinforced concrete base or deep-set anchors in compacted soil is used to ensure structural stability."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Enhanced Design Flexibility and Customization "
          text="Additional features such as built-in LED lighting, ceiling fans, privacy panels, and outdoor heating systems can be incorporated without affecting the main residence. Various aluminum profiles (6x6 or 8x8 posts, 2x8 or 2x10 beams) allow the structure to be customized to meet aesthetic and functional requirements."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/03.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Defined Outdoor Entertainment Areas"
          text="Freestanding structures help create distinct outdoor zones for lounging, dining, or grilling. Architectural elements such as aluminum privacy screens or louvered panels can be added to improve privacy while maintaining airflow"
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/06.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Adaptability to Uneven Surfaces"
          text="These structures can be installed on grass, gravel, or concrete due to adaptable foundation systems. For soft ground, reinforced concrete bases with anchor bolts are used, while on level surfaces, mounting plates with bolted connections provide secure attachment."
          imageUrl="assets/images/Products/Patios&Pergolas/Freestanding/09.webp"
          imagePosition="left"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default Freestanding;
