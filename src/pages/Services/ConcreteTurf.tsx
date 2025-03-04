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
    title: "Concrete & Turf",
    description: "A perfect combination of decorative concrete and artificial turf, offering a stylish, durable, and low-maintenance solution for outdoor spaces.",
    backgroundImage: "assets/images/Products/AdditionalServices/Landscaping/05.webp",
  },
];

const backgroundImage = "assets/images/Products/AdditionalServices/Landscaping/03.webp";

const ConcreteTurf: React.FC = () => {
  const imagesArtificialGrass = [
    "assets/images/Products/AdditionalServices/ArtificialGrass/01.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/02.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/03.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/04.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/05.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/06.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/07.webp",
    "assets/images/Products/AdditionalServices/ArtificialGrass/08.webp",
  ];

  const imagesLandscaping = [
    "assets/images/Products/AdditionalServices/Landscaping/01.webp",
    "assets/images/Products/AdditionalServices/Landscaping/02.webp",
    "assets/images/Products/AdditionalServices/Landscaping/03.webp",
    "assets/images/Products/AdditionalServices/Landscaping/04.webp",
    "assets/images/Products/AdditionalServices/Landscaping/05.webp",
    "assets/images/Products/AdditionalServices/Landscaping/06.webp",
  ];

  const imagesConcrete = [
    "assets/images/Products/AdditionalServices/Concrete/01.webp",
    "assets/images/Products/AdditionalServices/Concrete/02.webp",
    "assets/images/Products/AdditionalServices/Concrete/03.webp",
    "assets/images/Products/AdditionalServices/Concrete/04.webp",
    "assets/images/Products/AdditionalServices/Concrete/05.webp",
    "assets/images/Products/AdditionalServices/Concrete/06.webp",
    "assets/images/Products/AdditionalServices/Concrete/07.webp",
    "assets/images/Products/AdditionalServices/Concrete/08.webp",
    "assets/images/Products/AdditionalServices/Concrete/09.webp",
  ];

  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100">
      <SectionBlock sections={sectionsData} />
      <h2 className="text-4xl font-semibold my-5">Artificial Turf</h2>
      <Slider images={imagesArtificialGrass} withBorderT withBorderB/>
      <h2 className="text-4xl font-semibold my-5">Landscaping</h2>
      <Slider images={imagesLandscaping} withBorderT withBorderB/>
      <h2 className="text-4xl font-semibold my-5">Concrete</h2>
      <Slider images={imagesConcrete} withBorderT/>
      <MarqueeBanner />
      <div className="pt-8 px-5">
        <h3 className="font-semibold text-3xl mb-3">
          Why might you need it?
        </h3>
        <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <p className="text-lg">🔹 You want a low-maintenance outdoor space with a clean and polished look.</p>
          <p className="text-lg">🔹 You're looking for a durable and weather-resistant flooring solution for patios, driveways, or walkways.</p>
          <p className="text-lg">🔹 You need a lush, green lawn without the hassle of watering, mowing, or seasonal changes.</p>
      </div>
      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Effortless beauty"
          text="Artificial turf provides a lush, green look without watering or mowing."
          imageUrl="assets/images/Products/AdditionalServices/ArtificialGrass/05.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Strong & weather-resistant"
          text="Decorative concrete is built to last, requiring minimal upkeep."
          imageUrl="assets/images/Products/AdditionalServices/Landscaping/02.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Versatile designs"
          text="Mix textures, patterns, and colors for a unique and functional outdoor space."
          imageUrl="assets/images/Products/AdditionalServices/Concrete/04.webp"
          imagePosition="right"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default ConcreteTurf;
