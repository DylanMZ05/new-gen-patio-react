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
    title: "Custom outdoor living spaces, Pergola and Cover Patio",
    description: "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sections = [
  {
    title: "Custom & Exclusive Design",
    text: "Every project is uniquely tailored to your needs, style, and space. We don't offer generic solutions. We create personalized designs that reflect your personality and maximize your patio’s functionality.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    imagePosition: "right" as const,
  },
  {
    title: "High-Quality & Durable Materials",
    text: "We use premium materials that ensure weather resistance, low maintenance, and a flawless appearance for years to come. Investing in quality means enjoying your outdoor space worry-free.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Expertise & Professionalism Guaranteed",
    text: "Our team of specialists transforms patios with meticulous attention to detail. From design to installation, we ensure the final result exceeds your expectations.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Increased Property Value",
    text: "A well-designed outdoor space not only enhances your lifestyle but also boosts your home’s value. It’s a smart investment that improves both the aesthetics and functionality of your property.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Stress-Free Experience: We Handle Everything",
    text: "From planning to construction, we manage every aspect of the project so you can simply enjoy the process. We commit to meeting deadlines, providing a transparent service, and delivering exactly what you envisioned.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    imagePosition: "right" as const,
  },
];

const PatiosAndPergolasHome = () => {
  return (
    <>
      <Helmet>
        <title>Custom Outdoor Living Solution | New Gen Patio</title>
        <meta
          name="description"
          content="Explore modern pergolas and covered patio solutions in Houston. Custom-designed for comfort, elegance, and long-lasting outdoor living spaces."
        />
      </Helmet>

      <main className="flex flex-col justify-center items-center mb-10">
        <BlockSection />
        <SectionBlock sections={sectionsData3} />
        <MarqueeBanner />
        <PatiosAndPergolasCard />
        {sections.map((section, index) => (
          <ImageTextSection key={index} {...section} />
        ))}
      </main>
    </>
  );
};

export default PatiosAndPergolasHome;
