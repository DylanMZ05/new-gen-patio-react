import React from "react";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import ImageSliderEs from "../../components/ImageSliderEs";
import { Helmet } from "react-helmet-async";

const sectionsData = [
  {
    id: 1,
    title: "Cómo Construimos – Construcción Experta de Patios en Houston",
    description:
      "Desde el concepto hasta la finalización, seguimos un proceso optimizado para garantizar una experiencia fluida y sin complicaciones.",
    backgroundImage: "../assets/images/Products/Patios&Pergolas/Attached/12.webp",
  },
];

const OurProcessEs: React.FC = () => {
  return (
    <section className="min-h-screen w-full flex flex-col items-center bg-gray-100" aria-labelledby="page-title">
      <Helmet>
        <title>Nuestro Proceso | Diseño y Construcción por New Gen Patio</title>
        <meta
          name="description"
          content="Nuestro proceso de diseño y construcción está listo para ser descubierto. Un viaje transparente y colaborativo de 4 fases para crear el espacio exterior de tus sueños sin complicaciones."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/how-we-doit/es" />
      </Helmet>

      <SectionBlockEs sections={sectionsData} />
      <MarqueeBannerEs />

      <div className="flex flex-col items-center my-10 gap-10 max-w-screen-lg px-5">

        <h2 className="text-4xl font-semibold text-center mb-4" id="process-heading">
          Nuestro Proceso de Construcción en 8 Pasos
        </h2>
        <div className="w-20 h-1 bg-[#0d4754] rounded-full mb-6"></div>

        <article aria-labelledby="step-1-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 1:"
            title="Solicita una cotización gratuita en línea o llámanos para un estimado inicial."
            text="Facilitamos el primer contacto, brindándote una estimación de costos inicial sin compromiso. Solo envíanos detalles básicos sobre tu espacio y el tipo de proyecto que tienes en mente."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 1"
              images={["../assets/images/Steps/1.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-2-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 2:"
            title="Agenda una consulta gratuita en tu hogar."
            text="Visitamos tu propiedad para evaluar el espacio disponible y discutir tus ideas. Este paso es crucial para entender tus necesidades y asegurar que el diseño se ajuste perfectamente a tu espacio y estilo."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 2"
              images={["/../assets/images/Steps/2.1.webp", "/../assets/images/Steps/2.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-3-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 3:"
            title="Recibe una cotización formal con renders 3D y el alcance del proyecto."
            text="Presentamos una propuesta detallada, incluyendo imágenes en 3D para que puedas visualizar el resultado final. También detalla los materiales, cronogramas del proyecto y precios transparentes."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 3"
              images={["/../assets/images/Steps/3.1.webp", "/../assets/images/Steps/3.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-4-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 4:"
            title="Firma la propuesta aprobada y realiza un depósito del 25%."
            text="La firma de la propuesta aprobada asegura que cada detalle esté claramente definido y alineado con tus expectativas. El depósito inicial nos permite comenzar la planificación y asegurar los materiales."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 4"
              images={["/../assets/images/Steps/4.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-5-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 5:"
            title="Programar la fecha de inicio de la construcción."
            text="Coordinamos un cronograma de trabajo eficiente para minimizar las interrupciones y asegurar que el proyecto se mantenga en marcha."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 5"
              images={["/../assets/images/Steps/5.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-6-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 6:"
            title="Recibe actualizaciones periódicas antes de la construcción."
            text="Nos mantenemos en contacto para informarte sobre el progreso del proyecto, responder cualquier pregunta y asegurar que todo esté listo para la construcción."
            imageUrl=""
            imagePosition="left"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 6"
              images={["/../assets/images/Steps/6.1.webp", "/../assets/images/Steps/6.2.webp"]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-7-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 7:"
            title="¡Comienza la construcción! Nuestro equipo garantiza la calidad en cada paso."
            text="Nuestros expertos ejecutan el proyecto con precisión y atención al detalle, asegurando que cada material y técnica cumpla con los más altos estándares de calidad."
            imageUrl=""
            imagePosition="right"
          >
            <ImageSliderEs
              alt="Imágenes del Paso 7"
              images={[
                "/../assets/images/Steps/7 (1).webp",
                "/../assets/images/Steps/7 (2).webp",
                "/../assets/images/Steps/7 (3).webp",
              ]}
            />
          </ImgTxtSectionEs>
        </article>

        <article aria-labelledby="step-8-heading">
          <ImgTxtSectionEs
            stepLabel="Paso 8:"
            title="Recorrido final y revisión."
            text="Realizamos una inspección detallada contigo para asegurar que todo esté impecable. Nos aseguramos de que estés 100% satisfecho antes de la entrega final."
            imageUrl=""
            imagePosition="left"
          >
            <video
              className="rounded-lg shadow-md w-150 object-cover aspect-[3/2]"
              src="/../assets/images/Steps/8.webm"
              controls
              autoPlay
              muted
            />
          </ImgTxtSectionEs>
        </article>

        <FreeQuoteButtonEs 
          questionText="¿Quieres obtener una cotización gratuita?"
          buttonText="Obtén una Cotización Gratis"
        />
      </div>

      <MarqueeBannerEs />
    </section>
  );
};

export default OurProcessEs;