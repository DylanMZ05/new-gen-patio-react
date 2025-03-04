import React from "react";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";

const sectionsData = [
  {
    id: 1,
    title: "Concrete & Turf",
    description: "Breve descripción de Concrete & Turf",
    backgroundImage: "assets/images/Products/AdditionalServices/Landscaping/05.webp",
  },
];

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

      <div className="flex flex-col my-10 gap-10">
        <ImgTxtSection
          title="Visualizing Your Project"
          text="Making your vision crystal clear before we even start is essential for us..."
          imageUrl="assets/images/Attached24.jpg"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Built to Last with $0 cost of Maintenance"
          text="Our aluminum structures are designed to endure the harshest conditions..."
          imageUrl="assets/images/Free3.jpg"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Visualizing Your Project"
          text="Making your vision crystal clear before we even start is essential for us..."
          imageUrl="assets/images/Attached24.jpg"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Built to Last with $0 cost of Maintenance"
          text="Our aluminum structures are designed to endure the harshest conditions..."
          imageUrl="assets/images/Free3.jpg"
          imagePosition="left"
        />
      </div>
    </section>
  );
};

export default ConcreteTurf;
