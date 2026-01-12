import React from "react";
import { Helmet } from "react-helmet-async";
import SliderEs from "../../components/Slider/Slider";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs";
import ServicesEs from "../HomeEs/services/ServicesEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import ClientsEs from "../HomeEs/ClientsEs";

// --- Keywords adaptadas al español (Estilo Tradicional) ---
const KEYWORDS_RAW = [
  "cocina exterior de piedra",
  "cocina exterior de ladrillo",
  "asadores de piedra para patio",
  "cocina exterior rústica",
  "cocina de exterior estilo colonial",
  "construcción de cocinas rústicas",
  "acabados naturales para patios",
];

// --- Configuración de keywords ---
const MAX_KW = 20; 
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Cocina Exterior Tradicional",
    description: "Estética atemporal, construcción robusta y acabados naturales.",
    backgroundImage: "../assets/images/Products/OutdoorKitchen/Modern/10.webp",
  },
];

const backgroundImage = "../assets/images/Products/OutdoorKitchen/Traditional/07.webp";

const generateImagePaths = (path: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${path}/${(i + 1).toString().padStart(2, "0")}.webp`);

const imagesTraditional = generateImagePaths("../assets/images/Products/OutdoorKitchen/Traditional", 11);

const OutdoorKitchenTraditionalEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Cocinas Exteriores Tradicionales y Rústicas | New Gen Patio</title>
        <meta
          name="description"
          content="Descubra la elegancia atemporal de nuestras cocinas exteriores tradicionales. Creamos un ambiente cálido y acogedor para su hogar con diseños en piedra, ladrillo y acabados naturales."
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/traditional-outdoor-kitchens-houston/es" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="outdoor-kitchen-heading">
        <SectionBlockEs sections={sectionsData} />
        <MarqueeBannerEs />

        {[{ title: "Estilo Tradicional", images: imagesTraditional }].map((section, index) => (
          <div key={index} className="w-full">
            <SliderEs images={section.images} withBorderB />
          </div>
        ))}

        <div className="pt-8 px-5 max-w-4xl">
          <h2 className="font-semibold text-3xl mb-3">¿Por qué considerar una Cocina Exterior Tradicional?</h2>
          <div className="ml-1 w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Añade un espacio acogedor perfecto para reuniones familiares.</li>
            <li>Diseñada para durar décadas sin perder su carácter y elegancia.</li>
            <li>¿Busca un diseño exterior que se sienta auténtico y resalte la artesanía?</li>
            <li>Se adapta perfectamente a los estilos arquitectónicos clásicos.</li>
          </ul>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          <div className="flex flex-col items-center">
            <h2 className="font-semibold text-4xl text-center">Beneficios</h2>
            <div className="w-16 h-[3px] bg-[#0d4754] rounded-full mt-4"></div>
          </div>

          {[
            {
              title: "Creación de Ambientes Acogedores para Encuentros Memorables",
              text: "La construcción con ladrillo macizo o piedra natural genera una atmósfera cálida y hogareña. Estos materiales son ideales para crear un punto de encuentro para parrilladas, pizzas a la leña y eventos sociales significativos.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/05.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Durabilidad Comprobada ante Climas Exigentes",
              text: "Utilizamos materiales como piedra natural o ladrillo sólido que resisten eficazmente las inclemencias del clima de Texas. Esto garantiza una estructura sólida y una apariencia atractiva a largo plazo con un mantenimiento mínimo.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/02.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Belleza Artesanal con Carácter Único y Personalizado",
              text: "Cada cocina se construye a medida, resaltando texturas naturales y acabados hechos a mano. El resultado es un diseño con carácter propio, alejado de soluciones estandarizadas y adaptado al gusto individual.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/03.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Adaptación Perfecta a Estilos Arquitectónicos Clásicos",
              text: "Estas cocinas complementan visualmente casas de estilo rústico, colonial o de ladrillo visto. Los materiales son inherentemente resistentes al fuego, permitiendo la instalación segura de hornos de leña o parrillas de carbón.",
              imageUrl: "../assets/images/Products/OutdoorKitchen/Traditional/09.webp",
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

export default OutdoorKitchenTraditionalEs;