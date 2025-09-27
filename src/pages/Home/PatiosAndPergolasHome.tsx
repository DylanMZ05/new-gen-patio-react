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

import BlockSection from "../../components/BlockSection";
import SectionBlock from "../../components/SectionBlock";

// ↓ Bajo el fold: cargar on-demand
const MarqueeBanner = lazy(() => import("../../components/MarqueeBanner"));
const PatiosAndPergolasCard = lazy(
  () => import("./services/PatioAndPergolasCard")
);
const ImageTextSection = lazy(
  () => import("../../components/ImgTxtSection")
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

// ------------ Datos (originales) ------------
const sectionsData3Raw = [
  {
    id: 6,
    title: "Aluminium Custom Pergola and Cover Patios",
    description:
      "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sectionsRaw = [
  {
    title: "Stress-Free Experience: We Handle Everything",
    text: "From planning to construction, we manage every aspect of the project so you can simply enjoy the process. We commit to meeting deadlines, providing a transparent service, and delivering exactly what you envisioned.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/07.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Built with High-Grade Structural Aluminum",
    text: "We use aluminum engineered to withstand up to 120 mph winds, resistant to rust, corrosion, and pests—perfect for Houston’s demanding climate.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/14.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Custom Design for Your Space and Style",
    text: "Each patio cover is made to measure, adapting to your home’s dimensions and design preferences. We offer options like attached, freestanding, or cantilevered models, all customizable in color and finish.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Cantilever/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "Roofing Panels with Insulated Core",
    text: "Our insulated roofing panels reduce heat and noise, making your patio cooler and more comfortable even during peak summer.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/16.webp",
    imagePosition: "left" as const,
  },
  {
    title: "Smart Integration of Lighting and Fans",
    text: "Electrical systems are professionally installed to power ceiling fans, recessed lights, outlets, and more—everything concealed and securely connected for a clean, modern finish.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Freestanding/17.webp",
    imagePosition: "right" as const,
  },
];

// ------------ Página ------------
const PatiosAndPergolasHome: React.FC = () => {
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

  // Preload del hero bg (mejora LCP de la vista)
  const heroBg = sectionsData3[0]?.backgroundImage;

  // Prefetchers encadenados (opcional)
  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBanner"));
  const prefetchCard = () =>
    idleCall(() => import("./services/PatioAndPergolasCard"));
  const prefetchImgTxt = () =>
    idleCall(() => import("../../components/ImgTxtSection"));

  const pageContain = { contain: "content" } as React.CSSProperties;

  return (
    <>
      <Helmet>
        <title>
          Aluminium Cover Patios and Pergolas in Texas | New Gen Patio
        </title>
        <meta
          name="description"
          content="Explore modern pergolas and covered patio solutions in Houston. Custom-designed for comfort, elegance, and long-lasting outdoor living spaces."
        />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/aluminium-custom-pergola-cover-patio"
        />
        {heroBg && <link rel="preload" as="image" href={heroBg} />}
      </Helmet>

      <main
        className="flex flex-col justify-center items-center mb-10"
        style={pageContain}
      >
        {/* Above-the-fold (render inmediato) */}
        <BlockSection />
        <SectionBlock sections={sectionsData3} />

        {/* Bajo el fold → on-view */}
        <LazySection
          minHeight={48}
          prefetchNext={prefetchCard}
          ariaLabel="Promotional banner"
        >
          <MarqueeBanner />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchImgTxt}
          ariaLabel="Patios and Pergolas card"
        >
          <PatiosAndPergolasCard />
        </LazySection>

        {/* Texto estático ligero */}
        <div className="px-5 max-w-3xl">
          <h2 className="font-semibold text-3xl mb-3 text-center">
            Why might you need it?
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mb-2 mx-auto rounded-full" />
          <p className="font-semibold text-lg text-center">
            Adding a patio cover to your outdoor space isn’t just a design
            choice—it’s an upgrade in comfort, protection, and year-round
            usability.
          </p>
          <ul className="list-disc pl-6 text-lg">
            <li>
              Your patio gets too much sun, making it uncomfortable during peak
              hours.
            </li>
            <li>
              You want an outdoor space that feels like a natural extension of
              your home.
            </li>
            <li>
              You're looking for an aesthetic and functional solution without
              taking up too much space.
            </li>
          </ul>
        </div>

        <div className="pt-8 px-5 max-w-3xl">
          <h2 className="font-bold text-4xl mb-3 text-center text-black/90">
            Benefits
          </h2>
          <div className="w-16 h-[3px] bg-[#0d4754] mt-3 mx-auto rounded-full" />
        </div>

        {/* Grilla de secciones con imagen → lazy y anti-CLS */}
        <LazySection
          minHeight={1200}
          prefetchNext={prefetchMarquee}
          ariaLabel="Benefits gallery"
        >
          <>
            {sections.map((section, index) => (
              <ImageTextSection key={index} {...section} />
            ))}
          </>
        </LazySection>

        <LazySection minHeight={48} ariaLabel="Promotional banner bottom">
          <MarqueeBanner />
        </LazySection>
      </main>
    </>
  );
};

export default memo(PatiosAndPergolasHome);
