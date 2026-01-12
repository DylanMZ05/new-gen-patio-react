import { Link } from "react-router-dom";
import useScrollToTop from "../../../../hooks/scrollToTop";

type WhyUsLinkEsProps = {
  backgroundImage: string;
};

const WhyUsLinkEs = ({ backgroundImage }: WhyUsLinkEsProps) => {
  const scrollToTop = useScrollToTop();

  return (
    <section
      className="relative w-screen flex flex-col items-center justify-center bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      aria-labelledby="why-us-heading"
    >
      <div id="our-promise" className="flex flex-col w-full items-center bg-black/60 py-12 px-6 text-center">
        <header>
          <h2 id="why-us-heading" className="font-semibold text-4xl text-white">¿Por qué nosotros?</h2>
          <div className="w-24 h-1 bg-orange-600 mt-4 mb-3 mx-auto rounded-full"></div>
        </header>

        <p className="max-w-[1080px] text-lg text-white/80 mb-6">
          Hacemos realidad tu visión de espacios exteriores con mano de obra experta y soluciones sostenibles. Ofrecemos presupuestos sin compromiso, diseños 3D y planes personalizados para garantizar un proceso fluido desde el concepto hasta la finalización. Nuestras estructuras de aluminio libres de mantenimiento, respaldadas por una garantía de 5 años, ofrecen una durabilidad y un atractivo estético inigualables.
        </p>

        <Link
          to="/how-we-doit/es"
          className="text-black bg-white text-xl font-semibold px-5 py-2 rounded-full transition-all hover:bg-white/90 hover:scale-105"
          onClick={scrollToTop}
        >
          Ver más
        </Link>
      </div>
    </section>
  );
};

export default WhyUsLinkEs;