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
const Services = lazy(() => import("./services/servicesEs"));

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

/* ===================== Keywords ===================== */
// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "pergola",
  "outdoor living",
  "covered patio covers",
  "patio cover cover",
  "patios and pergolas",
  "pergola in patio",
  "pergola patio",
  "pergola with patio",
  "outdoor pergolas",
  "outdoor patio",
  "patio shade",
  "outdoor shade",
  "pergola for roof",
  "pergola roofing",
  "roof of pergola",
  "backyard patio",
  "patio designs",
  "covered patio",
  "patio roofing",
  "patio with roof",
  "backyard pergola",
  "covered pergolas",
  "pergola and cover",
  "pergola in the backyard",
  "pergolas houston",
  "pergolas houston tx",
  "aluminium covered patio",
  "aluminum covered patio",
  "aluminum patio cover materials",
  "aluminum pergolas",
  "cover your pergola",
  "outdoor sun shade",
  "backyard shade",
  "cover outdoor patio",
  "houston patio",
  "outdoor living spaces",
  "outdoor patio covers",
  "patio cover outdoor",
  "patio shade covers",
  "metal patio covers",
  "patio construction",
  "aluminum carport",
  "modern pergolas",
  "pergola and shade",
  "shade pergola",
  "backyard cover patio",
  "covered patio backyard",
  "patio cover backyard",
  "patio extension",
  "porch cover",
  "pergola co",
  "pergola roofing panels",
  "aluminum awning",
  "custom pergolas",
  "customizable pergola",
  "pergola price",
  "polycarbonate roofing for pergola",
  "small pergola",
  "cover my pergola",
  "pergola connected to roof",
  "pergola with privacy wall",
  "patio cover and pergola",
  "patio covered pergola",
  "pergola roof cover",
  "prefab pergola",
  "prefabricated pergolas",
  "aluminum patio roof",
  "install pergola",
  "insulated aluminum roof panels",
  "outdoor pergola with roof",
  "pergola materials",
  "pergola rain cover",
  "pergola connected to house",
  "pergola over patio",
  "polycarbonate sheets for pergola",
  "structure pergolas",
  "backyard patio pergola",
  "house pergola",
  "outdoor patio pergola",
  "patio pergola with roof",
  "pergola sizes",
  "weatherproof pergolas",
  "aluminium gazebo",
  "aluminum pergola with canopy",
  "backyard pergola designs",
  "backyard pergola with roof",
  "contemporary pergolas",
  "custom aluminum pergola",
  "modern aluminium pergola",
  "modern aluminum pergola",
  "aluminum pergola shade",
  "aluminum roofing panels for patio",
  "backyard covered pergola",
  "commercial pergolas",
  "custom size pergola",
  "long pergola",
  "mirador aluminum pergola",
  "pergola aluminum roof",
  "aluminium garden pagoda",
  "aluminium patio",
  "aluminium pergola roof",
  "aluminium pergola sale",
  "aluminium pergola with roof",
  "aluminium roof pergola",
  "aluminum covered pergola",
  "aluminum garden pergola",
  "aluminum modern pergola",
  "aluminum patio pergola",
];
const MAX_KW = 30;

/* ===================== Datos de la página ===================== */
const sectionsData3Raw = [
  {
    id: 6,
    title: "Custom Outdoor Living Spaces",
    description:
      "Discover our modern, innovative solutions designed to enhance outdoor living with style, functionality, and durability.",
    backgroundImage: "assets/images/Products/Patios&Pergolas/Attached/04.webp",
  },
];

const sectionsRaw = [
  {
    title: " 1. Expands Your Living Area Without Major Construction",
    text: "By transforming your outdoor space, you gain an entirely new area to cook, dine, relax, and entertain—without the cost or disruption of an interior renovation.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/02.webp",
    imagePosition: "right" as const,
  },
  {
    title: "2. Enhances Quality of Life",
    text: "Spending time outdoors has been proven to reduce stress, improve mood, and strengthen relationships. A well-designed outdoor space encourages family time, social gatherings, and peaceful moments in nature.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/03.webp",
    imagePosition: "left" as const,
  },
  {
    title: "3. Boosts Property Value and Curb Appeal",
    text: "Outdoor upgrades such as pergolas, kitchens, or landscaped patios are highly attractive to buyers. They are considered premium features that increase market value and make your home stand out.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/05.webp",
    imagePosition: "right" as const,
  },
  {
    title: "4. Adapts to All Seasons and Activities",
    text: "With proper design and materials, your outdoor space can be used year-round for cooking, relaxing, or hosting events—turning it into one of the most versatile parts of your home.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/08.webp",
    imagePosition: "left" as const,
  },
  {
    title: "5. High-Quality & Durable Materials",
    text: "We use premium materials that ensure weather resistance, low maintenance, and a flawless appearance for years to come. Investing in quality means enjoying your outdoor space worry-free.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/13.webp",
    imagePosition: "right" as const,
  },
  {
    title: "6. Expertise & Professionalism Guaranteed",
    text: "Our team of specialists transforms patios with meticulous attention to detail. From design to installation, we ensure the final result exceeds your expectations.",
    imageUrl: "assets/images/Products/Patios&Pergolas/Attached/20.webp",
    imagePosition: "left" as const,
  },
];

/* ===================== Página ===================== */
const ServicesMain: React.FC = () => {
  const baseUrl = import.meta.env.BASE_URL || "/";

  // Keywords dedup + cap
  const KEYWORDS_FINAL = useMemo(() => {
    const dedup = Array.from(new Set(KEYWORDS_RAW));
    return dedup.slice(0, MAX_KW).join(", ");
  }, []);

  // Normaliza paths con BASE_URL y encode por `&`
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

  // Preload del hero background
  const heroBg = sectionsData3[0]?.backgroundImage;

  // Prefetchers encadenados
  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBannerEs"));
  const prefetchServices = () =>
    idleCall(() => import("./services/servicesEs"));
  const prefetchImgTxt = () =>
    idleCall(() => import("../../components/ImgTxtSectionEs"));

  const pageContain = { contain: "content" } as React.CSSProperties;

  return (
    <>
      <Helmet>
        <title>Expert Outdoor Living Design &amp; Construction | New Gen Patio</title>
        <meta
          name="description"
          content="Discover premier design & construction for outdoor living. Durable, elegant spaces are created by expert builders. 100% custom aluminum pergolas, covered patios, and outdoor kitchens are created. Explore our designs!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link
          rel="canonical"
          href="https://www.newgenpatio.com/outdoor-living-services"
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
          prefetchNext={prefetchServices}
          ariaLabel="Promotional banner"
        >
          <MarqueeBanner />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchImgTxt}
          ariaLabel="Services grid"
        >
          <Services />
        </LazySection>

        {/* Texto estático ligero */}
        <section className="w-full max-w-5xl px-4 pb-8 text-center">
          <h2 className="text-3xl font-bold text-black/90 mb-4">
            Why do I need to take advantage of the outdoor spaces in my home?
          </h2>
          <div className="w-24 h-1 bg-[#0d4754] my-3 rounded-full mx-auto" />
          <p className="text-xl">
            Maximizing your outdoor spaces isn’t just about aesthetics—it’s
            about extending your lifestyle. When you invest in your backyard,
            patio, or outdoor kitchen, you're creating a{" "}
            <strong>
              functional living area that increases your home’s value, comfort,
              and versatility.
            </strong>
          </p>
          <p className="text-xl">
            Here are four strong reasons why taking full advantage of your
            outdoor space is a smart decision:
          </p>
        </section>

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

              <div className="w-screen">
        
                <Clients></Clients>  
              </div>
      </main>
    </>
  );
};

export default memo(ServicesMain);
