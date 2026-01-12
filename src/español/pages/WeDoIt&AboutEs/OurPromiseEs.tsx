import React from "react";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import ImgTxtSectionEs from "../../components/ImgTxtSectionEs";
import SectionBlockEs from "../../components/SectionBlockEs";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import { Helmet } from "react-helmet-async";


const sectionsData = [
  {
    id: 1,
    title: "Garantías para la construcción de su patio cubierto",
    description: "Estamos comprometidos a entregar una calidad, profesionalismo y satisfacción del cliente inigualables en cada proyecto que emprendemos.",
    backgroundImage: "../assets/images/Products/Patios&Pergolas/Attached/23.webp",
  },
];

const OurPromiseEs: React.FC = () => {
  return (
    <section
      className="min-h-screen w-full flex flex-col items-center bg-gray-100"
      lang="es"
      aria-labelledby="process-heading"
    >
      <Helmet>
        <title>Nuestra Garantía | La Mejor Garantía en Espacios Exteriores | New Gen Patio</title>
        <meta 
          name="description" 
          content="En New Gen Patio, nuestro trabajo está respaldado por una garantía líder en la industria. Conozca cómo aseguramos la calidad, durabilidad y su tranquilidad." 
        />
      </Helmet>


      <SectionBlockEs sections={sectionsData} />
      <MarqueeBannerEs />

      <div className="flex flex-col items-center my-10 gap-10 max-w-screen-lg px-5">
        <header className="text-center flex flex-col items-center">
          <h2 className="font-semibold text-3xl max-w-2xl">
            Desde la primera consulta hasta la finalización del proyecto, garantizamos un proceso claro, profesional y sin complicaciones.
          </h2>
          <div className="w-24 h-1 bg-[#0d4754] mx-auto rounded-full mt-5"></div>
          <p className="mt-4 text-lg leading-relaxed">
            Su satisfacción es el corazón de lo que hacemos. Utilizamos materiales de alta calidad y técnicas innovadoras para garantizar durabilidad y estética. 
            Nuestra forma de trabajar es transparente, asegurando que se sienta seguro en cada paso del camino.
          </p>
        </header>

        <article aria-labelledby="visualizing-heading">
          <ImgTxtSectionEs
            title="Visualizando su Proyecto"
            text="Proporcionamos presupuestos 100% gratuitos, junto con diseños 3D y planos detallados antes de comenzar su proyecto."
            imageUrl="../assets/images/OurPromise/01.webp"
            imagePosition="left"
            imageProps={{ alt: "Renderizado 3D de un proyecto de pérgola de aluminio", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="built-to-last-heading">
          <ImgTxtSectionEs
            title="Construido para Durar con Mantenimiento de $0"
            text="Nuestras estructuras de aluminio están diseñadas para resistir condiciones climáticas severas sin oxidarse, decolorarse ni requerir pintura."
            imageUrl="../assets/images/OurPromise/02.webp"
            imagePosition="right"
            imageProps={{ alt: "Pérgola de aluminio con materiales resistentes al clima", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="permits-heading">
          <ImgTxtSectionEs
            title="Permisos de HOA y Ciudad sin Complicaciones"
            text="Nos encargamos de todo el papeleo para asegurar aprobaciones fluidas de su HOA y los permisos de la ciudad."
            imageUrl="../assets/images/OurPromise/03.webp"
            imagePosition="left"
            imageProps={{ alt: "Permisos oficiales y documentos para la construcción de un patio exterior", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="sustainability-heading">
          <ImgTxtSectionEs
            title="Sustentabilidad que Importa"
            text="Utilizamos aluminio 100% reciclable para nuestras pérgolas y patios, reduciendo el impacto ambiental mientras garantizamos la durabilidad."
            imageUrl="../assets/images/OurPromise/04.webp"
            imagePosition="right"
            imageProps={{ alt: "Materiales de aluminio sostenibles para pérgolas ecológicas", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="warranty-heading">
          <ImgTxtSectionEs
            title="Garantía de 5 Años para su Tranquilidad"
            text="Cada proyecto está respaldado por nuestra garantía integral de 5 años para una durabilidad a largo plazo."
            imageUrl="../assets/images/OurPromise/05.webp"
            imagePosition="left"
            imageProps={{ alt: "Documento de garantía con cobertura de 5 años para estructuras de patio", loading: "lazy" }}
          />
        </article>

        <article aria-labelledby="customers-heading">
          <ImgTxtSectionEs
            title="Nuestros Clientes son lo Primero"
            text="Con reseñas de 5 estrellas en Google y una garantía de satisfacción del 100%, valoramos la transparencia, la comunicación clara y un servicio de calidad."
            imageUrl="../assets/images/OurPromise/06.webp"
            imagePosition="right"
            imageProps={{ alt: "Clientes felices disfrutando de su patio exterior", loading: "lazy" }}
          />
        </article>

        <FreeQuoteButtonEs
          questionText="¿Desea obtener una cotización gratuita?"
          buttonText="Obtener Cotización Gratis"
        />
      
      </div>
    </section>
  );
};

export default OurPromiseEs;