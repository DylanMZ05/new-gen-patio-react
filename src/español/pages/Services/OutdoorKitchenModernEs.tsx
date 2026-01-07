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

// --- Keywords adaptadas al español ---
const KEYWORDS_RAW = [
  "cocina exterior contemporánea",
  "cocina exterior moderna",
  "diseño de cocinas modernas para patio",
  "cocinas minimalistas exteriores",
  "tecnología en cocinas exteriores",
];

const MAX_KW = 10;
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Cocina Exterior Moderna",
    description: "Diseño de vanguardia, materiales inteligentes y tecnología integrada",
    backgroundImage: "../assets/images/Products/OutdoorKitchen/Modern/10.webp",
  },
];

const backgroundImage = "../assets/images/Products/OutdoorKitchen/Traditional/07.webp";

const generateImagePaths = (path: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${path}/${(i + 1).toString().padStart(2, "0")}.webp`);

const imagesModern = generateImagePaths("../assets/images/Products/OutdoorKitchen/Modern", 28);

const OutdoorKitchenModernEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Diseño e Instalación de Cocinas Exteriores Modernas | New Gen Patio</title>
        <meta
          name="description"
          content="Explore nuestros diseños de cocinas exteriores modernas. Líneas limpias, acabados de lujo y la última tecnología para crear un espacio exterior sofisticado."
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/modern-outdoor-kitchens-houston/es" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="outdoor-kitchen-heading">
        <SectionBlockEs sections={sectionsData} />
        <MarqueeBannerEs />

        {[{ title: "Estilo Moderno", images: imagesModern }].map((section, index) => (
          <div key={index} className="w-full">
            <SliderEs images={section.images} withBorderB />
          </div>
        ))}

        <div className="pt-8 px-5 max-w-4xl">
          <h2 className="font-semibold text-3xl mb-3">¿Por qué considerar una Cocina Exterior Moderna?</h2>
          <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Aproveche al máximo la tecnología y conectividad para cocinar al aire libre.</li>
            <li>Obtenga un espacio limpio, organizado y funcional que pueda usar durante todo el año.</li>
            <li>Combinación perfecta para la arquitectura contemporánea y la estética minimalista.</li>
            <li>Soluciones de bajo mantenimiento que no se verán anticuadas con el paso del tiempo.</li>
          </ul>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-4xl text-center">Beneficios</h2>
            <div className="w-16 h-[3px] bg-[#0d4754] rounded-full mt-4"></div>
          </div>

          {[
            {
              title: "Tecnología Integrada y Conectividad para una Experiencia Superior:",
              text: "Integramos asadores inteligentes, refrigeración eficiente, iluminación LED ambiental y sistemas de sonido. Este equipamiento completo actualiza la experiencia culinaria y de entretenimiento al aire libre, ofreciendo control avanzado y comodidad.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/01.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Diseño de Vanguardia con Materiales Inteligentes para Máxima Durabilidad:",
              text: "Utilizamos paneles compuestos de alta densidad y encimeras de cuarzo o granito. Estos materiales resisten la humedad, el calor y los rayos UV de Houston, garantizando un espacio impecable con mantenimiento mínimo y una estética sofisticada duradera.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/02.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Integración Arquitectónica que Realza la Estética Contemporánea:",
              text: "El diseño de líneas rectas, acabados lisos y colores neutros armoniza con las casas actuales. Se logra una coherencia visual entre el interior y el exterior, aportando sofisticación y aumentando el valor de la propiedad.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/26.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Funcionalidad Optimizada para un Uso Eficiente y Seguro:",
              text: "Nuestros módulos permiten la integración precisa de electrodomésticos de acero inoxidable (grado 304), resistentes y fáciles de limpiar. Esto se complementa con iluminación LED y opciones de ventilación profesional para un uso cómodo y seguro en cualquier momento.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Modern/28.webp",
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
        <ServicesEs showQuoteButton={false} />
        <div className="w-screen">
          <ClientsEs />
        </div>
      </section>
    </>
  );
};

export default OutdoorKitchenModernEs;