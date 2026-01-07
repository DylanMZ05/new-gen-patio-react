import React from "react";
import { Helmet } from "react-helmet-async";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs";
import OutdoorKitchenCardsEs from "../Home/services/OutdoorKitchenCardsEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";

// --- Keywords adaptadas al español (Enfoque en Houston y mercado hispano) ---
const KEYWORDS_RAW = [
  "cocinas al aire libre",
  "cocinas para patio",
  "diseño de cocinas exteriores",
  "asadores para patio",
  "cocinas modulares exteriores",
  "constructores de cocinas exteriores houston",
  "islas de cocina para patio",
  "cocinas exteriores de lujo",
  "remodelación de patios houston",
  "asadores de gas y carbón",
  "gabinetes para exterior",
  "barras para patio",
  "cocinas exteriores personalizadas",
  "precios de cocinas para patio",
  "cocinas integrales para terraza",
];

const MAX_KW = 40;
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Cocinas Exteriores Personalizadas",
    description:
      "Una cocina exterior totalmente equipada, diseñada para aportar comodidad y estilo a su patio trasero, permitiéndole cocinar, entretener y cenar al aire libre.",
    backgroundImage: "../assets/images/Products/OutdoorKitchen/Modern/10.webp",
  },
];

const backgroundImage = "../assets/images/Products/OutdoorKitchen/Traditional/07.webp";

const OutdoorKitchenEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Expertos en Cocinas Exteriores en Houston, TX | New Gen Patio</title>
        <meta
          name="description"
          content="Conviértase en el anfitrión ideal con una cocina exterior a medida en Houston. Construimos cocinas lujosas y funcionales para su patio. ¡Diseñe la suya hoy mismo!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/custom-outdoor-kitchen/es" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="outdoor-kitchen-heading">
        <SectionBlockEs sections={sectionsData} />
        <MarqueeBannerEs />
        <OutdoorKitchenCardsEs showQuoteButton={false} />

        <div className="pt-8 px-5">
          <h2 className="font-semibold text-3xl mb-3 text-center">¿Por qué podría necesitarla?</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Le encanta organizar reuniones y desea un espacio dedicado para cocinar y cenar al aire libre.</li>
            <li>Desea mejorar su patio trasero con un área de entretenimiento funcional y elegante.</li>
            <li>Busca una configuración de cocina resistente al clima que elimine la necesidad de entrar a la casa constantemente.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Beneficios</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Materiales Resistentes al Clima",
              text: "Las cocinas exteriores deben soportar fluctuaciones de temperatura, humedad y exposición solar. Utilizamos acero inoxidable grado 304, encimeras de granito o cuarzo, y estructuras de aluminio con recubrimientos anticorrosión para garantizar la máxima durabilidad.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Sistemas de Ventilación Optimizados",
              text: "Para evitar la acumulación de calor y humo, integramos campanas extractoras con conductos de ventilación o aperturas estratégicamente situadas. Esto mejora el flujo de aire y garantiza una experiencia cómoda al cocinar, incluso en áreas cubiertas.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/02.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Soluciones de Almacenamiento Funcionales",
              text: "Los gabinetes están diseñados con bordes sellados y cierres herméticos para evitar la intrusión de polvo e insectos. Características adicionales como refrigeradores empotrados, fregaderos independientes y sistemas de estanterías modulares mejoran la eficiencia del espacio.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/03.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptabilidad a Varios Combustibles",
              text: "Nuestras cocinas pueden configurarse para sistemas de gas natural, propano o leña, lo que permite a los usuarios seleccionar el método de cocción más conveniente según sus preferencias personales y disponibilidad local.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/06.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSectionEs key={index} {...section} />
          ))}

          <FreeQuoteButtonEs 
            questionText="¿Tiene un proyecto en mente?"
            buttonText="Hablemos"
          />
        </div>

        <WhyUsLinkEs backgroundImage={backgroundImage} />
      </section>
    </>
  );
};

export default OutdoorKitchenEs;