import { Helmet } from "react-helmet-async";

import BlockSection from "../../components/BlockSection";
import SectionBlock from "../../components/SectionBlock";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImageTextSection from "../../components/ImgTxtSection";
import Services from "./services/services";

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "pergola",
  "outdoor living",
  "covered patio covers",
  "patio cover cover",
  "patios and pergolas",
  "pergola in patio",
  "pergola patio",
  "pergola with patio",
  "outdoor pergolas",
  "outdoor patio",
  "patio shade",
  "outdoor shade",
  "pergola for roof",
  "pergola roofing",
  "roof of pergola",
  "backyard patio",
  "patio designs",
  "covered patio",
  "patio roofing",
  "patio with roof",
  "backyard pergola",
  "covered pergolas",
  "pergola and cover",
  "pergola in the backyard",
  "pergolas houston",
  "pergolas houston tx",
  "aluminium covered patio",
  "aluminum covered patio",
  "aluminum patio cover materials",
  "aluminum pergolas",
  "cover your pergola",
  "outdoor sun shade",
  "backyard shade",
  "cover outdoor patio",
  "houston patio",
  "outdoor living spaces",
  "outdoor patio covers",
  "patio cover outdoor",
  "patio shade covers",
  "metal patio covers",
  "patio construction",
  "aluminum carport",
  "modern pergolas",
  "pergola and shade",
  "shade pergola",
  "backyard cover patio",
  "covered patio backyard",
  "patio cover backyard",
  "patio extension",
  "porch cover",
  "pergola co",
  "pergola roofing panels",
  "aluminum awning",
  "custom pergolas",
  "customizable pergola",
  "pergola price",
  "polycarbonate roofing for pergola",
  "small pergola",
  "cover my pergola",
  "pergola connected to roof",
  "pergola with privacy wall",
  "patio cover and pergola",
  "patio covered pergola",
  "pergola roof cover",
  "prefab pergola",
  "prefabricated pergolas",
  "aluminum patio roof",
  "install pergola",
  "insulated aluminum roof panels",
  "outdoor pergola with roof",
  "pergola materials",
  "pergola rain cover",
  "pergola connected to house",
  "pergola over patio",
  "polycarbonate sheets for pergola",
  "structure pergolas",
  "backyard patio pergola",
  "house pergola",
  "outdoor patio pergola",
  "patio pergola with roof",
  "pergola sizes",
  "weatherproof pergolas",
  "aluminium gazebo",
  "aluminum pergola with canopy",
  "backyard pergola designs",
  "backyard pergola with roof",
  "contemporary pergolas",
  "custom aluminum pergola",
  "modern aluminium pergola",
  "modern aluminum pergola",
  "aluminum pergola shade",
  "aluminum roofing panels for patio",
  "backyard covered pergola",
  "commercial pergolas",
  "custom size pergola",
  "long pergola",
  "mirador aluminum pergola",
  "pergola aluminum roof",
  "aluminium garden pagoda",
  "aluminium patio",
  "aluminium pergola roof",
  "aluminium pergola sale",
  "aluminium pergola with roof",
  "aluminium roof pergola",
  "aluminum covered pergola",
  "aluminum garden pergola",
  "aluminum modern pergola",
  "aluminum patio pergola",
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 30; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva el orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

// Datos
const sectionsData3 = [
  {
    id: 6,
    title: "Custom Outdoor Living Spaces",
    description:
      "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage:
      "assets/images/Products/Patios&Pergolas/Attached/04.webp",
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
        <title>Expert Outdoor Living Design & Construction | New Gen Patio</title>
        <meta
          name="description"
          content="Discover premier design & construction for outdoor living. Durable, elegant spaces are created by expert builders. 100% custom aluminum pergolas, covered patios, and outdoor kitchens are created. Explore our designs!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/outdoor-living-services"
        />
      </Helmet>

      <main className="flex flex-col justify-center items-center mb-10">
        <BlockSection />
        <SectionBlock sections={sectionsData3} />
        <MarqueeBanner />
        <Services />
        <section className="w-full max-w-5xl px-4 pb-8 text-center">
          <h2 className="text-3xl font-bold text-black/90 mb-4">
            Why do I need to take advantage of the outdoor spaces in my home?
          </h2>
          <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto"></div>
          <p className="text-xl">
            Maximizing your outdoor spaces isn’t just about aesthetics—it’s
            about extending your lifestyle. When you invest in your backyard,
            patio, or outdoor kitchen, you're creating a{" "}
            <strong>
              functional living area that increases your home’s value, comfort,
              and versatility.
            </strong>
          </p>
          <p className="text-xl">
            Here are four strong reasons why taking full advantage of your
            outdoor space is a smart decision:
          </p>
        </section>
        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Benefits
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>
        {sections.map((section, index) => (
          <ImageTextSection key={index} {...section} />
        ))}
      </main>
    </>
  );
};

export default ServicesMain;
