import { Helmet } from "react-helmet";

import BlockSection from "../../components/BlockSection";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import PatiosAndPergolasCard from "./services/PatioAndPergolasCard";
import ImageTextSection from "../../components/ImgTxtSection";

// Datos
const sectionsData3 = [
  {
    id: 6,
    title: "Aluminium Custom Pergola and Cover Patios",
    description: "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sections = [
  {
    title: "Stress-Free Experience: We Handle Everything",
    text: "From planning to construction, we manage every aspect of the project so you can simply enjoy the process. We commit to meeting deadlines, providing a transparent service, and delivering exactly what you envisioned.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/07.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Built with High-Grade Structural Aluminum",
    text: "We use aluminum engineered to withstand up to 120 mph winds, resistant to rust, corrosion, and pests—perfect for Houston’s demanding climate.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/14.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Custom Design for Your Space and Style",
    text: "Each patio cover is made to measure, adapting to your home’s dimensions and design preferences. We offer options like attached, freestanding, or cantilevered models, all customizable in color and finish.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Roofing Panels with Insulated Core",
    text: "Our insulated roofing panels reduce heat and noise, making your patio cooler and more comfortable even during peak summer.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/16.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Smart Integration of Lighting and Fans",
    text: "Electrical systems are professionally installed to power ceiling fans, recessed lights, outlets, and more—everything concealed and securely connected for a clean, modern finish.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/17.webp",
    imagePosition: "right" as const,
  },
];


const PatiosAndPergolasHome = () => {
  return (
    <>
      <Helmet>
        <title>Aluminium Cover Patios and Pergolas in Texas | New Gen Patio</title>
        <meta
          name="description"
          content="Explore modern pergolas and covered patio solutions in Houston. Custom-designed for comfort, elegance, and long-lasting outdoor living spaces."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/aluminium-custom-pergola-cover-patio" />
      </Helmet>

      <main className="flex flex-col justify-center items-center mb-10">
        <BlockSection />
        <SectionBlock sections={sectionsData3} />
        <MarqueeBanner />
        <PatiosAndPergolasCard />
        <div className="px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">Why might you need it?</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <h3 className="font-semibold text-lg text-center">Adding a patio cover to your outdoor space isn’t just a design choice—it’s an upgrade in comfort, protection, and year-round usability.</h3>
          <ul className="list-disc pl-6 text-lg">
            <li>Your patio gets too much sun, making it uncomfortable during peak hours.</li>
            <li>You want an outdoor space that feels like a natural extension of your home.</li>
            <li>You're looking for an aesthetic and functional solution without taking up too much space.</li>
          </ul>
        </div>
        {sections.map((section, index) => (
          <ImageTextSection key={index} {...section} />
        ))}
      </main>
    </>
  );
};

export default PatiosAndPergolasHome;
