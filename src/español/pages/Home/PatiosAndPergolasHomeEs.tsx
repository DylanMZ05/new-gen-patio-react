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
const PatiosAndPergolasCard = lazy(
  () => import("./services/PatioAndPergolasCardEs")
);
const ImageTextSection = lazy(
  () => import("../../components/ImgTxtSectionEs")
);

// ------------ Helpers ------------
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

// ------------ Datos (Traducidos) ------------
const sectionsData3Raw = [
  {
    id: 6,
    title: "Pérgolas de Aluminio y Patios Techados a Medida",
    description:
      "Descubra nuestras soluciones modernas e innovadoras diseñadas para mejorar su vida al aire libre con estilo, funcionalidad y durabilidad.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sectionsRaw = [
  {
    title: "Experiencia sin Estrés: Nos Encargamos de Todo",
    text: "Desde la planificación hasta la construcción, gestionamos cada aspecto del proyecto para que usted simplemente disfrute del proceso. Nos comprometemos a cumplir los plazos, brindar un servicio transparente y entregar exactamente lo que imaginó.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/07.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Construido con Aluminio Estructural de Alto Grado",
    text: "Utilizamos aluminio diseñado para soportar vientos de hasta 120 mph, resistente al óxido, la corrosión y las plagas, ideal para el exigente clima de Houston.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/14.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Diseño Personalizado para su Espacio y Estilo",
    text: "Cada cubierta de patio se fabrica a medida, adaptándose a las dimensiones de su hogar y sus preferencias de diseño. Ofrecemos modelos adosados, independientes o voladizos, todos personalizables en color y acabado.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Paneles de Techo con Núcleo Aislante",
    text: "Nuestros paneles de techo aislados reducen el calor y el ruido, haciendo que su patio sea más fresco y confortable incluso durante el pico del verano.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/16.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Integración Inteligente de Iluminación y Ventiladores",
    text: "Los sistemas eléctricos se instalan profesionalmente para alimentar ventiladores de techo, luces empotradas, tomacorrientes y más; todo oculto y conectado de forma segura para un acabado limpio y moderno.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/17.webp",
    imagePosition: "right" as const,
  },
];

// ------------ Página ------------
const PatiosAndPergolasHomeEs: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Normaliza paths (BASE_URL + encode por `&`)
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

  // Preload del hero bg
  const heroBg = sectionsData3[0]?.backgroundImage;

  // Prefetchers
  const prefetchCard = () =>
    idleCall(() => import("./services/PatioAndPergolasCardEs"));
  const prefetchImgTxt = () =>
    idleCall(() => import("../../components/ImgTxtSectionEs"));
  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBannerEs"));

  const pageContain = { contain: "content" } as React.CSSProperties;

  return (
    <>
      <Helmet>
        <title>
          Patios Techados y Pérgolas de Aluminio en Texas | New Gen Patio
        </title>
        <meta
          name="description"
          content="Explore pérgolas modernas y soluciones de patios techados en Houston. Diseños a medida para mayor comodidad, elegancia y espacios exteriores duraderos."
        />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/aluminium-custom-pergola-cover-patio/es"
        />
        {heroBg && <link rel="preload" as="image" href={heroBg} />}
      </Helmet>

      <main
        className="flex flex-col justify-center items-center mb-10"
        style={pageContain}
      >
        {/* Above-the-fold */}
        <BlockSection />
        <SectionBlock sections={sectionsData3} />

        {/* Bajo el fold → on-view */}
        <LazySection
          minHeight={48}
          prefetchNext={prefetchCard}
          ariaLabel="Banner promocional"
        >
          <MarqueeBanner />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchImgTxt}
          ariaLabel="Tarjeta de Patios y Pérgolas"
        >
          <PatiosAndPergolasCard />
        </LazySection>

        {/* Texto estático ligero */}
        <div className="px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            ¿Por qué podría necesitarlo?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full" />
          <p className="font-semibold text-lg text-center">
            Añadir una cubierta de patio a su espacio exterior no es solo una elección de diseño; 
            es una mejora en comodidad, protección y usabilidad durante todo el año.
          </p>
          <ul className="list-disc pl-6 text-lg mt-4">
            <li>
              Su patio recibe demasiado sol, lo que lo hace incómodo durante las horas pico.
            </li>
            <li>
              Desea un espacio al aire libre que se sienta como una extensión natural de su hogar.
            </li>
            <li>
              Busca una solución estética y funcional sin ocupar demasiado espacio.
            </li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Beneficios
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full" />
        </div>

        {/* Grilla de secciones con imagen */}
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

export default memo(PatiosAndPergolasHomeEs);