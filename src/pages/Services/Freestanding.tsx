import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBanner";
import ImgTxtSection from "../../components/ImgTxtSection";
import SectionBlock from "../../components/SectionBlock";
import WhyUsLink from "./components/WhyUsLink";
import Services from "../Home/services/services";
import FreeQuoteButton from "../../components/FreeQuoteButton";

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "covered free standing patio",
  "free standing patio cover",
  "freestanding pergola",
  "freestanding patio cover",
  "free standing pergola",
  "free standing detached covered patio",
  "free standing pergola with polycarbonate roof",
  "free standing pergola with roof",
  "patio cover not attached to house",
  "covered freestanding patio",
  "freestanding aluminium pergola",
  "freestanding aluminum patio cover",
  "freestanding aluminum pergola",
  "freestanding covered pergola",
  "freestanding metal pergola",
  "freestanding patio roof",
  "freestanding pergola on deck",
  "freestanding pergola with roof",
  "metal freestanding pergola",
  "modern freestanding pergola",
  "small freestanding pergola",
  "free standing aluminum patio covers",
  "free standing covered patio",
  "free standing covered pergola",
  "free standing metal patio covers",
  "free standing metal pergola",
  "free standing patio cover next to house",
  "free standing patio pergola",
  "free standing patio roof",
  "free standing pergola on concrete patio",
  "free standing pergola on deck",
  "free standing porch cover",
  "free standing porch roof",
  "free standing shed roof patio cover",
  "metal free standing patio covers",
  "covered patio not attached to house",
  "covered porch not attached to house",
  "patio roof not attached to house",
  "porch roof not attached to house",
];

// --- Si son demasiadas, corta las últimas (solo si hace falta) ---
const MAX_KW = 50; // ajustá este número si querés más/menos keywords
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW)); // preserva el orden
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Freestanding Aluminium Pergola and Covered Patio",
    description:
      "A standalone pergola that can be placed anywhere in your backyard, offering a versatile and customizable space for relaxation, entertainment, or shade.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
  },
];

const backgroundImage = "assets/images/Products/Patios&Pergolas/Freestanding/06.webp";

const imagePaths = Array.from({ length: 21 }, (_, i) =>
  `assets/images/Products/Patios&Pergolas/Freestanding/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const Freestanding: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Freestanding Aluminum Pergolas & Patio Covers | New Gen Patio</title>
        <meta
          name="description"
          content="A stunning focal point is created with a freestanding aluminum pergola or patio cover. Versatile, durable, and custom-designed for Houston living. Call us today!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/free-standing-aluminium-pergola-covered-patio"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="freestanding-heading"
      >
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            Why might you need it?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg">
            <li>You want a shaded entertainment area in the middle of your garden or by the pool.</li>
            <li>You're looking to define a space without building walls or heavy structures.</li>
            <li>You need a shaded retreat that doesn’t rely on your home’s structure.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Benefits</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Complete Structural Independence",
              text: "Unlike attached pergolas, freestanding structures are fully self-supporting and do not rely on existing buildings for support. A reinforced concrete base or deep-set anchors in compacted soil is used to ensure structural stability.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Enhanced Design Flexibility & Customization",
              text: "Additional features such as built-in LED lighting, ceiling fans, privacy panels, and outdoor heating systems can be incorporated without affecting the main residence. Various aluminum profiles (6x6 or 8x8 posts, 2x8 or 2x10 beams) allow the structure to be customized to meet aesthetic and functional requirements.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/03.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Defined Outdoor Entertainment Areas",
              text: "Freestanding structures help create distinct outdoor zones for lounging, dining, or grilling. Architectural elements such as aluminum privacy screens or louvered panels can be added to improve privacy while maintaining airflow.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/06.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptability to Uneven Surfaces",
              text: "These structures can be installed on grass, gravel, or concrete due to adaptable foundation systems. For soft ground, reinforced concrete bases with anchor bolts are used, while on level surfaces, mounting plates with bolted connections provide secure attachment.",
              imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/09.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
        </div>

        <WhyUsLink backgroundImage={backgroundImage} />
        <Services showQuoteButton={false} />
        <FreeQuoteButton questionText="Got a project in mind?" buttonText="Let’s Talk" />
      </section>
    </>
  );
};

export default Freestanding;
