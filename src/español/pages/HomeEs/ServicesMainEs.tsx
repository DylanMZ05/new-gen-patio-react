import React, {
  lazy,
  memo,
  Suspense,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";

import BlockSection from "../../components/BlockSectionEs";
import SectionBlock from "../../components/SectionBlockEs";

import Clients from "./ClientsEs";

// ↓ Bajo el fold: cargar on-demand
const MarqueeBanner = lazy(() => import("../../components/MarqueeBannerEs"));
const ImageTextSection = lazy(() => import("../../components/ImgTxtSectionEs"));
const Services = lazy(() => import("./services/ServicesEs"));

/* ===================== Helpers ===================== */
const idleCall = (cb: () => void) => {
  const ric = (window as any).requestIdleCallback;
  return ric ? ric(cb, { timeout: 1200 }) : setTimeout(cb, 250);
};

type LazySectionProps = {
  children: React.ReactNode;
  minHeight: number | string; // placeholder anti-CLS
  rootMargin?: string;
  threshold?: number | number[];
  prefetchNext?: () => void; // prefetch del siguiente chunk
  ariaLabel?: string;
};

const LazySection: React.FC<LazySectionProps> = ({
  children,
  minHeight,
  rootMargin = "250px 0px",
  threshold = 0.05,
  prefetchNext,
  ariaLabel,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const containStyle = { contain: "content" } as React.CSSProperties;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          if (prefetchNext) idleCall(prefetchNext);
          io.disconnect();
        }
      },
      { rootMargin, threshold }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin, threshold, prefetchNext]);

  return (
    <div ref={ref} aria-label={ariaLabel} style={containStyle}>
      {visible ? (
        <Suspense fallback={<div style={{ minHeight }} aria-hidden="true" />}>
          {children}
        </Suspense>
      ) : (
        <div style={{ minHeight }} aria-hidden="true" />
      )}
    </div>
  );
};

/* ===================== Keywords (Adaptadas) ===================== */
const KEYWORDS_RAW = [
  "pergola",
  "vida al aire libre",
  "patios techados",
  "cubiertas para patio",
  "patios y pergolas",
  "pergola en patio",
  "pergola para jardin",
  "pergolas modernas",
  "sombra para patio",
  "techos para exterior",
  "diseño de patios",
  "pergolas houston",
  "pergolas de aluminio",
  "espacios exteriores",
  "construccion de patios",
  "carport de aluminio",
  "pergolas a medida",
  "pergolas personalizadas",
  "precio de pergolas",
  "pergola conectada a la casa",
  "pergola con pared de privacidad",
  "pergola prefabricada",
  "techo de aluminio para patio",
  "instalar pergola",
  "paneles de techo aislados",
  "materiales para pergola",
  "pergola resistente al clima",
  "pergolas de metal",
  "cubierta para terraza",
  "extension de patio",
];
const MAX_KW = 30;

/* ===================== Datos de la página (Traducidos) ===================== */
const sectionsData3Raw = [
  {
    id: 6,
    title: "Espacios Personalizados al Aire Libre",
    description:
      "Descubre nuestras soluciones modernas e innovadoras diseñadas para mejorar tu vida al aire libre con estilo, funcionalidad y durabilidad.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sectionsRaw = [
  {
    title: " 1. Amplía tu área habitable sin grandes construcciones",
    text: "Al transformar tu espacio exterior, ganas un área completamente nueva para cocinar, cenar, relajarte y entretener, sin el costo o la interrupción de una renovación interior.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    imagePosition: "right" as const,
  },
  {
    title: "2. Mejora la calidad de vida",
    text: "Se ha demostrado que pasar tiempo al aire libre reduce el estrés, mejora el estado de ánimo y fortalece las relaciones. Un espacio exterior bien diseñado fomenta el tiempo en familia y las reuniones sociales.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    imagePosition: "left" as const,
  },
  {
    title: "3. Aumenta el valor de la propiedad",
    text: "Las mejoras exteriores como pérgolas, cocinas o patios diseñados son altamente atractivas para los compradores. Se consideran características premium que aumentan el valor de mercado.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "4. Se adapta a todas las estaciones y actividades",
    text: "Con el diseño y los materiales adecuados, tu espacio exterior puede usarse durante todo el año para cocinar, relajarse o eventos, convirtiéndose en una de las partes más versátiles de tu hogar.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    imagePosition: "left" as const,
  },
  {
    title: "5. Materiales duraderos de alta calidad",
    text: "Utilizamos materiales premium que garantizan resistencia a la intemperie, bajo mantenimiento y una apariencia impecable durante años. Invertir en calidad es disfrutar sin preocupaciones.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    imagePosition: "right" as const,
  },
  {
    title: "6. Experiencia y profesionalismo garantizado",
    text: "Nuestro equipo de especialistas transforma patios con meticulosa atención al detalle. Desde el diseño hasta la instalación, aseguramos que el resultado final supere tus expectativas.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/20.webp",
    imagePosition: "left" as const,
  },
];

/* ===================== Página ===================== */
const ServicesMainEs: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL || "/";

  const KEYWORDS_FINAL = useMemo(() => {
    const dedup = Array.from(new Set(KEYWORDS_RAW));
    return dedup.slice(0, MAX_KW).join(", ");
  }, []);

  const sectionsData3 = useMemo(
    () =>
      sectionsData3Raw.map((s) => ({
        ...s,
        backgroundImage: `${baseUrl}${encodeURI(s.backgroundImage)}`,
      })),
    [baseUrl]
  );

  const sections = useMemo(
    () =>
      sectionsRaw.map((s) => ({
        ...s,
        imageUrl: `${baseUrl}${encodeURI(s.imageUrl)}`,
      })),
    [baseUrl]
  );

  const heroBg = sectionsData3[0]?.backgroundImage;

  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBannerEs"));
  const prefetchServices = () =>
    idleCall(() => import("./services/ServicesEs"));
  const prefetchImgTxt = () =>
    idleCall(() => import("../../components/ImgTxtSectionEs"));

  const pageContain = { contain: "content" } as React.CSSProperties;

  return (
    <>
      <Helmet>
        <title>Diseño y Construcción Experta de Espacios Exteriores | New Gen Patio</title>
        <meta
          name="description"
          content="Descubre el mejor diseño y construcción para la vida al aire libre. Creamos espacios duraderos y elegantes. Pérgolas de aluminio 100% personalizadas, patios techados y cocinas exteriores."
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/outdoor-living-services/es"
        />
        {heroBg && <link rel="preload" as="image" href={heroBg} />}
      </Helmet>

      <main
        className="flex flex-col justify-center items-center mb-10"
        style={pageContain}
      >
        <BlockSection />
        <SectionBlock sections={sectionsData3} />

        <LazySection
          minHeight={48}
          prefetchNext={prefetchServices}
          ariaLabel="Banner promocional"
        >
          <MarqueeBanner />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchImgTxt}
          ariaLabel="Cuadrícula de servicios"
        >
          <Services />
        </LazySection>

        <section className="w-full max-w-5xl px-4 pb-8 text-center">
          <h2 className="text-3xl font-bold text-black/90 mb-4">
            ¿Por qué necesito aprovechar los espacios al aire libre de mi hogar?
          </h2>
          <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" />
          <p className="text-xl">
            Maximizar tus espacios exteriores no se trata solo de estética, se trata de 
            extender tu estilo de vida. Cuando inviertes en tu patio o cocina exterior, 
            estás creando un{" "}
            <strong>
              área habitable funcional que aumenta el valor, la comodidad y la 
              versatilidad de tu hogar.
            </strong>
          </p>
          <p className="text-xl mt-4">
            Aquí tienes cuatro razones poderosas por las que aprovechar al máximo tu 
            espacio exterior es una decisión inteligente:
          </p>
        </section>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Beneficios
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full" />
        </div>

        <LazySection
          minHeight={1200}
          prefetchNext={prefetchMarquee}
          ariaLabel="Galería de beneficios"
        >
          <>
            {sections.map((section, index) => (
              <ImageTextSection key={index} {...section} />
            ))}
          </>
        </LazySection>

        <LazySection minHeight={48} ariaLabel="Banner promocional inferior">
          <MarqueeBanner />
        </LazySection>

        <div className="w-screen">
          <Clients />
        </div>
      </main>
    </>
  );
};

export default memo(ServicesMainEs);