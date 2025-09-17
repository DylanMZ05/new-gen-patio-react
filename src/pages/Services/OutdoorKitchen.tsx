import React from "react";
import { Helmet } from "react-helmet-async";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import OutdorKitchenCard from "../Home/services/OutdoorKitchenCards";
import FreeQuoteButton from "../../components/FreeQuoteButton";

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "outdoor kitchen",
  "backyard kitchen",
  "kitchen backyard",
  "modular outdoor kitchen",
  "outdoor kitchen designs",
  "outdoor kitchen grill",
  "outdoor kitchen island",
  "prefabricated outdoor kitchen",
  "outdoor kitchens near me",
  "outdoor counters",
  "outdoor kitchen contractors near me",
  "outdoor barbecue kitchen",
  "outdoor bbq kitchen",
  "outdoor kitchen cost",
  "outdoor kitchen prices",
  "outdoor patio kitchen",
  "patio kitchen",
  "outdoor cabinets for patio",
  "outdoor kitchen and bar",
  "outdoor kitchen bar",
  "outdoor kitchen pergolas",
  "small outdoor kitchen",
  "tiny outdoor kitchen",
  "custom outdoor kitchen",
  "covered outdoor kitchen",
  "backyard outdoor kitchen",
  "outdoor kitchen and fireplace",
  "outdoor kitchen contractors",
  "custom outdoor kitchen",
  "outdoor kitchen and pool",
  "outdoor kitchen builders near me",
  "outdoor island",
  "outdoor kitchen builders",
  "luxury outdoor kitchen",
  "outdoor kitchens for sale",
  "outdoor kitchen covered patio",
  "outdoor covered kitchen",
  "custom outdoor kitchens near me",
  "covered outdoor kitchen structures",
  "covered outdoor kitchen with fireplace",
  "exterior kitchen",
  "outdoor kitchen designers",
  "outdoor kitchen remodel",
  "freestanding outdoor kitchen",
  "outdoor kitchen area",
  "outdoor kitchen construction",
  "outdoor kitchen island with seating",
  "outdoor kitchen with fire pit",
  "covered outdoor kitchen attached to house",
  "outdoor kitchen companies near me",
  "outdoor kitchen white",
  "outdoor mexican kitchen",
  "spanish style outdoor kitchen",
  "outdoor kitchen and covered patio",
  "outdoor kitchen enclosed patio",
  "outdoor kitchen patio cover",
  "outdoor kitchen pro",
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 40; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva el orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

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
        <title>Custom Outdoor Kitchen Builders in Houston, TX | New Gen Patio</title>
        <meta
          name="description"
          content="Become the ultimate host with a custom outdoor kitchen in Houston. Luxurious, functional backyard kitchens perfect for entertaining are built by us. Design yours today!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
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
