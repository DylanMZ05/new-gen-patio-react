import React from "react";
import { Helmet } from "react-helmet-async";
import Slider from "../../components/Slider/Slider";
import MarqueeBanner from "../../components/MarqueeBannerEs";
import ImgTxtSection from "../../components/ImgTxtSectionEs";
import SectionBlock from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs"; // ✅ Importación actualizada
import ServicesEs from "../Home/services/ServicesEs"; // ✅ Importación actualizada
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs"; // ✅ Importación actualizada
import Clients from "../Home/ClientsEs";

// --- Keywords adaptadas al español (Enfoque en diseño moderno y voladizos) ---
const KEYWORDS_RAW = [
  "pérgola voladiza",
  "pérgola cantilever aluminio",
  "pérgola moderna sin postes",
  "pérgola voladiza metálica",
  "pérgola suspendida de aluminio",
  "diseño de pérgolas modernas",
  "pérgola voladiza adosada a la casa",
  "pérgolas minimalistas houston",
  "carport voladizo moderno",
  "pérgola de aluminio personalizada",
];

const MAX_KW = 20;
const KEYWORDS_DEDUPED = Array.from(new Set(KEYWORDS_RAW));
const KEYWORDS_FINAL = KEYWORDS_DEDUPED.slice(0, MAX_KW).join(", ");

const sectionsData = [
  {
    id: 1,
    title: "Pérgola Voladiza de Aluminio (Cantilever)",
    description:
      "Una pérgola moderna e innovadora con una estructura en voladizo, que proporciona sombra sin los postes tradicionales en las esquinas, logrando un aspecto limpio y sofisticado.",
    backgroundImage: "../assets/images/Products/Patios&Pergolas/Cantilever/01.webp",
  },
];

const backgroundImage = "../assets/images/Products/Patios&Pergolas/Cantilever/03.webp";

const imagePaths = Array.from({ length: 23 }, (_, i) =>
  `../assets/images/Products/Patios&Pergolas/Cantilever/${(i + 1)
    .toString()
    .padStart(2, "0")}.webp`
);
const validImages = imagePaths.filter((img) => img.trim() !== "");

const CantileverEs: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Pérgolas Voladizas Modernas y Carports | New Gen Patio</title>
        <meta
          name="description"
          content="Diseño moderno con nuestras pérgolas voladizas y carports. Estructuras minimalistas que ofrecen máxima sombra y estilo para su patio en Houston. Descubra la diferencia."
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/cantilever-aluminium-pergola/es"
        />
      </Helmet>

      <section
        className="min-h-screen flex flex-col items-center bg-gray-100"
        aria-labelledby="Cantilever-heading"
      >
        <SectionBlock sections={sectionsData} />
        <Slider images={validImages} withBorderT />
        <MarqueeBanner />

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            ¿Por qué podría necesitarla?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
          <ul className="list-disc pl-6 text-lg space-y-2">
            <li>Desea una pérgola moderna sin postes que bloqueen su vista o el movimiento.</li>
            <li>Necesita una solución de sombra que ocupe el mínimo espacio en el suelo.</li>
            <li>Prefiere un diseño elegante y sofisticado que complemente una casa de estilo contemporáneo.</li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">Beneficios</h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full"></div>
        </div>

        <div className="flex flex-col my-10 gap-10 items-center">
          {[
            {
              title: "Vista sin Obstrucciones y Espacio Maximizado",
              text: "Las pérgolas voladizas eliminan la necesidad de postes de soporte frontales mediante un sistema de vigas en voladizo. Este diseño garantiza una vista abierta y una mayor libertad de movimiento bajo la estructura. La carga se distribuye uniformemente entre los puntos de anclaje, utilizando aluminio estructural de alta resistencia para mantener la estabilidad sin comprometer la estética.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Cantilever/PRIMERO.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Optimizada para Espacios Pequeños",
              text: "Debido a su diseño suspendido, las pérgolas voladizas pueden instalarse en patios pequeños, terrazas o áreas laterales sin ocupar espacio en el suelo con columnas. Se fijan de forma segura a una base estructural mediante soportes reforzados, permitiendo su instalación en concreto, ladrillo o estructuras metálicas.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Cantilever/SEGUNDO.webp",
              imagePosition: "left" as const,
            },
            {
              title: "Distribución de Carga Eficiente",
              text: "Se utilizan vigas de aluminio de alta resistencia (perfiles de 2x8 o 2x10) para sostener la estructura sin apoyos adicionales. Además, los paneles de techo aislantes mejoran la distribución del peso, evitando deformaciones o hundimientos con el paso del tiempo.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Cantilever/TERCERO.webp",
              imagePosition: "right" as const,
            },
            {
              title: "Resistencia Superior al Viento",
              text: "Diseñadas para una máxima eficiencia aerodinámica, estas pérgolas soportan ráfagas de viento de hasta 120 mph. Se utilizan pernos de expansión para el anclaje, garantizando la estabilidad total en condiciones climáticas adversas.",
              imageUrl: "../assets/images/Products/Patios&Pergolas/Cantilever/CUARTO.webp",
              imagePosition: "left" as const,
            },
          ].map((section, index) => (
            <ImgTxtSection key={index} {...section} />
          ))}
          <FreeQuoteButtonEs questionText="¿Tiene un proyecto en mente?" buttonText="Hablemos" />
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

export default CantileverEs;