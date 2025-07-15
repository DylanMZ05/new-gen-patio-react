import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from "react-router-dom";
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
import ProjectsList from "./pages/Home/Catalogo/Catalogo";

// Páginas Admin
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Admin/Login";
import AdminRoute from "./pages/Admin/AdminRoute"; // 🔐 Ruta protegida

const Layout = memo(() => {
  const location = useLocation();
  useGoogleAdsTracking();

  const layoutRoutes = useMemo(() => [
    "/", "/aluminium-custom-pergola-cover-patio",
    "/our-promise", "/how-we-doit", "/about-us",
    "/blog", "/blogs/blog/:slug", "/blog/:slug",
    "/attached-aluminium-pergola-covered-patio", "/free-standing-aluminium-pergola-covered-patio",
    "/cantilever-aluminium-pergola", "/custom-outdoor-kitchen",
    "/modern-outdoor-kitchens-houston", "/traditional-outdoor-kitchens-houston",
    "/concrete-and-turf-installation-houston", "/patio-financing-houston",
    "/get-a-free-quote-houston", "/contact-us", "/contact", "/formpage", "/blog/best-patio-cover-types",
    "/blog/aluminum-vs-wood-pergolas", "/outdoor-living-services", "/blog/cost-build-purpose-outdoor-kitchen", "/blog/how-increased-home-value-with-aluminum-covered-patio",
    "/project-catalog"
  ], []);

  const noLayoutRoutes = useMemo(() => [
    "/financing-options", "/get-a-free-quote-houston-tracking", "/whatsapp-redirect", "/login/dashboard", "/admin/dashboard"
  ], []);

  const isLayoutRoute = layoutRoutes.includes(location.pathname);
  const isNoLayout = noLayoutRoutes.includes(location.pathname);

  if (!isLayoutRoute && !isNoLayout) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center text-center px-4 py-20 bg-white">
        <h1 className="text-5xl font-bold mb-4 text-[#1a214a]">404 - Page Not Found</h1>
        <p className="mb-6 text-lg text-gray-700">The page you are looking for doesn't exist or has been moved.</p>
        <a
          href="/"
          className="px-6 py-3 bg-[#1a214a] text-white rounded-lg shadow hover:bg-[#2a2f6a] transition duration-300 cursor-pointer"
        >
          Go back to homepage
        </a>
      </div>
    );
  }

  return (
    <>
      {!isNoLayout && <Header />}
      <Routes>
        <Route path="/" element={<MainHome />} />
        <Route path="/aluminium-custom-pergola-cover-patio" element={<PatiosAndPergolasHome />} />
        <Route path="/outdoor-living-services" element={<ServicesMain />} />
        <Route path="/our-promise" element={<><BlockSection /><OurPromise /></>} />
        <Route path="/how-we-doit" element={<><BlockSection /><OurProcess /></>} />
        <Route path="/about-us" element={<><BlockSection /><AboutUsPage /></>} />
        <Route path="/blog" element={<><BlockSection /><BlogSectionPage /></>} />
        <Route path="/blogs/blog/:slug" element={<BlogPage />} />
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
        <Route path="/project-catalog" element={<ProjectsList />} />

        {/* 🔐 Admin */}
        <Route path="/login/dashboard" element={<Login />} />
        <Route path="/admin/dashboard" element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        } />

        {/* 🔁 Redirección de /contact a /contact-us */}
        <Route path="/contact" element={<Navigate to="/contact-us" replace />} />
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
