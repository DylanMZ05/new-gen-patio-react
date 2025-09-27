import React, {
  lazy,
  memo,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Helmet } from "react-helmet-async";

// Hero (debe renderizarse inmediatamente para buen LCP)
import Main from "./Main";

// --- Lazy chunks (cargan cuando los renderizamos) ---
const MarqueeBanner = lazy(() => import("../../components/MarqueeBanner"));
const Services = lazy(() => import("./services/services"));
const HowWeDoItHome = lazy(() => import("./HowWeDoItHome"));
const OurProcessHome = lazy(() => import("./OurPromiseHome"));
const AboutUsHome = lazy(() => import("./AboutUsHome"));
const Clients = lazy(() => import("./Clients"));
const FAQ = lazy(() => import("./FAQ/FAQ"));
const BlogsSection = lazy(() => import("./BlogsSection"));

// --- Helpers ---
const idleCall = (cb: () => void) => {
  const ric = (window as any).requestIdleCallback;
  return ric ? ric(cb, { timeout: 1200 }) : setTimeout(cb, 250);
};

// Componente que monta su children LAZY cuando entra en viewport
type LazySectionProps = {
  children: React.ReactNode;
  minHeight: number | string; // alto del placeholder (anti-CLS)
  rootMargin?: string;
  threshold?: number | number[];
  prefetchNext?: () => void; // prefetch de la próxima sección
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
  const containStyle: React.CSSProperties = { contain: "content" };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          if (prefetchNext) idleCall(prefetchNext); // prefetch siguiente sección
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

// --- Keywords provistas (orden de mayor a menor relevancia) ---
const KEYWORDS_RAW = [
  "build pergola",
  "pergola builds",
  "build a carport",
  "patio builders",
  "pergola companies",
  "build patio cover",
  "patio contractor",
  "patio roof covers",
  "patio roofs and covers",
  "patio covers houston",
  "shade cover",
  "patio builder houston",
  "outdoor covering",
  "pergola companies",
  "outdoor build",
  "outdoor patio sunshade",
  "patio cover installation",
  "patio porch",
  "patio remodeling",
  "building a screened in porch",
  "patio cover builders",
  "patio living",
  "texas shade",
  "back patio cover",
  "backyard cover",
  "cover for back patio",
  "patio cover contractors",
  "custom patio",
  "custom patio covers",
  "lean to patio cover",
  "patio cover custom",
  "screened in porch contractors near me",
  "covered decks and patios",
  "covers for decks and patios",
  "outdoor patio roof",
  "outdoor roof for patio",
  "outdoor roof patio",
  "outdoor structures",
  "structure outdoor",
  "texas patio",
  "screened in porch builders near me",
  "outdoor patio builders",
  "patio company",
  "pergola contractor",
  "pergola builder houston",
  "patio roof contractors",
  "build your own pergola",
  "covered patio contractors",
  "backyard patio builders",
  "custom pergola builders near me",
  "patio cover company",
  "companies that build pergolas",
  "contractor to build covered patio",
  "custom build pergola",
  "custom patio builders near me",
  "deck and pergola builders near me",
  "patio builders in my area",
  "patio roof builders near me",
  "aluminum pergola companies near me",
  "companies that install pergolas",
  "covered patio companies near me",
  "metal pergola companies",
  "pergola installation companies",
  "outdoor pergola company",
  "pergola construction company near me",
  "aluminum patio roof contractors",
  "patio roof contractor",
];

const MAX_KW = 25;

const MainHome: React.FC = () => {
  // ✅ Hook dentro del componente: dedup + cap de keywords
  const KEYWORDS_FINAL = useMemo(() => {
    const dedup = Array.from(new Set(KEYWORDS_RAW)); // preserva orden
    return dedup.slice(0, MAX_KW).join(", ");
  }, []);

  // Prefetchers encadenados
  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBanner"));
  const prefetchHowWeDoIt = () => idleCall(() => import("./HowWeDoItHome"));
  const prefetchOurPromise = () => idleCall(() => import("./OurPromiseHome"));
  const prefetchAboutUs = () => idleCall(() => import("./AboutUsHome"));
  const prefetchClients = () => idleCall(() => import("./Clients"));
  const prefetchFAQ = () => idleCall(() => import("./FAQ/FAQ"));
  const prefetchBlogs = () => idleCall(() => import("./BlogsSection"));

  return (
    <>
      <Helmet>
        <title>New Gen Patio | Aluminum Pergolas & Patio Covers Houston</title>
        <meta
          name="description"
          content="Your Houston home's outdoor potential is realized with New Gen Patio's custom solutions. Luxury aluminum pergolas and covered patios are designed and built by our team. Get your free quote!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/" />
      </Helmet>

      <main>
        {/* Hero inmediato (LCP) */}
        <Main />

        {/* Todo lo demás se monta on-view con altura reservada */}
        <LazySection
          minHeight={48}
          prefetchNext={prefetchMarquee}
          ariaLabel="Promotional banner"
        >
          <MarqueeBanner />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchHowWeDoIt}
          ariaLabel="Services"
        >
          <Services />
        </LazySection>

        <hr className="text-black/20" />

        <LazySection
          minHeight={360}
          prefetchNext={prefetchOurPromise}
          ariaLabel="How we do it"
        >
          <HowWeDoItHome />
        </LazySection>

        <LazySection
          minHeight={360}
          prefetchNext={prefetchAboutUs}
          ariaLabel="Our promise"
        >
          <OurProcessHome />
        </LazySection>

        <LazySection
          minHeight={360}
          prefetchNext={prefetchClients}
          ariaLabel="About us summary"
        >
          <AboutUsHome />
        </LazySection>

        <LazySection
          minHeight={520}
          prefetchNext={prefetchFAQ}
          ariaLabel="Clients reviews"
        >
          <Clients />
        </LazySection>

        <LazySection
          minHeight={640}
          prefetchNext={prefetchBlogs}
          ariaLabel="Frequently Asked Questions"
        >
          <FAQ />
        </LazySection>

        <LazySection
          minHeight={560}
          prefetchNext={prefetchMarquee}
          ariaLabel="Latest blog posts"
        >
          <BlogsSection />
        </LazySection>

        <LazySection minHeight={48} ariaLabel="Promotional banner bottom">
          <MarqueeBanner />
        </LazySection>
      </main>
    </>
  );
};

export default memo(MainHome);
