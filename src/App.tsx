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
  useParams,
  Link,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// ====== Componentes críticos (no lazy) ======
// Versión Base (EN)
import Header from "./components/header/Header";
// Versión en Español (ES)
import HeaderEs from "./español/components/header/HeaderEs"; // <-- Importación del Header ES
import useGoogleAdsTracking from "./hooks/useGoogleAdsTracking";
// 🟢 IMPORTACIÓN DEL SCHEMA (sin extensión)
import SchemaMarkup from "./SEO/SchemaMarkup"; 

// ====== Deferibles (lazy) ======
// Versión Base (EN)
const WspButton = lazy(() => import("./components/WspButton"));
const Footer = lazy(() => import("./components/footer/footer"));
const QuotePopup = lazy(() => import("./components/QuotePopup"));
const BlockSection = lazy(() => import("./components/BlockSection"));
// Versión en Español (ES)
const WspButtonEs = WspButton; // Se podría usar el mismo si es solo visual
const FooterEs = lazy(() => import("./español/components/footer/FooterEs")); // <-- Nuevo Footer en español
const QuotePopupEs = QuotePopup; // Se podría usar el mismo
const BlockSectionEs = BlockSection; // Se podría usar el mismo
// Otros componentes ES necesarios para la estructura interna de MainHomeEs
const MarqueeBannerEs = lazy(() => import("./español/components/MarqueeBannerEs")); // Importación ES
// const ServicesEs = lazy(() => import("./español/pages/Home/services/ServicesEs"));
// const HowWeDoItHomeEs = lazy(() => import("./español/pages/Home/HowWeDoItHomeEs"));
// const OurPromiseHomeEs = lazy(() => import("./español/pages/Home/OurPromiseHomeEs"));
// const AboutUsHomeEs = lazy(() => import("./español/pages/Home/AboutUsHomeEs"));
// const ClientsEs = lazy(() => import("./español/pages/Home/ClientsEs"));
// const FAQEs = lazy(() => import("./español/pages/Home/FAQ/FAQEs"));
// const BlogsSectionEs = lazy(() => import("./español/pages/Home/BlogsSectionEs"));


// ====== Páginas ======
// Versión Base (EN)
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

// Versión en Español (ES)
const MainHomeEs = lazy(() => import("./español/pages/Home/MainHomeEs")); // <-- Home ES

// Admin
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Login = lazy(() => import("./pages/Admin/Login"));
// ✅ Revertido a importación estándar (sin extensión)
import AdminRoute from "./pages/Admin/AdminRoute";
import Clients from "./pages/Home/Clients";


// ====== Helpers ======
const matches = (patterns: string[], pathname: string) =>
  patterns.some((p) => matchPath({ path: p, end: false }, pathname));

const BlogsRedirect: React.FC = () => {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug ?? ""}`} replace />;
};

const BlogsRedirectEs: React.FC = () => {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug ?? ""}/es`} replace />;
};

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

// Fallback muy liviano para Suspense
const PageFallback: React.FC = () => <div className="min-h-[40vh]" aria-hidden="true" />;

// === perf helpers para idle/prefetch ===
const canPrefetch = () => {
  if (typeof navigator !== "undefined") {
    const conn = (navigator as any).connection;
    if (conn?.saveData) return false;
    const t = String(conn?.effectiveType || "").toLowerCase();
    if (t.includes("2g") || t.includes("slow-2g")) return false;
    // Incluimos la comprobación de idioma para prefetch
    if (window.location.pathname.includes('/es')) return false; // No prefetch en versión ES
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

/**
 * ====== Prefetch de rutas probables ======
 * Crea import() “en vacío” para que Vite descargue el chunk sin montarlo.
 * Se llama en idle, al cargar Home y al hover/focus de links clave.
 */
// ✅ Rutas de prefetch corregidas a importación estándar (sin extensión)
const routePrefetchers: Record<string, () => Promise<any>> = {
  "/outdoor-living-services": () => import("./pages/Home/ServicesMain"),
  "/attached-aluminium-pergola-covered-patio": () => import("./pages/Services/Attached"),
  "/free-standing-aluminium-pergola-covered-patio": () => import("./pages/Services/Freestanding"),
  "/cantilever-aluminium-pergola": () => import("./pages/Services/Cantilever"),
  "/patio-financing-houston": () => import("./pages/Calculator/Calculator"),
  "/blog": () => import("./pages/Blogs/BlogsSectionPage"),
  "/covered-patio-project-catalog": () => import("./pages/Catalogo/Catalogo"), 
};
// Rutas de prefetch ES (se mantienen aquí por consistencia aunque canPrefetch() las desactiva)
const routePrefetchersEs: Record<string, () => Promise<any>> = {
  "/es": () => import("./español/pages/Home/MainHomeEs"),
};


/** Link que hace prefetch del chunk al hover/focus (sin bloquear navegación) */
const SmartLink: React.FC<React.ComponentProps<typeof Link> & { prefetchTo?: string }> = ({
  prefetchTo, onMouseEnter, onFocus, ...props
}) => {
  const prefetch = () => {
    // Nota: El prefetch solo se ejecuta en la versión base (EN), ver canPrefetch()
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

// === Monta niños cuando están cerca del viewport (Anti-CLS con containIntrinsicSize) ===
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
  
  // Determinamos si estamos en una ruta en español (ruta base o cualquier ruta con /es)
  const isSpanishRoute = location.pathname === '/es' || (location.pathname.includes('/es') && location.pathname.length > 3);
  
  // Usamos los componentes ES o EN basados en la ruta
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
      "/financing-options/es", // ✅ Añadido /es
      "/get-a-free-quote-houston-tracking/es", // ✅ Añadido /es
      "/whatsapp-redirect/es", // ✅ Añadido /es
    ],
    []
  );
  const isNoLayout = matches(noLayoutRoutes, location.pathname);

  // Prefetch suave de rutas “vecinas” cuando estás en Home
  useEffect(() => {
    if (!canPrefetch()) return;
    if (location.pathname === "/") {
      runIdle(() => {
        // Precalienta las rutas más probables desde Home
        routePrefetchers["/outdoor-living-services"]?.();
        routePrefetchers["/covered-patio-project-catalog"]?.();
        routePrefetchers["/blog"]?.();
      });
    }
    if (location.pathname === "/es") {
      runIdle(() => {
        // Precalienta las rutas más probables desde Home ES
        routePrefetchersEs["/es"]?.();
      });
    }
  }, [location.pathname]);

  // Widgets globales diferidos en idle
  const [idleWidgets, setIdleWidgets] = useState(false);
  useEffect(() => {
    if (!canPrefetch()) return;
    runIdle(() => setIdleWidgets(true));
  }, []);

  return (
    <>
      {/* 🟢 Schema Markup Global: LocalBusiness */}
      {/* Se aplica a todas las páginas fuera de <Routes> */}
      <SchemaMarkup type="business" />

      <ScrollToTop />
      {/* Usamos el Header correcto basado en el idioma */}
      {!isNoLayout && <CurrentHeader />}

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Públicas (Versión base EN) */}
          <Route path="/" element={<MainHome />} />
          <Route path="/aluminium-custom-pergola-cover-patio" element={<PatiosAndPergolasHome />} />
          <Route path="/outdoor-living-services" element={<ServicesMain />} />

          <Route
            path="/our-promise"
            element={
              <>
                {/* 🟢 Schema Markup Específico: FAQPage */}
                <SchemaMarkup type="faq" />
                <LazyWhenVisible
                >
                  <Suspense>
                    <BlockSection />
                  </Suspense>
                </LazyWhenVisible>
                <OurPromise />
                <Clients></Clients>
              </>
            }
          />

          <Route
            path="/how-we-doit"
            element={
              <>
                <LazyWhenVisible
                >
                  <Suspense>
                    <BlockSection />
                  </Suspense>
                </LazyWhenVisible>
                <OurProcess />
                <Clients></Clients>
              </>
            }
          />

          <Route
            path="/about-us"
            element={
              <>
                <LazyWhenVisible
                >
                  <Suspense>
                    <BlockSection />
                  </Suspense>
                </LazyWhenVisible>
                <AboutUsPage />
                <Clients></Clients>
              </>
            }
          />

          <Route
            path="/blog"
            element={
              <>
                <LazyWhenVisible
                >
                  <Suspense>
                    <BlockSection />
                  </Suspense>
                </LazyWhenVisible>
                <BlogSectionPage />
                <Clients></Clients>
              </>
            }
          />
          <Route path="/blogs/blog/:slug" element={<BlogsRedirect />} />
          <Route path="/blog/:slug" element={<BlogPage />} />

          <Route path="/attached-aluminium-pergola-covered-patio" element={<Attached />} />
          <Route path="/free-standing-aluminium-pergola-covered-patio" element={<Freestanding />} />
          <Route path="/cantilever-aluminium-pergola" element={<Cantilever />} />
          <Route path="/custom-outdoor-kitchen" element={<OutdoorKitchen />} />
          <Route path="/modern-outdoor-kitchens-houston" element={<OutdoorKitchenModern />} />
          <Route path="/traditional-outdoor-kitchens-houston" element={<OutdoorKitchenTraditional />} />
          <Route path="/concrete-and-turf-installation-houston" element={<ConcreteTurf />} />

          {/* Finanzas / Calculadora */}
          <Route path="/patio-financing-houston" element={<Calculator />} />
          <Route path="/financing-options" element={<NoIndex><FinancingOptions /></NoIndex>} />

          {/* Contacto / Formularios */}
          <Route path="/get-a-free-quote-houston" element={<FreeQuote />} />
          <Route path="/contact-us" element={<ContactRedirect />} />
          <Route path="/formpage" element={<NoIndex><FormPage /></NoIndex>} />
          <Route path="/get-a-free-quote-houston-tracking" element={<NoIndex><FreeQuoteTracking /></NoIndex>} />
          <Route path="/whatsapp-redirect" element={<NoIndex><WhatsAppRedirect /></NoIndex>} />
          <Route path="/covered-patio-project-catalog" element={<ProjectsList />} />


          {/* ========================================== */}
          {/* RUTAS EN ESPAÑOL (/es) */}
          {/* ========================================== */}

          <Route path="/es" element={<MainHomeEs />} /> {/* <-- Única ruta ES activa */}
          
          {/* Admin */}
          <Route path="/login/dashboard" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          {/* Redirecciones */}
          {/* /contact → /contact-us (EN) */}
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
          {/* /contact/es → /contact-us/es (ES) */}
          <Route path="/contact/es" element={<Navigate to="/contact-us/es" replace />} />
          {/* Redirección para /es/algo (por si se ingresa mal) -> /algo/es */}
          <Route path="/es/:path" element={<Navigate to={window.location.pathname.replace('/es/', '/') + '/es'} replace />} />


          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
                {/* 404 para inglés y español (si la ruta no es /es) */}
                {isSpanishRoute ? (
                    <>
                        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Página no encontrada</h1>
                        <p className="mb-6 text-lg text-gray-700">
                            La página que estás buscando no existe o ha sido movida.
                        </p>
                        <SmartLink
                            to="/es"
                            prefetchTo="/" // Prefetch sigue siendo a la raíz EN, ya que el componente es compartido
                            className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a] transition duration-300 cursor-pointer"
                        >
                            Volver a la página de inicio
                        </SmartLink>
                    </>
                ) : (
                    <>
                        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
                        <p className="mb-6 text-lg text-gray-700">
                            The page you are looking for doesn&apos;t exist or has been moved.
                        </p>
                        <SmartLink
                            to="/"
                            prefetchTo="/"
                            className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a] transition duration-300 cursor-pointer"
                        >
                            Go back to homepage
                        </SmartLink>
                    </>
                )}
              </div>
            }
          />
        </Routes>
      </Suspense>

      {/* Widgets globales diferidos */}
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

      {/* Footer ↓ solo cuando se acerca al viewport */}
      {!isNoLayout && (
        <LazyWhenVisible
          offset="800px"
          minHeight={{ base: 560, md: 720, lg: 900 }}   // ← subido para desktop
          fallback={
            <div
              className="min-h-[560px] md:min-h-[720px] lg:min-h-[900px]"
              aria-hidden="true"
            />
          }
        >
          <Suspense
            fallback={
              <div
                className="min-h-[560px] md:min-h-[720px] lg:min-h-[900px]"
                aria-hidden="true"
              />
            }
          >
            <CurrentFooter />
          </Suspense>
        </LazyWhenVisible>
      )}
    </>
  );
});

function App() {
  return (
    <HelmetProvider>
      <Router basename="/">
        <Layout />
      </Router>
    </HelmetProvider>
  );
}

export default App;