import React from "react";
import { Helmet } from "react-helmet-async";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import OutdorKitchenCard from "../Home/services/OutdoorKitchenCards";
import FreeQuoteButton from "../../components/FreeQuoteButton";

const sectionsData = [
  {
    id: 1,
    title: "Custom Outdoor Kitchen",
    description:
      "A fully equipped outdoor kitchen designed to bring convenience and style to your backyard, allowing you to cook, entertain, and dine in an open-air setting.",
    backgroundImage: "assets/images/Products/OutdoorKitchen/Modern/10.webp",
  },
];

const backgroundImage = "assets/images/Products/OutdoorKitchen/Traditional/07.webp";

const OutdoorKitchen: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Outdoor Kitchen | New Gen Patio</title>
        <meta
          name="description"
          content="Transform your backyard with a custom outdoor kitchen in Houston. Built to last, designed for entertaining, and optimized for year-round use."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/custom-outdoor-kitchen" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="outdoor-kitchen-heading">
        <SectionBlock sections={sectionsData} />
        <MarqueeBanner />
        <OutdorKitchenCard showQuoteButton={false} />

        <div className="pt-8 px-5">
          <h2 className="font-semibold text-3xl mb-3 text-center">Why might you need it?</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>You love hosting gatherings and want a dedicated space for outdoor cooking and dining.</li>
            <li>You want to enhance your backyard with a functional and stylish entertainment area.</li>
            <li>You're looking for a weather-resistant cooking setup that eliminates the need to go indoors.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Benefits</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Weather-Resistant Materials",
              text: "Outdoor kitchens must withstand temperature fluctuations, humidity, and sun exposure. 304-grade stainless steel, granite or quartz countertops, and aluminum structures with anti-corrosion coatings are utilized to ensure maximum durability.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimized Ventilation Systems",
              text: "To prevent heat buildup and smoke accumulation, range hoods with exhaust ducts or strategically placed openings are integrated. This enhances airflow and ensures a comfortable cooking experience, even in covered areas.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Modern/02.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Functional Storage Solutions",
              text: "Cabinets are designed with sealed edges and airtight closures to prevent dust and insect intrusion. Additional features such as built-in refrigerators, standalone sinks with independent drainage, and modular shelving systems improve workspace efficiency.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Traditional/03.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptability to Various Fuel Types",
              text: "Outdoor kitchens can be configured for natural gas, propane, or wood-burning systems, allowing users to select the most convenient cooking method based on personal preferences and fuel availability.",
              imageUrl: "assets/images/Products/OutdoorKitchen/Traditional/06.webp",
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
      </section>
    </>
  );
};

export default OutdoorKitchen;
