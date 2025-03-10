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
    title: "Artificial turf, Concrete and Landscaping",
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
          <p className="text-lg">🔹 You want a fully functional outdoor space to enjoy year-round.</p>
          <p className="text-lg">🔹 You're looking for a low-maintenance and visually appealing backyard solution.</p>
          <p className="text-lg">🔹 You want a complete design that blends hardscapes, greenery, and outdoor cooking areas.</p>
      </div>
      <div className="flex flex-col my-5 gap-10">
        <div className="pt-8 px-5 flex flex-col items-center">
          <h3 className="font-semibold text-4xl">
            Benefits of Artificial Turf
          </h3>
          <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 rounded-full"></div>
        </div>
        <ImgTxtSection
          title="Efficient Drainage System"
          text="High-quality artificial turf features a vertical drainage system with perforations every 4 inches, ensuring rapid water flow and preventing puddles or moisture buildup."
          imageUrl="assets/images/Products/AdditionalServices/ArtificialGrass/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Lower Surface Temperature"
          text="Advanced artificial turf models incorporate CoolTurf technology, which reflects sunlight and reduces surface temperature by up to 15°F, compared to traditional synthetic grass."
          imageUrl="assets/images/Products/AdditionalServices/ArtificialGrass/02.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Chemical-Free and Pet-Friendly"
          text="Unlike natural grass, artificial turf requires no pesticides or fertilizers, making it safer for children and pets. Additionally, its non-organic composition prevents the growth of pests such as ants and ticks."
          imageUrl="assets/images/Products/AdditionalServices/ArtificialGrass/05.webp"
          imagePosition="right"
        />
        
        <ImgTxtSection
          title="Even Surface with Minimal Maintenance"
          text="Constructed with polyethylene backing and high-density synthetic fibers, the turf maintains a pristine appearance without requiring mowing, watering, or reseeding."
          imageUrl="assets/images/Products/AdditionalServices/ArtificialGrass/04.webp"
          imagePosition="left"
        />
      </div>
      <div className="flex flex-col mb-5 gap-10">
        <div className="pt-8 px-5 flex flex-col items-center">
          <h3 className="font-semibold text-4xl">
            Benefits of Concrete and Landscaping
          </h3>
          <div className="ml-1 w-15 h-[3px] bg-[#0d4754] mt-3 rounded-full"></div>
        </div>
        <ImgTxtSection
          title="Crack Resistant Concrete with Reinforced Additives"
          text="Concrete mixes reinforced with glass fiber and waterproofing additives are used to minimize cracking and enhance durability against temperature fluctuations and impact stress."
          imageUrl="assets/images/Products/AdditionalServices/Concrete/01.webp"
          imagePosition="right"
        />

        <ImgTxtSection
          title="Integrated Drainage Design"
          text="To prevent water accumulation, hidden slopes and drainage channels are incorporated into the design, extending the lifespan of concrete surfaces and protecting adjacent landscaping."
          imageUrl="assets/images/Products/AdditionalServices/Concrete/02.webp"
          imagePosition="left"
        />

        <ImgTxtSection
          title="Customizable Textured Finishes and Colors"
          text="Stamped or polished concrete techniques allow the replication of wood, natural stone, or brick textures while maintaining the strength of concrete. This provides greater versatility in outdoor designs."
          imageUrl="assets/images/Products/AdditionalServices/Landscaping/02.webp"
          imagePosition="right"
        />
        
        <ImgTxtSection
          title="Compatibility with Built-In Lighting Systems"
          text="Embedded low-energy LED lighting can be integrated into the pavement, improving nighttime visibility and enhancing outdoor aesthetics."
          imageUrl="assets/images/Products/AdditionalServices/Landscaping/05.webp"
          imagePosition="left"
        />
      </div>
      <WhyUsLink backgroundImage={backgroundImage} />
      <Services />
    </section>
  );
};

export default ConcreteTurf;
