import React from "react";
import { Helmet } from "react-helmet";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";
import FreeQuoteButton from "../../components/FreeQuoteButton";

const sectionsData = [
  {
    id: 1,
    title: "Modern Outdoor Kitchen",
    description: "Avant-garde design, smart materials, and integrated technology",
    backgroundImage: "assets/images/Products/OutdoorKitchen/Modern/10.webp",
  },
];

const backgroundImage = "assets/images/Products/OutdoorKitchen/Traditional/07.webp";

const generateImagePaths = (path: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${path}/${(i + 1).toString().padStart(2, "0")}.webp`);

const imagesModern = generateImagePaths("assets/images/Products/OutdoorKitchen/Modern", 18);

const OutdoorKitchenModern: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Modern Outdoor Kitchen | New Gen Patio</title>
        <meta
          name="description"
          content="Discover our modern outdoor kitchens in Houston—designed with smart materials, integrated technology, and sleek aesthetics for a premium cooking experience."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/modern-outdoor-kitchens-houston" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="outdoor-kitchen-heading">
        <SectionBlock sections={sectionsData} />
        <MarqueeBanner />

        {[{ title: "Modern Style", images: imagesModern }].map((section, index) => (
          <div key={index} className="w-full">
            <Slider images={section.images} withBorderB />
          </div>
        ))}

        <div className="pt-8 px-5">
          <h2 className="font-semibold text-3xl mb-3">Why should a Modern Outdoor Kitchen be considered?</h2>
          <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>Maximum advantage is taken by technology for outdoor cooking.</li>
            <li>A clean, tidy, and functional year-round space is gained.</li>
            <li>Ideally suited for contemporary design homes.</li>
            <li>Are outdoor solutions sought that do not require constant maintenance and appear outdated?</li>
          </ul>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-4xl text-center">Benefits</h2>
            <div className="w-16 h-[3px] bg-[#0d4754] rounded-full mt-4"></div>
          </div>

          {[
            {
              title: "Integrated Technology and Connectivity for a Superior Experience:",
              text: "Smart grills, efficient refrigeration, ambient LED lighting, and sound systems are integrated. This complete outfitting updates the outdoor culinary and entertainment experience, offering advanced control and comfort.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Avant-Garde Design with Smart Materials for Maximum Durability:",
              text: "High-density composite panels and quartz or granite countertops are used. These materials withstand Houston's humidity, heat, and UV rays, ensuring a pristine space with minimal maintenance and a lasting sophisticated aesthetic.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/02.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Architectural Integration that Enhances Contemporary Aesthetics:",
              text: "The design of straight lines, smooth finishes, and neutral colors harmonizes with current homes. Visual coherence between the interior and exterior is achieved, adding sophistication and increasing property value.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/26.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimized Functionality for Efficient and Safe Use:",
              text: "Modules allow for the precise integration of stainless steel appliances (304 grade), which are resistant and easy to clean. This is complemented by LED lighting and professional ventilation options for comfortable and safe use at any time.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/28.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}

          <FreeQuoteButton 
            questionText="Got a project in mind?"
            buttonText="Let’s Talk"
          />
        </div>

        <WhyUsLink backgroundImage={backgroundImage} />
        <Services showQuoteButton={false} />
      </section>
    </>
  );
};

export default OutdoorKitchenModern;
