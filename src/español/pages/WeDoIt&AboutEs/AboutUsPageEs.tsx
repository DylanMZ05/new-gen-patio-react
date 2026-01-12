import React from "react";
import MarqueeBannerEs from "../../components/MarqueeBannerEs";
import { Wrench, PencilRuler, ShieldCheck, Handshake, CheckCircle } from "lucide-react";
import FreeQuoteButtonEs from "../../components/FreeQuoteButtonEs";
import { Helmet } from "react-helmet-async";


const AboutUsPageEs: React.FC = () => {

  const benefits = [
    { icon: <Wrench size={32} className="text-orange-600" />, title: "Artesanía Experta", text: "Nuestro equipo garantiza precisión y materiales de alta calidad." },
    { icon: <PencilRuler size={32} className="text-orange-600" />, title: "Diseños Personalizados", text: "Adaptamos cada proyecto a su visión particular." },
    { icon: <ShieldCheck size={32} className="text-orange-600" />, title: "Durabilidad y Calidad", text: "Estructuras de aluminio resistentes al clima para una larga vida útil." },
    { icon: <Handshake size={32} className="text-orange-600" />, title: "Servicio al Cliente Excepcional", text: "Priorizamos la comunicación y su satisfacción." },
    { icon: <CheckCircle size={32} className="text-orange-600" />, title: "Seguridad y Cumplimiento", text: "Seguimos los estándares más altos de la industria." },
  ];

  return (
    <>
      <Helmet>
        <title>Sobre Nosotros | Expertos en Espacios Exteriores New Gen Patio</title>
        <meta
          name="description"
          content="Conozca New Gen Patio. Somos más que constructores; somos un equipo de diseñadores y artesanos apasionados por transformar espacios y mejorar estilos de vida en Houston."
        />
        <link rel="canonical" href="https://www.newgenpatio.com/about-us/es" />
      </Helmet>

      <section className="min-h-screen flex flex-col items-center bg-gray-100" aria-labelledby="about-us-heading">

        <section className="w-full">
          {/* Sección 1 */}
          <div
            className="relative flex flex-col items-center justify-center text-center w-full h-[34vh] bg-cover bg-center"
            aria-labelledby="section-title-1"
            role="region"
            style={{
              backgroundImage: `url(../../../assets/images/Products/Patios&Pergolas/Attached/23.webp)`,
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-black/80"></div>

            <div className="relative z-10 flex flex-col items-center text-white px-6 max-w-3xl">
              <h1 id="section-title-1" className="text-4xl font-semibold">
                Conozca a los Expertos Detrás de New Gen Patio
              </h1>
              <div className="w-28 h-[3px] bg-orange-600 mt-3 mb-2 rounded-full"></div>
              <p className="text-xl mb-5 text-white/80">
                Creamos patios y pérgolas de aluminio de alta calidad, mejorando su vida al aire libre con estilo y funcionalidad.
              </p>
            </div>
          </div>
        </section>
        <MarqueeBannerEs />

        <div className="flex flex-col my-10 gap-0 items-center max-w-[1080px] w-full px-5">
          {/* Who We Are */}
          <header className="text-center mb-10">
            <h2 className="font-semibold text-4xl mb-3 text-black/90">Quiénes Somos</h2>
            <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 mx-auto rounded-full"></div>
            <p className="font-semibold text-black/80">
              Somos creadores apasionados de espacios al aire libre, transformándolos en extensiones impresionantes y funcionales de su hogar. Con un profundo amor por el diseño, la artesanía y la satisfacción del cliente, construimos patios cubiertos y pérgolas de aluminio de alta calidad que mejoran su estilo de vida.
            </p>
          </header>

          {/* Our Story */}
          <section
            className="relative w-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url("../../../assets/images/Products/Patios&Pergolas/Cantilever/03.webp")` }}
            aria-labelledby="our-story-heading"
          >
            <div className="w-full bg-black/70 py-12 px-6 text-center">
              <h2 id="our-story-heading" className="font-semibold text-4xl text-white">Nuestra Historia</h2>
              <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>
              <p className="text-lg text-white/80 max-w-[1080px] mx-auto">
                Fundada por Rafael Cuza y Alejandro Alonso, New Gen Patio se construyó sobre una base de excelencia, integridad y compromiso. Con años de experiencia en la industria de la construcción en aluminio de Texas, vimos la necesidad de estructuras exteriores de alta calidad y resistentes al clima que elevaran tanto las propiedades residenciales como comerciales.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <header className="text-center mt-10">
            <h2 className="font-semibold text-4xl">¿Por Qué Elegirnos?</h2>
            <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 rounded-full mx-auto"></div>
          </header>

          <div className="grid gap-8 mt-3 md:grid-cols-2 md:ml-15">
            {benefits.map((item, index) => {
              const isLastOdd =
                benefits.length % 2 === 1 && index === benefits.length - 1;

              return (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    isLastOdd ? "md:col-span-2 md:justify-center" : ""
                  }`}
                >
                  <div>{item.icon}</div>
                  <div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.text}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Our Commitment */}
          <header className="text-center mt-10">
            <h2 className="font-semibold text-4xl text-black/90">Nuestro Compromiso con Usted</h2>
            <div className="w-24 h-1 bg-[#0d4754] mt-4 mb-3 mx-auto rounded-full"></div>
            <p className="font-semibold text-black/80">
              No solo construimos patios. Creamos experiencias. Ya sea para reuniones, relajación o para aumentar el valor de su propiedad, nos dedicamos a dar vida a su visión con una artesanía superior.
            </p>
            <p className="font-semibold text-black/80 mt-5">
              ¡Únase a la familia de New Gen Patio y cree el espacio al aire libre de sus sueños!
            </p>
          </header>

          <div className="w-full flex flex-col justify-between gap-5 mt-10 md:flex-row">
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <img
                className="aspect-[416/277] mt-3 object-cover rounded-2xl shadow-lg md:w-250"
                src="../../../assets/images/FotosDelEquipo/Rafa.webp"
                alt="Rafa - Co-fundador de New Gen Patio"
                loading="lazy"
              />
              <h3 className="text-center text-2xl font-semibold mt-2 px-2">Rafa</h3>
              <p className="font-semibold text-black/90 mt-1 px-3">
                Creamos espacios exteriores de los que estamos verdaderamente orgullosos. Cada proyecto es un reflejo de nuestra pasión por el diseño, la calidad y la artesanía. Seleccionamos cuidadosamente materiales de alta calidad y bajo mantenimiento que garantizan durabilidad y elegancia durante años. No se trata solo de hacer algo que se vea bien; se trata de construir algo que dure, algo que se sienta correcto. Ponemos nuestro corazón en cada detalle, desde la resistencia de la estructura hasta los toques finales, porque creemos que nuestros clientes merecen lo mejor.
              </p>
            </div>
            <div className="flex-1 flex flex-col justify-center md:justify-start">
              <img
                className="aspect-[416/277] mt-3 object-cover rounded-2xl shadow-lg md:w-250"
                src="../../../assets/images/FotosDelEquipo/Ale.webp"
                alt="Alex - Co-fundador de New Gen Patio"
                loading="lazy"
              />
              <h3 className="text-center text-2xl font-semibold mt-2 px-2">Alex</h3>
              <p className="font-semibold text-black/90 mt-1 px-3">
                Tener un patio cubierto o una pérgola es más que simplemente añadir una estructura a su hogar; se trata de transformar su espacio en un lugar donde realmente quiera estar. Llueva o haga sol, es un lugar que une a las personas, ofreciendo comodidad, sombra y un ambiente acogedor. No hay nada más gratificante que ver nuestros patios convertirse en el corazón de un hogar, un espacio diseñado no solo por su belleza sino para los momentos de la vida real que importan.
              </p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Card 1: Marianne */}
            <div className="aspect-[416/277] flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="../../../assets/images/FotosDelEquipo/Marianne.webp"
                alt="Marianne - Supervisora de Oficina"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mt-2">Marianne</h3>
              <p>Supervisora de Oficina</p>
            </div>

            {/* Card 2: Javier */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="../../../assets/images/FotosDelEquipo/Javier.webp"
                alt="Javier - Consultor de Proyectos"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mt-2">Javier</h3>
              <p>Consultor de Proyectos</p>
            </div>

            {/* Card 3: Alex Daniel */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="aspect-[416/277] w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="../../../assets/images/FotosDelEquipo/Alex-Daniel.webp"
                alt="Alex Daniel - Consultor de Proyectos"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mt-2">Alex Daniel</h3>
              <p>Consultor de Proyectos</p>
            </div>

            {/* Card 4: Lisandra */}
            <div className="flex flex-col justify-center items-center">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150"
                src="../../../assets/images/FotosDelEquipo/Mujer.webp"
                alt="Lisandra - Servicio al Cliente"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mt-2">Lisandra</h3>
              <p>Servicio al Cliente</p>
            </div>

            {/* Card 5: David - se centra en md */}
            <div className="flex flex-col justify-center items-center md:col-span-2 mx-auto">
              <img
                className="w-full mt-3 object-cover rounded-2xl shadow-lg md:w-150 md:max-w-127"
                src="../../../assets/images/FotosDelEquipo/Hombre.webp"
                alt="David - Director de Marketing"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold mt-2">David</h3>
              <p>Director de Marketing</p>
            </div>
          </div>

          <FreeQuoteButtonEs
            questionText="¿No está seguro de dónde empezar? Estamos aquí para ayudar"
            buttonText="Hable con un Experto"
          />
        
        </div>
      </section>
    </>
  );
};

export default AboutUsPageEs;