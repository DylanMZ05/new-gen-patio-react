import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBannerEs";
import ImgTxtSection from "../../components/ImgTxtSectionEs";
import SectionBlock from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs"; // ✅ Importación actualizada
import ServicesEs from "../Home/services/ServicesEs"; // ✅ Importación actualizada
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs"; // ✅ Importación actualizada (asumiendo que existe o se creará)
import Clients from "../Home/ClientsEs";

// --- Keywords adaptadas al español (Relevancia para Houston y mercado hispano) ---
const KEYWORDS_RAW = [
  "patios techados unidos a la casa",
  "pergolas de aluminio houston",
  "techo para patio unido a casa",
  "pergola adosada a la pared",
  "cubiertas para patio modernas",
  "pergolas de aluminio duraderas",
  "construccion de patios exteriores",
  "techos para terrazas houston",
  "pergolas con techo insolado",
  "ampliacion de espacios exteriores",
  "remodelacion de patios houston",
  "pergola de metal para casa",
  "cubierta de patio resistente al viento",
  "diseño de patios 3D houston",
  "instalacion de pergolas profesionales"
];

const MAX_KW = 35;
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Pérgolas de Aluminio y Patios Techados Adosados",
    description:
      "Una pérgola adosada que se conecta perfectamente a la estructura de su hogar, brindando sombra y protección mientras mantiene una transición fluida entre los espacios interiores y exteriores.",
    backgroundImage: "../assets/images/Products/Patios&Pergolas/Attached/01.webp",
  },
];

const backgroundImage = "../assets/images/Products/Patios&Pergolas/Attached/12.webp";

const imagePaths = Array.from({ length: 46 }, (_, i) =>
  `../assets/images/Products/Patios&Pergolas/Attached/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const AttachedEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pérgolas de Aluminio y Patios Techados | New Gen Patio</title>
        <meta
          name="description"
          content="Expanda su espacio vital con una pérgola de aluminio adosada o un patio techado. Duradero, moderno y diseñado a medida para su hogar en Houston. ¡Consulta gratuita disponible!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/aluminium-custom-pergola-cover-patio/es"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="attached-heading"
      >
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            ¿Por qué podría necesitarlo?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Su patio recibe demasiado sol, lo que lo hace incómodo durante las horas pico.</li>
            <li>Desea un espacio al aire libre que se sienta como una extensión natural de su hogar.</li>
            <li>Busca una solución estética y funcional sin ocupar demasiado espacio con postes adicionales.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Beneficios
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Integración Fluida",
              text: "Este tipo de cubierta se adosa directamente a la casa mediante un cabezal de pared, asegurando una distribución uniforme de la carga sin ser intrusivo y sin modificar la estructura principal de su hogar. Como resultado, la estructura extiende el espacio habitable de forma natural, armonizando con la arquitectura existente.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Attached/02.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Eficiencia Energética",
              text: "El uso de paneles de techo aislantes de 3 pulgadas reduce significativamente la transferencia de calor, minimizando las temperaturas interiores. Al disminuir la exposición directa al sol en ventanas y puertas de vidrio, mejora la eficiencia energética, lo que puede generar una reducción de hasta el 30% en los costos de aire acondicionado.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Attached/03.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Mayor Estabilidad y Durabilidad",
              text: "Con un punto de apoyo estructural adicional en la casa, la cubierta gana una resistencia superior ante impactos y vientos fuertes. El acabado de aluminio con recubrimiento epóxico de alta durabilidad protege contra la corrosión y la exposición prolongada a la intemperie.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Attached/05.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimizado para Patios Compactos",
              text: "Al utilizar la casa como soporte estructural, se elimina la necesidad de postes adicionales en un lado, creando un entorno más abierto y espacioso, ideal para patios pequeños donde el espacio es limitado.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Attached/08.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
          <FreeQuoteButtonEs questionText="¿Tienes un proyecto en mente?" buttonText="Hablemos" />
        </div>

        <WhyUsLinkEs backgroundImage={backgroundImage} />
        <ServicesEs showQuoteButton={false} />
        <div className="w-screen">
          <Clients></Clients>  
        </div>
      </section>
    </>
  );
};

export default AttachedEs;