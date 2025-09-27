import React, { memo, useMemo, Suspense, lazy, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
  matchPath,
  useParams,
} from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// ====== Componentes globales ======
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";
import BlockSection from "./components/BlockSection";
import QuotePopup from "./components/QuotePopup";
import BannerOferta from "./components/BannerOferta";

import useGoogleAdsTracking from "./hooks/useGoogleAdsTracking";

// ====== Páginas (code-splitting por ruta) ======
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

// ====== Admin ======
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const Login = lazy(() => import("./pages/Admin/Login"));
import AdminRoute from "./pages/Admin/AdminRoute"; // protegida

// ====== Helpers ======
// Coincide con comodín (end:false) para patrones tipo "/admin/*" o "/blog/*"
const matches = (patterns: string[], pathname: string) =>
  patterns.some((p) => matchPath({ path: p, end: false }, pathname));

// Redirección dinámica /blogs/blog/:slug -> /blog/:slug
const BlogsRedirect: React.FC = () => {
  const { slug } = useParams();
  return <Navigate to={`/blog/${slug ?? ""}`} replace />;
};

// NoIndex wrapper para rutas utilitarias
const NoIndex: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Helmet>
      <meta name="robots" content="noindex,nofollow" />
    </Helmet>
    {children}
  </>
);

// Evita “saltos” de scroll entre páginas (CLS menor)
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

// Fallback muy liviano para Suspense (no bloquea ni genera TBT)
const PageFallback: React.FC = () => <div className="min-h-[40vh]" aria-hidden="true" />;

const Layout: React.FC = memo(() => {
  const location = useLocation();
  useGoogleAdsTracking();

  // Rutas sin layout (header/footer/wsp/quote)
  const noLayoutRoutes = useMemo(
    () => [
      "/financing-options",
      "/get-a-free-quote-houston-tracking",
      "/whatsapp-redirect",
      "/login/dashboard",
      "/admin/*",
    ],
    []
  );
  const isNoLayout = matches(noLayoutRoutes, location.pathname);

  // Lista NEGRA: ocultar el banner solo en estas rutas
  const hideBannerRoutes = useMemo(
    () => [
      "/financing-options",
      "/formpage",
      "/get-a-free-quote-houston-tracking",
      "/whatsapp-redirect",
      "/login/dashboard",
      "/admin/*",
    ],
    []
  );
  const showBanner = !isNoLayout && !matches(hideBannerRoutes, location.pathname);

  return (
    <>
      <ScrollToTop />

      {!isNoLayout && <Header />}

      {showBanner && (
        <BannerOferta
          activo={true}
          modalTitulo="The best autumn memories are made outdoors."
          modalTexto={
            'Why move the party inside? Transform your patio into a cozy, festive retreat for the entire season. Imagine warm gatherings, stylish comfort, and unforgettable nights under the stars. \n \n From September 15th to 30th, you can get a 72-inch fire pit completely free with installation if you close your backyard with us. \n \n (Applicable only to new customers who close during this time period and while supplies last)'
          }
          whatsappMensaje={'Hi! I\'m here for "Get a FREE 72" electric fireplace. I\'d like to talk more about it.'}
          storageKey="promo-sep-oct-2025"
          onHeightChange={(h) => {
            // empuja el layout (p.ej. header) para que no lo tape el banner fijo
            document.documentElement.style.setProperty("--top-offset", `${h}px`);
          }}
        />
      )}

      <Suspense fallback={<PageFallback />}>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<MainHome />} />
          <Route path="/aluminium-custom-pergola-cover-patio" element={<PatiosAndPergolasHome />} />
          <Route path="/outdoor-living-services" element={<ServicesMain />} />

          <Route path="/our-promise" element={<><BlockSection /><OurPromise /></>} />
          <Route path="/how-we-doit" element={<><BlockSection /><OurProcess /></>} />
          <Route path="/about-us" element={<><BlockSection /><AboutUsPage /></>} />

          <Route path="/blog" element={<><BlockSection /><BlogSectionPage /></>} />
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

          {/* Redirección /contact → /contact-us */}
          <Route path="/contact" element={<Navigate to="/contact-us" replace />} />

          {/* 404 */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
                <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
                <p className="mb-6 text-lg text-gray-700">
                  The page you are looking for doesn&apos;t exist or has been moved.
                </p>
                <a
                  href="/"
                  className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a] transition duration-300 cursor-pointer"
                >
                  Go back to homepage
                </a>
              </div>
            }
          />
        </Routes>
      </Suspense>

      {!isNoLayout && <QuotePopup />}
      {!isNoLayout && <WspButton />}
      {!isNoLayout && <Footer />}
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
