import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";
import { Helmet } from "react-helmet-async";
import Clients from "../Home/Clients";

import FreeQuoteButton from "../../components/FreeQuoteButton";

const sectionsData = [
  {
    id: 1,
    title: "Concrete and Turf Installation – Low Maintenance Landscaping",
    description:
      "A perfect combination of decorative concrete and artificial turf, offering a stylish, durable, and low-maintenance solution for outdoor spaces.",
    backgroundImage: "assets/images/Products/AdditionalServices/Landscaping/05.webp",
  },
];

const backgroundImage = "assets/images/Products/AdditionalServices/Landscaping/03.webp";

const generateImagePaths = (path: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${path}/${(i + 1).toString().padStart(2, "0")}.webp`);

const imagesArtificialGrass = generateImagePaths("assets/images/Products/AdditionalServices/ArtificialGrass", 8);
const imagesLandscaping = generateImagePaths("assets/images/Products/AdditionalServices/Landscaping", 6);
const imagesConcrete = generateImagePaths("assets/images/Products/AdditionalServices/Concrete", 9);

const ConcreteTurf: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="concrete-turf-heading">
      <Helmet>
        <title>Landscaping, Concrete & Artificial Turf Services | New Gen Patio</title>
        <meta
          name="description"
          content="The vision for your Houston home is completed with our additional expert services. Professional landscaping, custom concrete work, and premium artificial turf installation are offered to perfect your outdoor oasis."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/concrete-and-artificial-turf" />
      </Helmet>

      <SectionBlock sections={sectionsData} />
      <MarqueeBanner />

      {[
        { title: "Landscaping", images: imagesLandscaping },
        { title: "Concrete", images: imagesConcrete },
        { title: "Artificial Turf", images: imagesArtificialGrass },
      ].map((section, index) => (
        <div key={index} className="w-full">
          <h2 className="text-4xl font-semibold my-5 text-center">{section.title}</h2>
          <Slider images={section.images} withBorderT withBorderB />
        </div>
      ))}

      <MarqueeBanner />

      <div className="pt-8 px-5 max-w-3xl">
        <h2 className="font-semibold text-3xl mb-3 text-center">Why might you need it?</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
        <ul className="list-disc pl-6 text-lg">
          <li>You want a fully functional outdoor space to enjoy year-round.</li>
          <li>You're looking for a low-maintenance and visually appealing backyard solution.</li>
          <li>You want a complete design that blends hardscapes, greenery, and outdoor cooking areas.</li>
        </ul>
      </div>

      {/* Beneficios de Concrete y Landscaping */}
      <div className="flex flex-col my-10 gap-10 items-center">
        <h2 className="font-semibold text-4xl text-center">Benefits of Concrete & Landscaping</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] rounded-full"></div>

        {[
          {
            title: "Efficient Drainage System",
            text: "High-quality artificial turf features a vertical drainage system with perforations every 4 inches, ensuring rapid water flow and preventing puddles or moisture buildup.",
            imageUrl: "assets/images/Products/AdditionalServices/Landscaping/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Lower Surface Temperature",
            text: "Advanced artificial turf models incorporate CoolTurf technology, which reflects sunlight and reduces surface temperature by up to 15°F, compared to traditional synthetic grass.",
            imageUrl: "assets/images/Products/AdditionalServices/Landscaping/04.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Chemical-Free and Pet-Friendly",
            text: "Unlike natural grass, artificial turf requires no pesticides or fertilizers, making it safer for children and pets. Additionally, its non-organic composition prevents the growth of pests such as ants and ticks.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/03.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Even Surface with Minimal Maintenance",
            text: "Constructed with polyethylene backing and high-density synthetic fibers, the turf maintains a pristine appearance without requiring mowing, watering, or reseeding.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/04.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Crack-Resistant Concrete with Reinforced Additives",
            text: "Concrete mixes reinforced with glass fiber and waterproofing additives are used to minimize cracking and enhance durability against temperature fluctuations and impact stress.",
            imageUrl: "assets/images/Products/AdditionalServices/Concrete/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Integrated Drainage Design",
            text: "To prevent water accumulation, hidden slopes and drainage channels are incorporated into the design, extending the lifespan of concrete surfaces and protecting adjacent landscaping.",
            imageUrl: "assets/images/Products/AdditionalServices/Concrete/02.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Customizable Textured Finishes & Colors",
            text: "Stamped or polished concrete techniques allow the replication of wood, natural stone, or brick textures while maintaining the strength of concrete. This provides greater versatility in outdoor designs.",
            imageUrl: "assets/images/Products/AdditionalServices/Landscaping/02.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Compatibility with Built-In Lighting Systems",
            text: "Embedded low-energy LED lighting can be integrated into the pavement, improving nighttime visibility and enhancing outdoor aesthetics.",
            imageUrl: "assets/images/Products/AdditionalServices/Landscaping/05.webp",
            imagePosition: "left" as const,
          },
        ].map((section, index) => (
          <ImgTxtSection key={index} {...section} />
        ))}

        <FreeQuoteButton questionText="Got a project in mind?" buttonText="Let’s Talk" />
      </div>

      <MarqueeBanner />

      {/* Beneficios de Artificial Turf */}
      <div className="flex flex-col my-10 gap-10 items-center">
        <h2 className="font-semibold text-4xl text-center">Benefits of Artificial Turf</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] rounded-full"></div>

        {[
          {
            title: "Efficient Drainage System",
            text: "High-quality artificial turf features a vertical drainage system with perforations every 4 inches, ensuring rapid water flow and preventing puddles or moisture buildup.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Lower Surface Temperature",
            text: "Advanced artificial turf models incorporate CoolTurf technology, which reflects sunlight and reduces surface temperature by up to 15°F, compared to traditional synthetic grass.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/02.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Chemical-Free & Pet-Friendly",
            text: "Unlike natural grass, artificial turf requires no pesticides or fertilizers, making it safer for children and pets. Additionally, its non-organic composition prevents the growth of pests such as ants and ticks.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/05.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Even Surface with Minimal Maintenance",
            text: "Constructed with polyethylene backing and high-density synthetic fibers, the turf maintains a pristine appearance without requiring mowing, watering, or reseeding.",
            imageUrl: "assets/images/Products/AdditionalServices/ArtificialGrass/04.webp",
            imagePosition: "left" as const,
          },
        ].map((section, index) => (
          <ImgTxtSection key={index} {...section} />
        ))}

        <FreeQuoteButton
          questionText="We’d love to hear about your ideas!"
          buttonText="Tell Us Your Vision"
        />
      </div>

      <WhyUsLink backgroundImage={backgroundImage} />
              <Services showQuoteButton={false} />
        <div className="w-screen">
          <Clients></Clients>  
        </div>
      <MarqueeBanner />
    </section>
  );
};

export default ConcreteTurf;
