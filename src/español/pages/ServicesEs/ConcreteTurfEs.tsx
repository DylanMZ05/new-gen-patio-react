import React from "react";
import SliderEs from "../../components/Slider/Slider";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import WhyUsLinkEs from "./components/WhyUsLinkEs";
import ServicesEs from "../HomeEs/services/ServicesEs";
import { Helmet } from "react-helmet-async";
import ClientsEs from "../HomeEs/ClientsEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";

const sectionsData = [
  {
    id: 1,
    title: "Instalación de Concreto y Césped Sintético – Paisajismo de Bajo Mantenimiento",
    description:
      "Una combinación perfecta de concreto decorativo y césped artificial, que ofrece una solución elegante, duradera y de bajo mantenimiento para sus espacios exteriores.",
    backgroundImage: "../assets/images/Products/AdditionalServices/Landscaping/05.webp",
  },
];

const backgroundImage = "../assets/images/Products/AdditionalServices/Landscaping/03.webp";

const generateImagePaths = (path: string, count: number) =>
  Array.from({ length: count }, (_, i) => `${path}/${(i + 1).toString().padStart(2, "0")}.webp`);

const imagesArtificialGrass = generateImagePaths("../assets/images/Products/AdditionalServices/ArtificialGrass", 8);
const imagesLandscaping = generateImagePaths("../assets/images/Products/AdditionalServices/Landscaping", 6);
const imagesConcrete = generateImagePaths("../assets/images/Products/AdditionalServices/Concrete", 9);

const ConcreteTurfEs: React.FC = () => {
  return (
    <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="concrete-turf-heading">
      <Helmet>
        <title>Servicios de Paisajismo, Concreto y Césped Artificial | New Gen Patio</title>
        <meta
          name="description"
          content="Haga realidad la visión de su hogar en Houston con nuestros servicios expertos adicionales. Ofrecemos paisajismo profesional, trabajos de concreto personalizados e instalación de césped artificial premium."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/concrete-and-turf-installation-houston/es" />
      </Helmet>

      <SectionBlockEs sections={sectionsData} />
      <MarqueeBannerEs />

      {[
        { title: "Paisajismo (Landscaping)", images: imagesLandscaping },
        { title: "Trabajos de Concreto", images: imagesConcrete },
        { title: "Césped Artificial", images: imagesArtificialGrass },
      ].map((section, index) => (
        <div key={index} className="w-full">
          <h2 className="text-4xl font-semibold my-5 text-center">{section.title}</h2>
          <SliderEs images={section.images} withBorderT withBorderB />
        </div>
      ))}

      <MarqueeBannerEs />

      <div className="pt-8 px-5 max-w-3xl">
        <h2 className="font-semibold text-3xl mb-3 text-center">¿Por qué podría necesitarlo?</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full"></div>
        <ul className="list-disc pl-6 text-lg space-y-2">
          <li>Desea un espacio exterior totalmente funcional para disfrutar durante todo el año.</li>
          <li>Busca una solución para su patio trasero que sea visualmente atractiva y de bajo mantenimiento.</li>
          <li>Desea un diseño integral que combine superficies sólidas, áreas verdes y zonas de cocina al aire libre.</li>
        </ul>
      </div>

      {/* Beneficios de Concreto y Landscaping */}
      <div className="flex flex-col my-10 gap-10 items-center">
        <h2 className="font-semibold text-4xl text-center">Beneficios de Concreto y Paisajismo</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] rounded-full"></div>

        {[
          {
            title: "Sistema de Drenaje Eficiente",
            text: "Nuestro césped artificial de alta calidad cuenta con un sistema de drenaje vertical con perforaciones cada 4 pulgadas, lo que garantiza un flujo rápido de agua y evita la formación de charcos o acumulación de humedad.",
            imageUrl: "../assets/images/Products/AdditionalServices/Landscaping/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Menor Temperatura Superficial",
            text: "Los modelos avanzados de césped artificial incorporan tecnología CoolTurf, que refleja la luz solar y reduce la temperatura de la superficie hasta en 15°F en comparación con el césped sintético tradicional.",
            imageUrl: "../assets/images/Products/AdditionalServices/Landscaping/04.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Libre de Químicos y Apto para Mascotas",
            text: "A diferencia del césped natural, el sintético no requiere pesticidas ni fertilizantes, por lo que es más seguro para niños y mascotas. Además, su composición no orgánica evita el crecimiento de plagas como hormigas y garrapatas.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/03.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Superficie Uniforme con Mínimo Mantenimiento",
            text: "Construido con respaldo de polietileno y fibras sintéticas de alta densidad, el césped mantiene una apariencia impecable sin necesidad de podar, regar o resembrar.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/04.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Concreto Resistente con Aditivos Reforzados",
            text: "Utilizamos mezclas de concreto reforzadas con fibra de vidrio y aditivos impermeabilizantes para minimizar las grietas y mejorar la durabilidad frente a los cambios de temperatura y el impacto.",
            imageUrl: "../assets/images/Products/AdditionalServices/Concrete/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Diseño con Drenaje Integrado",
            text: "Para evitar la acumulación de agua, incorporamos pendientes ocultas y canales de drenaje en el diseño, extendiendo la vida útil de las superficies de concreto y protegiendo el paisaje adyacente.",
            imageUrl: "../assets/images/Products/AdditionalServices/Concrete/02.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Acabados y Colores Personalizados",
            text: "Las técnicas de concreto estampado o pulido permiten replicar texturas de madera, piedra natural o ladrillo manteniendo la resistencia del concreto. Esto ofrece una versatilidad superior en diseños exteriores.",
            imageUrl: "../assets/images/Products/AdditionalServices/Landscaping/02.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Compatibilidad con Sistemas de Iluminación",
            text: "Se puede integrar iluminación LED de bajo consumo directamente en el pavimento, mejorando la visibilidad nocturna y realzando la estética exterior.",
            imageUrl: "../assets/images/Products/AdditionalServices/Landscaping/05.webp",
            imagePosition: "left" as const,
          },
        ].map((section, index) => (
          <ImgTxtSectionEs key={index} {...section} />
        ))}

        <FreeQuoteButtonEs questionText="¿Tiene un proyecto en mente?" buttonText="Hablemos" />
      </div>

      <MarqueeBannerEs />

      {/* Beneficios de Artificial Turf */}
      <div className="flex flex-col my-10 gap-10 items-center">
        <h2 className="font-semibold text-4xl text-center">Beneficios del Césped Artificial</h2>
        <div className="w-16 h-[3px] bg-[#0d4754] rounded-full"></div>

        {[
          {
            title: "Drenaje de Alto Rendimiento",
            text: "El césped artificial de última generación permite el paso del agua de lluvia de manera inmediata, evitando lodo y manteniendo el área limpia incluso después de fuertes tormentas.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/01.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Tecnología de Reflejo de Calor",
            text: "Gracias a sus fibras diseñadas para disipar el calor, el área se mantiene más fresca al tacto, permitiendo su uso cómodo incluso en los días más calurosos de Houston.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/02.webp",
            imagePosition: "left" as const,
          },
          {
            title: "Seguro para Toda la Familia",
            text: "Nuestras instalaciones son 100% libres de plomo y químicos tóxicos. Es la opción ideal para familias con perros, ya que es resistente a las excavaciones y fácil de limpiar.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/05.webp",
            imagePosition: "right" as const,
          },
          {
            title: "Durabilidad Extrema",
            text: "Las fibras cuentan con protección UV para evitar la decoloración, asegurando que su jardín luzca verde y vibrante durante más de una década sin esfuerzo.",
            imageUrl: "../assets/images/Products/AdditionalServices/ArtificialGrass/04.webp",
            imagePosition: "left" as const,
          },
        ].map((section, index) => (
          <ImgTxtSectionEs key={index} {...section} />
        ))}

        <FreeQuoteButtonEs
          questionText="¡Nos encantaría escuchar sus ideas!"
          buttonText="Cuéntenos su Visión"
        />
      </div>

      <WhyUsLinkEs backgroundImage={backgroundImage} />
      <ServicesEs showQuoteButton={false} />
      <div className="w-screen">
        <ClientsEs />
      </div>
      <MarqueeBannerEs />
    </section>
  );
};

export default ConcreteTurfEs;