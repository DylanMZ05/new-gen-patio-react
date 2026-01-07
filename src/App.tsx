import React, {
  memo, useMemo, Suspense, lazy, useEffect, useRef, useState
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
  // useParams,
  Link,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// ====== Componentes críticos (no lazy) ======
import Header from "./components/header/Header";
import HeaderEs from "./español/components/header/HeaderEs"; 
import useGoogleAdsTracking from "./hooks/useGoogleAdsTracking";
import SchemaMarkup from "./SEO/SchemaMarkup"; 

// ====== Deferibles (lazy) ======
const WspButton = lazy(() => import("./components/WspButton"));
const Footer = lazy(() => import("./components/footer/footer"));
const QuotePopup = lazy(() => import("./components/QuotePopup"));
const BlockSection = lazy(() => import("./components/BlockSection"));

// Versión en Español (ES)
const WspButtonEs = lazy(() => import("./español/components/WspButtonEs"));
const FooterEs = lazy(() => import("./español/components/footer/FooterEs")); 
const QuotePopupEs = lazy(() => import("./español/components/QuotePopupEs"));

// ====== Páginas Base (EN) ======
const MainHome = lazy(() => import("./pages/Home/MainHome"));
const Attached = lazy(() => import("./pages/Services/Attached"));
const Freestanding = lazy(() => import("./pages/Services/Freestanding"));
const Cantilever = lazy(() => import("./pages/Services/Cantilever"));
const OutdoorKitchen = lazy(() => import("./pages/Services/OutdoorKitchen"));
const ConcreteTurf = lazy(() => import("./pages/Services/ConcreteTurf"));
const OutdoorKitchenModern = lazy(() => import("./pages/Services/OutdoorKitchenModern"));
const OutdoorKitchenTraditional = lazy(() => import("./pages/Services/OutdoorKitchenTraditional"));
const PatiosAndPergolasHome = lazy(() => import("./pages/Home/PatiosAndPergolasHome"));
const ServicesMain = lazy(() => import("./pages/Home/ServicesMain"));
const Calculator = lazy(() => import("./pages/Calculator/Calculator"));
const FinancingOptions = lazy(() => import("./pages/Calculator/FinancingOptions"));
const OurPromise = lazy(() => import("./pages/WeDoIt&About/OurPromise"));
const OurProcess = lazy(() => import("./pages/WeDoIt&About/OurProcess"));
const AboutUsPage = lazy(() => import("./pages/WeDoIt&About/AboutUsPage"));
const BlogPage = lazy(() => import("./pages/Blogs/BlogPage"));
const BlogSectionPage = lazy(() => import("./pages/Blogs/BlogsSectionPage"));
const FreeQuote = lazy(() => import("./pages/FreeQuote/FreeQuote"));
const FormPage = lazy(() => import("./pages/Contact/FormPage"));
const ContactRedirect = lazy(() => import("./pages/Contact/ContactRedirect"));
const FreeQuoteTracking = lazy(() => import("./pages/traking/freequote-tracking"));
const WhatsAppRedirect = lazy(() => import("./pages/traking/WhatsAppRedirect"));
const ProjectsList = lazy(() => import("./pages/Catalogo/Catalogo"));

// ====== Páginas en ESPAÑOL (ES) ======
const MainHomeEs = lazy(() => import("./español/pages/Home/MainHomeEs"));
const AttachedEs = lazy(() => import("./español/pages/Services/AttachedEs"));
const FreestandingEs = lazy(() => import("./español/pages/Services/FreestandingEs"));
const CantileverEs = lazy(() => import("./español/pages/Services/CantileverEs"));
const OutdoorKitchenEs = lazy(() => import("./español/pages/Services/OutdoorKitchenEs"));
const ConcreteTurfEs = lazy(() => import("./español/pages/Services/ConcreteTurfEs"));
const OutdoorKitchenModernEs = lazy(() => import("./español/pages/Services/OutdoorKitchenModernEs"));
const OutdoorKitchenTraditionalEs = lazy(() => import("./español/pages/Services/OutdoorKitchenTraditionalEs"));
const PatiosAndPergolasHomeEs = lazy(() => import("./español/pages/Home/PatiosAndPergolasHomeEs"));
const ServicesMainEs = lazy(() => import("./español/pages/Home/ServicesMainEs"));
const OurPromiseHomeEs = lazy(() => import("./español/pages/Home/OurPromiseHomeEs"));
const AboutUsHomeEs = lazy(() => import("./español/pages/Home/AboutUsHomeEs"));
const BlogSectionPageEs = lazy(() => import("./español/pages/Blogs/BlogsSectionPageEs"));
const BlogPageEs = lazy(() => import("./español/pages/Blogs/BlogPageEs"));
const FreeQuoteEs = lazy(() => import("./español/pages/FreeQuote/FreeQuoteEs"));
const FormPageEs = lazy(() => import("./español/components/FormPageEs"));
// const ProjectsListEs = lazy(() => import("./español/pages/Catalogo/CatalogoEs"));

// Admin
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Login = lazy(() => import("./pages/Admin/Login"));
import AdminRoute from "./pages/Admin/AdminRoute";
import Clients from "./pages/Home/Clients";

// ====== Helpers ======
const matches = (patterns: string[], pathname: string) =>
  patterns.some((p) => matchPath({ path: p, end: false }, pathname));

// const BlogsRedirect: React.FC = () => {
//   const { slug } = useParams();
//   return <Navigate to={`/blog/${slug ?? ""}`} replace />;
// };

const NoIndex: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Helmet><meta name="robots" content="noindex,nofollow" /></Helmet>
    {children}
  </>
);

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: "auto" }); }, [pathname]);
  return null;
};

const PageFallback: React.FC = () => <div className="min-h-[40vh]" aria-hidden="true" />;

const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const t = String(conn?.effectiveType || "").toLowerCase();
    if (t.includes("2g") || t.includes("slow-2g")) return false;
    if (window.location.pathname.includes('/es')) return false; 
  }
  if (typeof document !== "undefined" && document.visibilityState === "hidden") return false;
  return true;
};

const runIdle = (cb: () => void) => {
  if (typeof window === "undefined") return;
  const w = window as any;
  if (w.requestIdleCallback) w.requestIdleCallback(cb, { timeout: 1200 });
  else setTimeout(cb, 250);
};

const routePrefetchers: Record<string, () => Promise<any>> = {
  "/outdoor-living-services": () => import("./pages/Home/ServicesMain"),
  "/attached-aluminium-pergola-covered-patio": () => import("./pages/Services/Attached"),
  "/free-standing-aluminium-pergola-covered-patio": () => import("./pages/Services/Freestanding"),
  "/cantilever-aluminium-pergola": () => import("./pages/Services/Cantilever"),
  "/patio-financing-houston": () => import("./pages/Calculator/Calculator"),
  "/blog": () => import("./pages/Blogs/BlogsSectionPage"),
  "/covered-patio-project-catalog": () => import("./pages/Catalogo/Catalogo"), 
};

const routePrefetchersEs: Record<string, () => Promise<any>> = {
  "/es": () => import("./español/pages/Home/MainHomeEs"),
};

const SmartLink: React.FC<React.ComponentProps<typeof Link> & { prefetchTo?: string }> = ({
  prefetchTo, onMouseEnter, onFocus, ...props
}) => {
  const prefetch = () => {
    if (!canPrefetch() || !prefetchTo) return;
    const p = routePrefetchers[prefetchTo];
    if (typeof p === "function") runIdle(() => p().catch(() => void 0));
  };
  return (
    <Link
      {...props}
      onMouseEnter={(e) => { prefetch(); onMouseEnter?.(e); }}
      onFocus={(e) => { prefetch(); onFocus?.(e); }}
    />
  );
};

type MinH = number | { base: number; md?: number; lg?: number };

const LazyWhenVisible: React.FC<{
  offset?: string;
  minHeight?: MinH;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}> = ({ offset = "800px", minHeight = 0, children, fallback = null }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [show, setShow] = useState(false);

  const computeMinH = (): number => {
    if (typeof minHeight === "number") return minHeight || 0;
    const w = typeof window !== "undefined" ? window.innerWidth : 1024;
    if (typeof minHeight === "object") {
      if (w >= 1024 && minHeight.lg) return minHeight.lg;
      if (w >= 768 && minHeight.md) return minHeight.md;
      return minHeight.base;
    }
    return 0;
  };

  const reserved = computeMinH();

  useEffect(() => {
    const el = ref.current;
    if (!el || show) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) { setShow(true); io.disconnect(); }
      },
      { rootMargin: `${offset} 0px`, threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [show, offset]);

  return (
    <div
      ref={ref}
      className="[content-visibility:auto]"
      style={{
        contain: "content" as any,
        minHeight: reserved,
        containIntrinsicSize: `${reserved || 1}px` as any
      }}
      aria-hidden={!show}
    >
      {show ? children : fallback}
    </div>
  );
};

const Layout: React.FC = memo(() => {
  const location = useLocation();
  useGoogleAdsTracking();
  
  const isSpanishRoute = location.pathname === '/es' || (location.pathname.startsWith('/es/') || location.pathname.endsWith('/es'));
  
  const CurrentHeader = isSpanishRoute ? HeaderEs : Header;
  const CurrentFooter = isSpanishRoute ? FooterEs : Footer;
  const CurrentWspButton = isSpanishRoute ? WspButtonEs : WspButton;
  const CurrentQuotePopup = isSpanishRoute ? QuotePopupEs : QuotePopup;

  const noLayoutRoutes = useMemo(
    () => [
      "/financing-options",
      "/get-a-free-quote-houston-tracking",
      "/whatsapp-redirect",
      "/login/dashboard",
      "/admin/*",
      "/financing-options/es",
      "/get-a-free-quote-houston-tracking/es",
      "/whatsapp-redirect/es",
    ],
    []
  );
  const isNoLayout = matches(noLayoutRoutes, location.pathname);

  useEffect(() => {
    if (!canPrefetch()) return;
    if (location.pathname === "/") {
      runIdle(() => {
        routePrefetchers["/outdoor-living-services"]?.();
        routePrefetchers["/covered-patio-project-catalog"]?.();
        routePrefetchers["/blog"]?.();
      });
    }
    if (location.pathname === "/es") {
      runIdle(() => {
        routePrefetchersEs["/es"]?.();
      });
    }
  }, [location.pathname]);

  const [idleWidgets, setIdleWidgets] = useState(false);
  useEffect(() => {
    if (!canPrefetch()) return;
    runIdle(() => setIdleWidgets(true));
  }, []);

  return (
    <>
      <SchemaMarkup type="business" />
      <ScrollToTop />
      {!isNoLayout && <CurrentHeader />}

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* ========================================== */}
          {/* RUTAS EN INGLÉS (BASE)                     */}
          {/* ========================================== */}
          <Route path="/" element={<MainHome />} />
          <Route path="/aluminium-custom-pergola-cover-patio" element={<PatiosAndPergolasHome />} />
          <Route path="/outdoor-living-services" element={<ServicesMain />} />
          <Route path="/our-promise" element={<><SchemaMarkup type="faq" /><LazyWhenVisible><Suspense><BlockSection /></Suspense></LazyWhenVisible><OurPromise /><Clients /></>} />
          <Route path="/how-we-doit" element={<><OurProcess /><Clients /></>} />
          <Route path="/about-us" element={<><AboutUsPage /><Clients /></>} />
          <Route path="/blog" element={<BlogSectionPage />} />
          <Route path="/blog/:slug" element={<BlogPage />} />
          <Route path="/attached-aluminium-pergola-covered-patio" element={<Attached />} />
          <Route path="/free-standing-aluminium-pergola-covered-patio" element={<Freestanding />} />
          <Route path="/cantilever-aluminium-pergola" element={<Cantilever />} />
          <Route path="/custom-outdoor-kitchen" element={<OutdoorKitchen />} />
          <Route path="/modern-outdoor-kitchens-houston" element={<OutdoorKitchenModern />} />
          <Route path="/traditional-outdoor-kitchens-houston" element={<OutdoorKitchenTraditional />} />
          <Route path="/concrete-and-turf-installation-houston" element={<ConcreteTurf />} />
          <Route path="/patio-financing-houston" element={<Calculator />} />
          <Route path="/financing-options" element={<NoIndex><FinancingOptions /></NoIndex>} />
          <Route path="/get-a-free-quote-houston" element={<FreeQuote />} />
          <Route path="/contact-us" element={<ContactRedirect />} />
          <Route path="/formpage" element={<NoIndex><FormPage /></NoIndex>} />
          <Route path="/get-a-free-quote-houston-tracking" element={<NoIndex><FreeQuoteTracking /></NoIndex>} />
          <Route path="/whatsapp-redirect" element={<NoIndex><WhatsAppRedirect /></NoIndex>} />
          <Route path="/covered-patio-project-catalog" element={<ProjectsList />} />

          {/* ========================================== */}
          {/* RUTAS EN ESPAÑOL (/es)                     */}
          {/* ========================================== */}
          <Route path="/es" element={<MainHomeEs />} />
          <Route path="/aluminium-custom-pergola-cover-patio/es" element={<PatiosAndPergolasHomeEs />} />
          <Route path="/outdoor-living-services/es" element={<ServicesMainEs />} />
          <Route path="/our-promise/es" element={<><SchemaMarkup type="faq" /><LazyWhenVisible><Suspense><BlockSection /></Suspense></LazyWhenVisible><OurPromiseHomeEs /><Clients /></>} />
          <Route path="/about-us/es" element={<AboutUsHomeEs />} />
          <Route path="/blog/es" element={<BlogSectionPageEs />} />
          <Route path="/blog/:slug/es" element={<BlogPageEs />} />
          <Route path="/attached-aluminium-pergola-covered-patio/es" element={<AttachedEs />} />
          <Route path="/free-standing-aluminium-pergola-covered-patio/es" element={<FreestandingEs />} />
          <Route path="/cantilever-aluminium-pergola/es" element={<CantileverEs />} />
          <Route path="/custom-outdoor-kitchen/es" element={<OutdoorKitchenEs />} />
          <Route path="/modern-outdoor-kitchens-houston/es" element={<OutdoorKitchenModernEs />} />
          <Route path="/traditional-outdoor-kitchens-houston/es" element={<OutdoorKitchenTraditionalEs />} />
          <Route path="/concrete-and-turf-installation-houston/es" element={<ConcreteTurfEs />} />
          <Route path="/patio-financing-houston/es" element={<Calculator />} />
          <Route path="/get-a-free-quote-houston/es" element={<FreeQuoteEs />} />
          <Route path="/formpage/es" element={<NoIndex><FormPageEs /></NoIndex>} />
          {/* <Route path="/covered-patio-project-catalog/es" element={<ProjectsListEs />} /> */}

          {/* Admin */}
          <Route path="/login/dashboard" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

          {/* Redirecciones y Errores */}
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          <Route path="/contact/es" element={<Navigate to="/contact-us/es" replace />} />
          <Route path="/es/:path" element={<Navigate to={window.location.pathname.replace('/es/', '/') + '/es'} replace />} />

          <Route path="*" element={
              <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
                {isSpanishRoute ? (
                    <>
                        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Página no encontrada</h1>
                        <p className="mb-6 text-lg text-gray-700">La página que estás buscando no existe o ha sido movida.</p>
                        <SmartLink to="/es" className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a]">Volver a la página de inicio</SmartLink>
                    </>
                ) : (
                    <>
                        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
                        <p className="mb-6 text-lg text-gray-700">The page you are looking for doesn&apos;t exist or has been moved.</p>
                        <SmartLink to="/" className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a]">Go back to homepage</SmartLink>
                    </>
                )}
              </div>
            }
          />
        </Routes>
      </Suspense>

      {!isNoLayout && idleWidgets && (
        <Suspense fallback={null}>
          <CurrentQuotePopup />
        </Suspense>
      )}
      {!isNoLayout && idleWidgets && (
        <Suspense fallback={null}>
          <CurrentWspButton />
        </Suspense>
      )}

      {!isNoLayout && (
        <LazyWhenVisible offset="800px" minHeight={{ base: 560, md: 720, lg: 900 }}>
          <Suspense fallback={<div className="min-h-[560px]" />}>
            <CurrentFooter />
          </Suspense>
        </LazyWhenVisible>
      )}
    </>
  );
});

export default function App() {
  return (
    <HelmetProvider>
      <Router basename="/">
        <Layout />
      </Router>
    </HelmetProvider>
  );
}