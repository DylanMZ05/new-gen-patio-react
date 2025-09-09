import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, matchPath } from "react-router-dom";
import { memo, useMemo } from "react";
import { HelmetProvider } from "react-helmet-async";

// Componentes globales
import Header from "./components/header/Header";
import WspButton from "./components/WspButton";
import Footer from "./components/footer/footer";
import BlockSection from "./components/BlockSection";
import QuotePopup from "./components/QuotePopup";

// Páginas
import MainHome from "./pages/Home/MainHome";
import Attached from "./pages/Services/Attached";
import Freestanding from "./pages/Services/Freestanding";
import Cantilever from "./pages/Services/Cantilever";
import OutdoorKitchen from "./pages/Services/OutdoorKitchen";
import ConcreteTurf from "./pages/Services/ConcreteTurf";
import OutdoorKitchenModern from "./pages/Services/OutdoorKitchenModern";
import OutdoorKitchenTraditional from "./pages/Services/OutdoorKitchenTraditional";
import PatiosAndPergolasHome from "./pages/Home/PatiosAndPergolasHome";
import ServicesMain from "./pages/Home/ServicesMain";
import Calculator from "./pages/Calculator/Calculator";
import FinancingOptions from "./pages/Calculator/FinancingOptions";
import OurPromise from "./pages/WeDoIt&About/OurPromise";
import OurProcess from "./pages/WeDoIt&About/OurProcess";
import AboutUsPage from "./pages/WeDoIt&About/AboutUsPage";
import BlogPage from "./pages/Blogs/BlogPage";
import BlogSectionPage from "./pages/Blogs/BlogsSectionPage";
import FreeQuote from "./pages/FreeQuote/FreeQuote";
import FormPage from "./pages/Contact/FormPage";
import ContactRedirect from "./pages/Contact/ContactRedirect";
import FreeQuoteTracking from "./pages/traking/freequote-tracking";
import WhatsAppRedirect from "./pages/traking/WhatsAppRedirect";
import useGoogleAdsTracking from "./hooks/useGoogleAdsTracking";
import ProjectsList from "./pages/Catalogo/Catalogo";

// Páginas Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Admin/Login";
import AdminRoute from "./pages/Admin/AdminRoute"; // 🔐 Ruta protegida

// Helper para matchear patrones de rutas (incluye dinámicas)
const matches = (patterns: string[], pathname: string) =>
  patterns.some((p) => matchPath({ path: p, end: true }, pathname));

const Layout = memo(() => {
  const location = useLocation();
  useGoogleAdsTracking();

  // Rutas donde NO querés mostrar Header/Footer/Wsp/Quote
  const noLayoutRoutes = useMemo(
    () => [
      "/financing-options",
      "/get-a-free-quote-houston-tracking",
      "/whatsapp-redirect",
      "/login/dashboard",
      "/admin/dashboard",
    ],
    []
  );

  const isNoLayout = matches(noLayoutRoutes, location.pathname);

  return (
    <>
      {!isNoLayout && <Header />}

      <Routes>
        {/* Públicas */}
        <Route path="/" element={<MainHome />} />
        <Route path="/aluminium-custom-pergola-cover-patio" element={<PatiosAndPergolasHome />} />
        <Route path="/outdoor-living-services" element={<ServicesMain />} />

        <Route path="/our-promise" element={<><BlockSection /><OurPromise /></>} />
        <Route path="/how-we-doit" element={<><BlockSection /><OurProcess /></>} />
        <Route path="/about-us" element={<><BlockSection /><AboutUsPage /></>} />

        <Route path="/blog" element={<><BlockSection /><BlogSectionPage /></>} />
        {/* Redirección para evitar contenido duplicado */}
        <Route path="/blogs/blog/:slug" element={<Navigate to="/blog/:slug" replace />} />
        <Route path="/blog/:slug" element={<BlogPage />} />

        <Route path="/attached-aluminium-pergola-covered-patio" element={<Attached />} />
        <Route path="/free-standing-aluminium-pergola-covered-patio" element={<Freestanding />} />
        <Route path="/cantilever-aluminium-pergola" element={<Cantilever />} />
        <Route path="/custom-outdoor-kitchen" element={<OutdoorKitchen />} />
        <Route path="/modern-outdoor-kitchens-houston" element={<OutdoorKitchenModern />} />
        <Route path="/traditional-outdoor-kitchens-houston" element={<OutdoorKitchenTraditional />} />
        <Route path="/concrete-and-turf-installation-houston" element={<ConcreteTurf />} />

        <Route path="/patio-financing-houston" element={<Calculator />} />
        <Route path="/financing-options" element={<FinancingOptions />} />

        <Route path="/get-a-free-quote-houston" element={<FreeQuote />} />
        <Route path="/contact-us" element={<ContactRedirect />} />
        <Route path="/formpage" element={<FormPage />} />
        <Route path="/get-a-free-quote-houston-tracking" element={<FreeQuoteTracking />} />
        <Route path="/whatsapp-redirect" element={<WhatsAppRedirect />} />
        <Route path="/covered-patio-project-catalog" element={<ProjectsList />} />

        {/* 🔐 Admin */}
        <Route path="/login/dashboard" element={<Login />} />
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        {/* 🔁 Redirección de /contact a /contact-us */}
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />

        {/* 404 catch-all */}
        <Route
          path="*"
          element={
            <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
              <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
              <p className="mb-6 text-lg text-gray-700">
                The page you are looking for doesn't exist or has been moved.
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
