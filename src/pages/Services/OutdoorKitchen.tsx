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
    title: "Outdoor Kitchen",
    description: "A fully equipped outdoor kitchen designed to bring convenience and style to your backyard, allowing you to cook, entertain, and dine in an open-air setting.",
    backgroundImage: "assets/images/Products/OutdoorKitchen/Modern/03.webp",
  },
];

const backgroundImage = "assets/images/Products/OutdoorKitchen/Traditional/07.webp";

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
      <div className="pt-8 px-5">
        <h3 className="font-semibold text-3xl mb-3">
            Why might you need it?
          </h3>
          <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
            <p className="text-lg">🔹 You love hosting gatherings and want a dedicated space for outdoor cooking and dining.</p>
            <p className="text-lg">🔹 You want to enhance your backyard with a functional and stylish entertainment area.</p>
            <p className="text-lg">🔹 You’re looking for a weather-resistant cooking setup that eliminates the need to go indoors.</p>
      </div>
      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Seamless entertainment"
          text="Cook and socialize without leaving your guests, making every gathering more enjoyable."
          imageUrl="assets/images/Products/OutdoorKitchen/Modern/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Durable & weather-resistant"
          text="Built with high-quality materials that withstand sun, rain, and wear over time."
          imageUrl="assets/images/Products/OutdoorKitchen/Modern/02.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Customizable design"
          text="Options for built-in grills, countertops, storage, and seating to match your space and needs."
          imageUrl="assets/images/Products/OutdoorKitchen/Traditional/03.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Adds value to your home"
          text="A well-designed outdoor kitchen increases property appeal and functionality."
          imageUrl="assets/images/Products/OutdoorKitchen/Traditional/06.webp"
          imagePosition="left"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default OutdoorKitchen;
