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
import { useTranslation } from "react-i18next"; // Asumimos que este hook está disponible

// Hero inmediato (debe renderizarse inmediatamente para buen LCP)
// NOTA: Se asume que este es el componente 'español/pages/Home/MainEs' que maneja el hero.
import MainEs from "./MainEs";

// --- Lazy chunks (cargan cuando los renderizamos) ---
// TODOS USAN EL SUFIJO 'Es' Y LA RUTA RELATIVA CORRECTA DENTRO DE ESPAÑOL/PAGES/HOME
const MarqueeBannerEs = lazy(() => import("../../components/MarqueeBannerEs")); // <-- ES
const ServicesEs = lazy(() => import("./services/servicesEs")); // <-- ES
const HowWeDoItHomeEs = lazy(() => import("./HowWeDoItHomeEs")); // <-- ES
const OurPromiseHomeEs = lazy(() => import("./OurPromiseHomeEs")); // <-- ES
const AboutUsHomeEs = lazy(() => import("./AboutUsHomeEs")); // <-- ES
const ClientsEs = lazy(() => import("./ClientsEs")); // <-- ES
const FAQEs = lazy(() => import("./FAQ/FAQEs")); // <-- ES
const BlogsSectionEs = lazy(() => import("./BlogsSectionEs")); // <-- ES


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

// --- Keywords (Traducción y ajuste para SEO en ES) ---
const KEYWORDS_RAW_ES = [
  "construir pérgola",
  "construcciones de pérgola",
  "construir cochera",
  "constructores de patios",
  "compañías de pérgolas",
  "construir cubierta de patio",
  "contratista de patios",
  "cubiertas para techos de patio",
  "techos y cubiertas de patio",
  "cubiertas para patios houston",
  "cubierta de sombra",
  "constructor de patios houston",
  "cubierta exterior",
  "compañías de pérgolas",
  "construcción exterior",
  "parasol para patio exterior",
  "instalación de cubierta de patio",
  "porche de patio",
  "remodelación de patio",
  "construcción de porche con mosquitero",
  "constructores de cubiertas de patio",
  "vida en el patio",
  "sombra en texas",
  "cubierta de patio trasero",
  "backyard cover",
  "cubierta para patio trasero",
  "contratistas de cubiertas de patio",
  "patio personalizado",
  "cubiertas de patio personalizadas",
  "cubierta de patio inclinada",
  "techo de patio exterior",
];

const MAX_KW = 25;

const MainHomeEs: React.FC = () => {
  // Usamos el useTranslation para el texto de SEO si es necesario, pero aquí el contenido está hardcodeado.
  const { t } = useTranslation('home');

  const KEYWORDS_FINAL = useMemo(() => {
    const dedup = Array.from(new Set(KEYWORDS_RAW_ES));
    return dedup.slice(0, MAX_KW).join(", ");
  }, []);

  // Prefetchers encadenados (usando las importaciones de componentes ES)
  const prefetchMarquee = () =>
    idleCall(() => import("../../components/MarqueeBannerEs"));
  const prefetchHowWeDoIt = () => idleCall(() => import("./HowWeDoItHomeEs"));
  const prefetchOurPromise = () => idleCall(() => import("./OurPromiseHomeEs"));
  const prefetchAboutUs = () => idleCall(() => import("./AboutUsHomeEs"));
  const prefetchClients = () => idleCall(() => import("./ClientsEs"));
  const prefetchFAQ = () => idleCall(() => import("./FAQ/FAQEs"));
  const prefetchBlogs = () => idleCall(() => import("./BlogsSectionEs"));

  return (
    <>
      <Helmet>
        {/* TRADUCCIÓN SEO */}
        <title>New Gen Patio | Pérgolas de Aluminio de Lujo y Patios Cubiertos Personalizados</title>
        <meta
          name="description"
          content="Transforma tu espacio exterior en Houston con pérgolas de aluminio y patios cubiertos de lujo a medida. Somos expertos constructores que ofrecemos diseños personalizados, instalación profesional y garantía de por vida. ¡Pide un presupuesto gratuito!"
        />
        <meta name="keywords" content={KEYWORDS_FINAL} />
        <link rel="canonical" href="https://www.newgenpatio.com/es" />
      </Helmet>

      <main>
        {/* Hero inmediato (LCP) */}
        <MainEs />

        {/* Todo lo demás se monta on-view con altura reservada */}
        <LazySection
          minHeight={48}
          prefetchNext={prefetchMarquee}
          ariaLabel={t('aria-banner-promo')}
        >
          <MarqueeBannerEs />
        </LazySection>

        <LazySection
          minHeight={820}
          prefetchNext={prefetchHowWeDoIt}
          ariaLabel={t('aria-services')}
        >
          <ServicesEs />
        </LazySection>

        <hr className="text-black/20" />

        <LazySection
          minHeight={360}
          prefetchNext={prefetchOurPromise}
          ariaLabel={t('aria-how-we-do-it')}
        >
          <HowWeDoItHomeEs />
        </LazySection>

        <LazySection
          minHeight={360}
          prefetchNext={prefetchAboutUs}
          ariaLabel={t('aria-our-promise')}
        >
          <OurPromiseHomeEs />
        </LazySection>

        <LazySection
          minHeight={360}
          prefetchNext={prefetchClients}
          ariaLabel={t('aria-about-us-summary')}
        >
          <AboutUsHomeEs />
        </LazySection>

        <LazySection
          minHeight={520}
          prefetchNext={prefetchFAQ}
          ariaLabel={t('aria-client-reviews')}
        >
          <ClientsEs />
        </LazySection>

        <LazySection
          minHeight={640}
          prefetchNext={prefetchBlogs}
          ariaLabel={t('aria-faq')}
        >
          <FAQEs />
        </LazySection>

        <LazySection
          minHeight={560}
          prefetchNext={prefetchMarquee}
          ariaLabel={t('aria-latest-blog')}
        >
          <BlogsSectionEs />
        </LazySection>

        <LazySection minHeight={48} ariaLabel={t('aria-banner-promo-bottom')}>
          <MarqueeBannerEs />
        </LazySection>
      </main>
    </>
  );
};

export default memo(MainHomeEs);