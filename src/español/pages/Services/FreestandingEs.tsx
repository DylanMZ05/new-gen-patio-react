import React from "react";
import { Helmet } from "react-helmet-async";
import SliderEs from "../../components/Slider/Slider";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs";
import ServicesEs from "../Home/services/ServicesEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import ClientsEs from "../Home/ClientsEs";

// --- Keywords adaptadas al español para Houston (Independientes/Freestanding) ---
const KEYWORDS_RAW = [
  "pérgola independiente de aluminio",
  "techo para patio independiente",
  "pérgola autónoma houston",
  "cubierta de patio no adosada",
  "pérgola de metal independiente",
  "patios techados separados de la casa",
  "cenadores de aluminio modernos",
  "pérgola para jardín o piscina",
  "pérgola de aluminio personalizada",
  "estructuras de sombra independientes",
  "pérgola moderna de aluminio",
  "techos para terrazas independientes",
  "instalación de pérgolas en houston",
];

const MAX_KW = 50;
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Pérgola de Aluminio Independiente y Patio Techado",
    description:
      "Una pérgola autónoma que se puede colocar en cualquier lugar de su jardín, ofreciendo un espacio versátil y personalizable para la relajación, el entretenimiento o la sombra.",
    backgroundImage: "../assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
  },
];

const backgroundImage = "../assets/images/Products/Patios&Pergolas/Freestanding/06.webp";

const imagePaths = Array.from({ length: 21 }, (_, i) =>
  `../assets/images/Products/Patios&Pergolas/Freestanding/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const FreestandingEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pérgolas de Aluminio Independientes y Techos para Patio | New Gen Patio</title>
        <meta
          name="description"
          content="Cree un punto focal impresionante con una pérgola de aluminio independiente. Versátil, duradera y diseñada a medida para el estilo de vida en Houston. ¡Llámenos hoy!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/free-standing-aluminium-pergola-covered-patio/es"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="freestanding-heading"
      >
        <SectionBlockEs sections={sectionsData} />
        <SliderEs images={validImages} withBorderT />
        <MarqueeBannerEs />

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            ¿Por qué podría necesitarla?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Desea un área de entretenimiento con sombra en medio de su jardín o junto a la piscina.</li>
            <li>Busca definir un espacio exterior sin necesidad de construir paredes o estructuras pesadas.</li>
            <li>Necesita un refugio con sombra que no dependa de la estructura de su casa.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Beneficios</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Independencia Estructural Total",
              text: "A diferencia de las pérgolas adosadas, las estructuras independientes son totalmente autoportantes y no dependen de edificios existentes. Se utiliza una base de concreto reforzado o anclajes profundos en suelo compactado para garantizar la estabilidad estructural total.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Freestanding/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Máxima Flexibilidad de Diseño y Personalización",
              text: "Se pueden incorporar características adicionales como iluminación LED integrada, ventiladores de techo, paneles de privacidad y sistemas de calefacción exterior sin afectar la residencia principal. Varios perfiles de aluminio (postes de 6x6 u 8x8, vigas de 2x8 o 2x10) permiten personalizar la estructura según sus requisitos estéticos.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Freestanding/03.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Áreas de Entretenimiento Definidas",
              text: "Las estructuras independientes ayudan a crear zonas exteriores distintas para descansar, cenar o cocinar. Se pueden añadir elementos arquitectónicos como pantallas de privacidad de aluminio o paneles de persiana para mejorar la intimidad manteniendo el flujo de aire.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Freestanding/06.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptabilidad a Superficies Irregulares",
              text: "Estas estructuras pueden instalarse sobre césped, grava o concreto gracias a sistemas de cimentación adaptables. Para suelos blandos, se utilizan bases de concreto reforzado con pernos de anclaje, mientras que en superficies niveladas, las placas de montaje con conexiones atornilladas proporcionan una fijación segura.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Freestanding/09.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSectionEs key={index} {...section} />
          ))}
        </div>

        <WhyUsLinkEs backgroundImage={backgroundImage} />
        <ServicesEs showQuoteButton={false} />
        <div className="w-screen">
          <ClientsEs />
        </div>
        <FreeQuoteButtonEs questionText="¿Tiene un proyecto en mente?" buttonText="Hablemos" />
      </section>
    </>
  );
};

export default FreestandingEs;