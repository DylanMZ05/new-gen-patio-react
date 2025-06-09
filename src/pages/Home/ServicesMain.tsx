import { Helmet } from "react-helmet";

import BlockSection from "../../components/BlockSection";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImageTextSection from "../../components/ImgTxtSection";
import Services from "./services/services";

// Datos
const sectionsData3 = [
  {
    id: 6,
    title: "Custom Outdoor Living Spaces",
    description: "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sections = [
  {
    title: " 1. Expands Your Living Area Without Major Construction",
    text: "By transforming your outdoor space, you gain an entirely new area to cook, dine, relax, and entertain—without the cost or disruption of an interior renovation.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    imagePosition: "right" as const,
  },
  {
    title: "2. Enhances Quality of Life",
    text: "Spending time outdoors has been proven to reduce stress, improve mood, and strengthen relationships. A well-designed outdoor space encourages family time, social gatherings, and peaceful moments in nature.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    imagePosition: "left" as const,
  },
  {
    title: "3. Boosts Property Value and Curb Appeal",
    text: "Outdoor upgrades such as pergolas, kitchens, or landscaped patios are highly attractive to buyers. They are considered premium features that increase market value and make your home stand out.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "4. Adapts to All Seasons and Activities",
    text: "With proper design and materials, your outdoor space can be used year-round for cooking, relaxing, or hosting events—turning it into one of the most versatile parts of your home.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    imagePosition: "left" as const,
  },
  {
    title: "5. High-Quality & Durable Materials",
    text: "We use premium materials that ensure weather resistance, low maintenance, and a flawless appearance for years to come. Investing in quality means enjoying your outdoor space worry-free.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    imagePosition: "right" as const,
  },
  {
    title: "6. Expertise & Professionalism Guaranteed",
    text: "Our team of specialists transforms patios with meticulous attention to detail. From design to installation, we ensure the final result exceeds your expectations.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/20.webp",
    imagePosition: "left" as const,
  },
];

const ServicesMain = () => {
  return (
    <>
      <Helmet>
        <title>Custom Outdoor Living Spaces | New Gen Patio</title>
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
        <Services />
        <section className="w-full max-w-5xl px-4 pb-8 text-center">
          <h3 className="text-3xl font-bold text-black/90 mb-4">Why do I need to take advantage of the outdoor spaces in my home?</h3>
          <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
          <p className="text-xl">Maximizing your outdoor spaces isn’t just about aesthetics—it’s about extending your lifestyle. When you invest in your backyard, patio, or outdo``or kitchen, you're creating a <strong>functional living area that increases your home’s value, comfort, and versatility.</strong></p>
          <p className="text-xl">Here are four strong reasons why taking full advantage of your outdoor space is a smart decision:</p>
        </section>
        {sections.map((section, index) => (
          <ImageTextSection key={index} {...section} />
        ))}
      </main>
    </>
  );
};

export default ServicesMain;
